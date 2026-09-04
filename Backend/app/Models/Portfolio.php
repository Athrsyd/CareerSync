<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Portfolio extends Model
{
    protected $primaryKey = 'portfolio_id';
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'portfolio_id',
        'user_id',
        'career_id',
        'project_finished_id',
        'fullname',
        'photo',
        'education',
        'hobbies',
        'experience',
        'about_me',
        'email',
        'phone_number',
        'linkedin_link',
        'instagram_link',
        'address',
        'github_link',
        'style'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function career()
    {
        return $this->belongsTo(UserCareer::class, 'career_id');
    }

    public function projectFinished()
    {
        return $this->belongsTo(ProjectsFinished::class, 'project_finished_id');
    }
}
