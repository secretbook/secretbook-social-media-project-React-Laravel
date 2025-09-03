<?php

/**
 * Created by Reliese Model.
 */

 namespace App\Models;

 use Carbon\Carbon;
 use Illuminate\Database\Eloquent\Model;

 class Post extends Model
 {
     protected $table = 'posts';
     protected $primaryKey = 'post_id';

     protected $casts = [
         'user_id' => 'int',
     ];

     protected $fillable = [
         'user_id',
         'post_title',
         'post_content',
         'post_image',
     ];

     // Relationship to the user who owns the post
     public function post_user()
     {
         return $this->belongsTo(User::class, 'user_id');
     }

     // Relationship: followers of the post (if you're using a pivot table for that)
     public function followers()
     {
         return $this->belongsToMany(User::class, 'post_followers', 'post_id', 'user_id');
     }

     // Get array of follower user IDs (if needed)
     public function getFollowersAttribute()
     {
         return $this->followers()->pluck('user_id')->toArray();
     }

     // All reactions for this post
     public function postReactions()
     {
         return $this->hasMany(PostReaction::class, 'pr_post_id');
     }

     // Logged-in user's reaction to this post
     public function userReaction()
     {
         return $this->hasOne(PostReaction::class, 'pr_post_id')->where('pr_user_id', auth()->id());
     }
 }

