<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Post;
use App\Models\PostReaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class PostApiController extends Controller
{
    public function index()
    {
        $currentUser = auth()->user();
        $followingIds = $currentUser->followed ?? [];

        $posts = Post::with(['post_user', 'userReaction']) // ✅ Load userReaction too
            ->get()
            ->map(function ($post) use ($followingIds) {
                // Aggregate reactions count from postReactions
                $reactionCounts = [
                    'like' => 0,
                    'love' => 0,
                    'haha' => 0,
                ];

                foreach ($post->postReactions as $reaction) {
                    if (isset($reactionCounts[$reaction->pr_type])) {
                        $reactionCounts[$reaction->pr_type]++;
                    }
                }

                return [
                    'post_id' => $post->post_id,
                    'post_title' => $post->post_title,
                    'post_content' => $post->post_content,
                    'user_name' => $post->post_user->user_name ?? 'Unknown',
                    'user_id' => $post->user_id,
                    'post_is_followed' => $post->post_is_followed ?? [],
                    'is_followed' => in_array($post->user_id, $followingIds),
                    'reactions' => $reactionCounts,
                    'user_reaction' => $post->userReaction->pr_type ?? null, // ✅ This is what colors the icon
                ];
            });

        return response()->json($posts);
    }




    public function store(Request $request)
    {
        // dd($request->all());
        $user = Auth::user();
        if (!$user) {
            return response()->json(['message' => 'Unauthorized. User not found.'], 401);
        }
        $data = $request->validate([
            'title' => 'required|string',
            'content' => 'required|string',
        ]);

        $post = new Post();
        $post->post_title = $data['title'];
        $post->post_content = $data['content'];
        $post->user_id = $user->user_id;
        // assumes user is authenticated
        $post->save();

        return response()->json($post, 201);
    }

    public function update(Request $request, $id)
    {
        // dd($request->all());
        $user = Auth::user();

        if (!$user) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $data = $request->validate([
            'post_title' => 'required',
            'post_content' => 'required',
        ]);

        $post = Post::find($id);

        if (!$post || $post->user_id !== $user->user_id) {
            return response()->json(['message' => 'Unauthorized to update this post'], 403);
        }

        $post->post_title = $data['post_title'];
        $post->post_content = $data['post_content'];
        // $post->user_id = $post->user_id;
        $post->save();

        // Ensure that user_name is included in the response
        $post->user_name = $post->post_user->user_name; // Assuming 'name' is the username field

        return response()->json([
            'message' => 'Post updated successfully',
            'post' => $post
        ], 200);
    }

    public function toggleFollow($postId, Request $request)
    {
        $post = Post::findOrFail($postId);
        $authUser = auth()->user();
        $targetUserId = $post->user_id;

        // Can't follow your own post
        if ($authUser->id === $targetUserId) {
            return response()->json(['message' => 'Cannot follow your own post'], 400);
        }

        $followed = $authUser->followed ?? [];

        if ($request->follow) {
            if (!in_array($targetUserId, $followed)) {
                $followed[] = $targetUserId;
                $authUser->followed = array_values($followed);
                $authUser->save();
                return response()->json(['message' => 'Followed successfully']);
            } else {
                return response()->json(['message' => 'Already following']);
            }
        } else {
            if (in_array($targetUserId, $followed)) {
                $authUser->followed = array_values(array_filter($followed, fn($id) => $id != $targetUserId));
                $authUser->save();
                return response()->json(['message' => 'Unfollowed successfully']);
            } else {
                return response()->json(['message' => 'You are not following this user']);
            }
        }
    }


    public function react(Request $request, $id)
    {
        $post = Post::find($id);

        if (!$post) {
            return response()->json(['error' => 'Post not found'], 404);
        }

        $user = Auth::user();

        if (!$user) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        // Validate input
        $validator = Validator::make($request->all(), [
            'type' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()->first()], 400);
        }

        $type = $request->input('type');

        // Check if the user already reacted to this post
        $reaction = PostReaction::where('pr_post_id', $post->post_id)
            ->where('pr_user_id', $user->user_id)
            ->first();

        if ($reaction) {
            $reaction->update(['pr_type' => $type]);
        } else {
            PostReaction::create([
                'pr_post_id' => $post->post_id,
                'pr_user_id' => $user->user_id,
                'pr_type' => $type,
            ]);
        }

        // Count total reactions by type for this post
        $reactions = PostReaction::where('pr_post_id', $post->post_id)
            ->get()
            ->groupBy('pr_type')
            ->map(fn($group) => $group->count());

        return response()->json([
            'message' => 'Reaction updated successfully',
            'reactions' => $reactions,
            'user_reaction' => $type
        ]);
    }


    public function destroy($id)
    {
        $user = Auth::user();
        if (!$user) {
            return response()->json(['message' => 'Unauthorized. User not found.'], 401);
        }
        $post = Post::find($id);

        if (!$post) {
            return response()->json(['error' => 'Post not found'], 404);
        }

        if ($post->user_id !== $user->user_id) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $post->delete();
        return response()->json(['message' => 'Post deleted successfully']);
    }
}
