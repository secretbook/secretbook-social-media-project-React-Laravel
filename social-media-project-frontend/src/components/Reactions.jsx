import { ThumbsUp, Heart, Smile } from "lucide-react";
import { authHeader } from "../utils/auth";

function Reactions({ postId, reactions = {}, userReaction, onReacted, isOwner }) {
  const handleReact = async (type) => {
    try {
      const res = await fetch(`http://localhost:8000/api/posts/${postId}/react`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...authHeader(),
        },
        body: JSON.stringify({ type }),
      });

      const data = await res.json();
      if (res.ok && onReacted) {
        onReacted(data.reactions, data.user_reaction);  // Update parent state
      } else {
        console.error("Reaction failed:", data.error || data.message);
      }
    } catch (err) {
      console.error("Reaction error:", err);
    }
  };

  return (
    <div className="d-flex gap-3">
      <div
        className="d-flex align-items-center gap-1"
        onClick={() => handleReact("like")}
        style={{ cursor: "pointer", color: userReaction === "like" ? "blue" : "" }}
      >
        <ThumbsUp size={16} /> {reactions.like || 0}
      </div>
      <div
        className="d-flex align-items-center gap-1"
        onClick={() => handleReact("love")}
        style={{ cursor: "pointer", color: userReaction === "love" ? "red" : "" }}
      >
        <Heart size={16} /> {reactions.love || 0}
      </div>
      <div
        className="d-flex align-items-center gap-1"
        onClick={() => handleReact("haha")}
        style={{ cursor: "pointer", color: userReaction === "haha" ? "green" : "" }}
      >
        <Smile size={16} /> {reactions.haha || 0}
      </div>
    </div>
  );
}


export default Reactions;
