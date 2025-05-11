import { useState } from "react";
import { authHeader } from "../utils/auth";

function FollowButton({ postId }) {
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const toggleFollow = () => {
    setLoading(true);

    fetch(`http://localhost:8000/api/posts/${postId}/follow`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...authHeader(),
      },
      body: JSON.stringify({ follow: true }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to follow");
        return res.json();
      })
      .then((data) => {
        console.log(data.message);
        setDisabled(true); // once followed, disable the button
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error following post:", err);
        setLoading(false);
      });
  };

  return (
    <button
      onClick={toggleFollow}
      className="btn btn-outline-primary"
      disabled={loading || disabled}
    >
      {loading ? "Processing..." : disabled ? "Followed" : "Follow"}
    </button>
  );
}

export default FollowButton;
