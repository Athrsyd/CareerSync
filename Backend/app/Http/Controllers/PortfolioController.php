<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use App\Models\Portfolio;
use App\Models\UserCareer;
use App\Models\ProjectsFinished;
use App\Models\User;

class PortfolioController extends Controller
{
    // ── Aturan validasi yang dipakai di Create & Update ──────────────────────
    private function styleRule(): string
    {
        return 'nullable|string|in:style1,style2,style3';
    }

    public function Create(Request $request)
    {
        $validate = Validator::make($request->all(), [
            'fullname'        => 'string|required',
            'education'       => 'string|required',
            'hobbies'         => 'string|required',
            'experience'      => 'string|required',
            'about_me'        => 'string|required',
            'email'           => 'email|required',
            'phone_number'    => 'string|required',
            'address'         => 'string|required',
            'linkedin_link'   => 'nullable|url',
            'instagram_link'  => 'nullable|url',
            'github_link'     => 'nullable|url',
            'photo'           => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'style'           => $this->styleRule(),
        ], [
            'fullname.required'      => 'Fullname wajib diisi!',
            'education.required'     => 'Education wajib diisi!',
            'hobbies.required'       => 'Hobbies wajib diisi!',
            'experience.required'    => 'Experience wajib diisi!',
            'about_me.required'      => 'About me wajib diisi!',
            'email.required'         => 'Email wajib diisi!',
            'email.email'            => 'Format email tidak valid!',
            'phone_number.required'  => 'Phone number wajib diisi!',
            'address.required'       => 'Address wajib diisi!',
            'linkedin_link.url'      => 'LinkedIn link harus berupa URL yang valid!',
            'instagram_link.url'     => 'Instagram link harus berupa URL yang valid!',
            'github_link.url'        => 'GitHub link harus berupa URL yang valid!',
            'photo.image'            => 'Photo harus berupa gambar!',
            'photo.mimes'            => 'Photo harus berupa file jpeg, png, jpg, atau gif!',
            'photo.max'              => 'Photo tidak boleh lebih dari 2MB!',
            'style.in'               => 'Style harus salah satu dari: style1, style2, style3!',
        ]);

        if ($validate->fails()) {
            return response()->json(['message' => $validate->errors()], 422);
        }

        try {
            $photoPath = null;
            if ($request->hasFile('photo')) {
                $photoPath = $request->file('photo')->store('photos', 'public');
            }

            $userCareer      = UserCareer::where('user_id', Auth::id())->first();
            $projectFinished = ProjectsFinished::where('user_id', Auth::id())->first();

            $portfolio = Portfolio::create([
                'portfolio_id'       => $request->fullname,
                'user_id'            => Auth::id(),
                'career_id'          => $userCareer ? $userCareer->id : null,
                'project_finished_id' => $projectFinished ? $projectFinished->id : null,
                'fullname'           => $request->fullname,
                'education'          => $request->education,
                'hobbies'            => $request->hobbies,
                'experience'         => $request->experience,
                'about_me'           => $request->about_me,
                'email'              => $request->email,
                'phone_number'       => $request->phone_number,
                'linkedin_link'      => $request->linkedin_link,
                'instagram_link'     => $request->instagram_link,
                'github_link'        => $request->github_link,
                'address'            => $request->address,
                'photo'              => $photoPath,
                'style'              => $request->input('style', 'style1'),
            ]);

            return response()->json([
                'message' => 'Portfolio berhasil dibuat!',
                'data'    => $portfolio,
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Gagal membuat portfolio: ' . $e->getMessage(),
            ], 500);
        }
    }

