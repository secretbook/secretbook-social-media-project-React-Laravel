<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;
use App\Models\Post;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;

/**
 * Class User
 *
 * @property int $user_id
 * @property string|null $user_name
 * @property string|null $user_email
 * @property string|null $user_password
 * @property string|null $user_profile_image
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property string|null $user_token
 * @property Carbon|null $email_verified_at
 * @property string|null $remember_token
 *
 * @package App\Models
 */
class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

	protected $table = 'users';
	protected $primaryKey = 'user_id';

	protected $casts = [
		'email_verified_at' => 'datetime',
        'followed' => 'array',
	];

	protected $hidden = [
		'user_password',
		'user_token',
		'remember_token'
	];

	protected $fillable = [
		'user_name',
        'followed',
		'user_email',
		'user_password',
		'user_profile_image',
		'user_token',
		'email_verified_at',
		'remember_token'
	];


    public function posts() {
        return $this->hasMany(Post::class);
    }

}
