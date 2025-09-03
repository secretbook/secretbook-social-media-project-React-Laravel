<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthApiController extends Controller
{
    public function register(Request $request) {
        $data = $request->validate([
            'user_name' => 'required',
            'user_email' => 'required|email',
            'user_password' => 'required|min:6',
        ]);
        $data['user_password'] = bcrypt($data['user_password']);
        $user = User::create($data);
        $token = $user->createToken('token')->plainTextToken;
        return response()->json(['token' => $token]);
    }

    public function login(Request $request) {
        // dd($request->all());
        $data = $request->validate([
            'user_email' => 'required|email',
            'user_password' => 'required'
        ]);

        $user = User::where('user_email', $data['user_email'])->first();

        if (!$user || !Hash::check($data['user_password'], $user->user_password)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        $token = $user->createToken('token')->plainTextToken;
        return response()->json(['token' => $token, 'user' => $user]);
    }
}