    public function GetPortfolio(string $username)
    {
        $user = User::where('username', $username)->first();

        if (!$user) {
            return response()->json(['message' => 'User tidak ditemukan!'], 404);
        }

        $getPortfolio = Portfolio::where('user_id', $user->id)->first();

        if (!$getPortfolio) {
            return response()->json(['message' => 'Portfolio tidak ditemukan!'], 404);
        }

        $projectFinished = ProjectsFinished::where('user_id', $user->id)->get();
        $career          = UserCareer::where('user_id', $user->id)->first();

        $projects = $projectFinished->map(fn($p) => [
            'project_title'       => $p->project_title,
            'project_description' => $p->project_description,
            'project_output'      => $p->project_output,
            'tools_used'          => $p->tools_used,
        ]);

        $portfolio = [
            'portfolio_id'   => $getPortfolio->portfolio_id,
            'fullname'       => $getPortfolio->fullname,
            'education'      => $getPortfolio->education,
            'hobbies'        => $getPortfolio->hobbies,
            'experience'     => $getPortfolio->experience,
            'about_me'       => $getPortfolio->about_me,
            'email'          => $getPortfolio->email,
            'phone_number'   => $getPortfolio->phone_number,
            'linkedin_link'  => $getPortfolio->linkedin_link,
            'instagram_link' => $getPortfolio->instagram_link,
            'github_link'    => $getPortfolio->github_link,
            'photo'          => $getPortfolio->photo
                ? asset('storage/' . $getPortfolio->photo)
                : null,
            'address'        => $getPortfolio->address,
            'style'          => $getPortfolio->style ?? 'style1',
            'career_name'    => $career ? $career->career_name : null,
            'skills_mastery' => $career ? $career->skills_mastery : null,
            'level'          => $career ? $career->level : null,
            'projects'       => $projects,
        ];

        return response()->json([
            'message' => 'Portfolio berhasil diambil!',
            'data'    => $portfolio,
        ], 200);
    }

    public function Update(Request $request, string $id)
    {
        $user = User::where('username', $id)->first();

        if (!$user) {
            return response()->json(['message' => 'User tidak ditemukan!'], 404);
        }

        $portfolio = Portfolio::where('user_id', $user->id)->first();

        if (!$portfolio) {
            return response()->json(['message' => 'Portfolio tidak ditemukan!'], 404);
        }

        $validate = Validator::make($request->all(), [
            'fullname'           => 'string|required',
            'about_me'           => 'string|required',
            'education'          => 'nullable|string',
            'hobbies'            => 'nullable|string',
            'experience'         => 'nullable|string',
            'email'              => 'email|required',
            'phone_number'       => 'string|required',
            'address'            => 'string|required',
            'linkedin_link'      => 'nullable|url',
            'instagram_link'     => 'nullable|url',
            'github_link'        => 'nullable|url',
            'photo'              => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'career_id'          => 'nullable|integer|exists:user_careers,id',
            'project_finished_id' => 'nullable|integer|exists:projects_finished,id',
            'style'              => $this->styleRule(),
        ], [
            'fullname.required'     => 'Fullname wajib diisi!',
            'about_me.required'     => 'About me wajib diisi!',
            'email.required'        => 'Email wajib diisi!',
            'email.email'           => 'Format email tidak valid!',
            'phone_number.required' => 'Phone number wajib diisi!',
            'address.required'      => 'Address wajib diisi!',
            'linkedin_link.url'     => 'LinkedIn link harus berupa URL yang valid!',
            'instagram_link.url'    => 'Instagram link harus berupa URL yang valid!',
            'github_link.url'       => 'GitHub link harus berupa URL yang valid!',
            'photo.image'           => 'Photo harus berupa gambar!',
            'photo.mimes'           => 'Photo harus berupa file jpeg, png, jpg, atau gif!',
            'photo.max'             => 'Photo tidak boleh lebih dari 2MB!',
            'style.in'              => 'Style harus salah satu dari: style1, style2, style3!',
        ]);

        // return dd($request->all());

        if ($validate->fails()) {
            return response()->json(['message' => $validate->errors()], 422);
        }

        try {
            // Handle photo update
            if ($request->hasFile('photo')) {
                if ($portfolio->photo && Storage::disk('public')->exists($portfolio->photo)) {
                    Storage::disk('public')->delete($portfolio->photo);
                }
                $photoPath = $request->file('photo')->store('photos', 'public');
            } else {
                $photoPath = $portfolio->photo;
            }

            $portfolio->update([
                'fullname'            => $request->fullname,
                'about_me'            => $request->about_me,
                'education'           => $request->education,
                'hobbies'             => $request->hobbies,
                'experience'          => $request->experience,
                'email'               => $request->email,
                'phone_number'        => $request->phone_number,
                'linkedin_link'       => $request->linkedin_link,
                'instagram_link'      => $request->instagram_link,
                'github_link'         => $request->github_link,
                'address'             => $request->address,
                'career_id'           => $request->filled('career_id')
                    ? $request->career_id
                    : $portfolio->career_id,
                'project_finished_id' => $request->filled('project_finished_id')
                    ? $request->project_finished_id
                    : $portfolio->project_finished_id,
                'photo'               => $photoPath,
                'style'               => $request->input('style', $portfolio->style ?? 'style1'),
            ]);

            return response()->json([
                'message' => 'Portfolio berhasil diupdate!',
                'style' => $request->style,
                'data'    => $portfolio,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Gagal update portfolio: ' . $e->getMessage(),
            ], 500);
        }
    }

