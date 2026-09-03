<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;   

class UserCareer extends Model
{
    protected $fillable = [
        'user_id',
        'career_name',
        'skills_mastery',
        'level',
        'ever_analyzed',
        'ai_feedback',
    ];

    protected $casts = [
        'skills_mastery' => 'array',
        'ever_analyzed' => 'boolean',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function portfolios()
    {
        return $this->hasMany(Portfolio::class, 'career_id');
    }
}
