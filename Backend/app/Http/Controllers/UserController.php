<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class UserController extends Controller
{
    public function Register(Request $request)
    {

        $validate = Validator::make($request->all(), [
            'username' => "string|required",
            'email' => "email|required|unique:users,email",
            'password' => 'min:6|string|required'
        ],[
            'username.required' => "Username wajib diisi!",
            'email.required' => "Email wajib diisi!",
            'email.email' => "Format email tidak valid!",
            'email.unique' => "Email sudah terdaftar!",
            'password.required' => "Password wajib diisi!",
            'password.min' => "Password minimal 6 karakter!"
        ]);

        if ($validate->fails()) {
            return response()->json([
                "Message" => "Pastikan semua input di isi dengan benar!",
                'errors' => $validate->errors()
            ], 422);
        }

        $buatAkun = User::create([
            'username' => $request->username,
            'email' => $request->email,
            'password' => Hash::make($request->password)
        ]);

        $token = $buatAkun->createToken('auth_token')->plainTextToken;
        // $buatProgress = $buatAkun->progress()->create([
        //     'readiness_point' => 0,
        //     'progress_date' => now(),
        // ]);

        return response()->json([
            'message' => 'Selamat, registrasi berhasil! silahkan sign in',
            "data" => $buatAkun,
            "token" => $token
        ]);
    }

    public function Login(Request $request)
    {

        $validate = Validator::make($request->all(), [
            'email' => "email|required",
            'password' => 'min:6|string|required'
        ]);

        if ($validate->fails()) {
            return response()->json([
                "Message" => "Pastikan semua input di isi dengan benar!",
                'errors' => $validate->errors()
            ], 422);
        }
        if (!Auth::attempt($request->only(['email', 'password']))) {
            return response()->json([
                "message" => "Login Gagal! Email tidak terdaftar atau password salah!"
            ], 401);
        }

        $user = User::where('email', $request->email)->firstOrFail();
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => "Login berhasil!",
            'token' => $token,
            'data' => $user
        ], 200);
    }

    public function Logout(Request $request)
    {
        $request->user()->tokens()->delete();

        return response()->json([
            "message" => "Log out berhasil!"
        ], 200);
    }

    public function GetUser(Request $request)
    {
        return response()->json($request->user(), 200);
    }
}
