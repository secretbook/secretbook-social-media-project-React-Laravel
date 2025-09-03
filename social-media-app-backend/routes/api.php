<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthApiController;
use App\Http\Controllers\Api\PaymentApiController;
use App\Http\Controllers\Api\PostApiController;



Route::post('/login', [AuthApiController::class, 'login']);
Route::post('/register', [AuthApiController::class, 'register']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('posts', [PostApiController::class, 'index']);
    Route::post('posts', [PostApiController::class, 'store']);
    Route::post('posts/{id}', [PostApiController::class, 'update']);
    Route::post('/posts/{id}/follow', [PostApiController::class, 'toggleFollow']);
    Route::post('/posts/{id}/react', [PostApiController::class, 'react']);
    Route::delete('/posts/{id}', [PostApiController::class, 'destroy']);
    Route::post('/create-order', [PaymentApiController::class, 'createOrder']);
    Route::post('/verify-payment', [PaymentApiController::class, 'verifyPayment']);
});