    public function Delete($id)
    {
        $portfolio = Portfolio::find($id);

        if (!$portfolio) {
            return response()->json(['message' => 'Portfolio tidak ditemukan!'], 404);
        }

        try {
            if ($portfolio->photo && Storage::disk('public')->exists($portfolio->photo)) {
                Storage::disk('public')->delete($portfolio->photo);
            }

            $portfolio->delete();

            return response()->json(['message' => 'Portfolio berhasil dihapus!'], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Gagal menghapus portfolio: ' . $e->getMessage(),
            ], 500);
        }
    }

    public function searchPortfolio(Request $request)
    {
        $searchTerm = trim($request->input('query'));
        $searchCareer = $request->input('career', null);
        $searchLevel = $request->input('level', null);

        if (!$searchTerm) {
            return response()->json(['message' => 'Query pencarian tidak boleh kosong!'], 400);
        }

        $portfolios = Portfolio::where('fullname', 'like', '%' . $searchTerm . '%')
            ->orWhere('about_me', 'like', '%' . $searchTerm . '%')
            ->orWhere('education', 'like', '%' . $searchTerm . '%')
            ->orWhere('hobbies', 'like', '%' . $searchTerm . '%')
            ->orWhere('experience', 'like', '%' . $searchTerm . '%')
            ->when($searchCareer, function ($query, $career) {
                return $query->where('career_id', $career);
            })
            ->when($searchLevel, function ($query, $level) {
                return $query->where('level_id', $level);
            })
            ->orderByDesc('updated_at')
            ->get();

        $data = [
            'portfolios' => $portfolios->map(function ($portfolio) {
                return [
                    'username' => $portfolio->user->username,
                    'fullname' => $portfolio->fullname,
                    'about_me' => $portfolio->about_me,
                    'education' => $portfolio->education,
                    'hobbies' => $portfolio->hobbies,
                    'experience' => $portfolio->experience,
                    'email' => $portfolio->email,
                    'phone_number' => $portfolio->phone_number,
                    'linkedin_link' => $portfolio->linkedin_link,
                    'instagram_link' => $portfolio->instagram_link,
                    'github_link' => $portfolio->github_link,
                    'address' => $portfolio->address,
                    'photo' => $portfolio->photo ? asset('storage/' . $portfolio->photo) : null,
                    'style' => $portfolio->style ?? 'style1',
                ];
            })

        ];

        return response()->json([
            'message' => 'Hasil pencarian portfolio',
            'data'    => $data,
        ], 200);
    }
}
