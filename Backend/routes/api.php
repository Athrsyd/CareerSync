<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UserCareerController;
use App\Http\Controllers\PortfolioController;
use App\Http\Controllers\ProgressController;
use App\Http\Controllers\ProjectsFinishedController;


Route::prefix('v1')->group(function () {
    Route::post('/register', [UserController::class, 'Register']);
    Route::post('/login', [UserController::class, 'Login']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/user', [UserController::class, 'GetUser']);
        Route::post('/logout', [UserController::class, 'Logout']);

        Route::post('/career', [UserCareerController::class, 'InputCareer']);
        Route::get('/career', [UserCareerController::class, 'GetCareer']);
        Route::put('/career/{id}', [UserCareerController::class, 'UpdateCareer']);

        Route::post('/portfolio', [PortfolioController::class, 'Create']);
        Route::put('/portfolio/{id}', [PortfolioController::class, 'Update']);

        Route::get('/progress', [ProgressController::class, 'index']);
        Route::post('/progress', [ProgressController::class, 'store']);

        // Ini Endpoint buat feedback AI, ada start sama refresh dam
        Route::post('/feedback/{id}', [UserCareerController::class, 'StartAnalysis']);
        Route::post('/feedback/refresh', [UserCareerController::class, 'RefreshFeedback']);
        Route::get('/feedback/{id}',[UserCareerController::class, 'getAiFeedback']);


        Route::post('/projects-finished', [ProjectsFinishedController::class, 'Create']);
    });

    Route::get('/projects-finished/{id}', [ProjectsFinishedController::class, 'GetProjectsFinished']);
    Route::get('/portfolio/{username}', [PortfolioController::class, 'GetPortfolio']);
});
