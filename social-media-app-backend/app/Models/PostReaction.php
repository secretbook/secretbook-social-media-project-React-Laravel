<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class PostReaction
 *
 * @property int $pr_id
 * @property int $pr_post_id
 * @property int $pr_user_id
 * @property string $pr_type
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 *
 * @package App\Models
 */
class PostReaction extends Model
{
	protected $table = 'post_reactions';
	protected $primaryKey = 'pr_id';

	protected $casts = [
		'pr_post_id' => 'int',
		'pr_user_id' => 'int'
	];

	protected $fillable = [
		'pr_post_id',
		'pr_user_id',
		'pr_type'
	];

      // Define inverse relationships
      public function post()
      {
          return $this->belongsTo(Post::class, 'pr_post_id');
      }

      public function user()
      {
          return $this->belongsTo(User::class, 'pr_user_id');
      }
}

// php artisan code:model --table=post_reactions
