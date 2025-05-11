import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { authHeader } from "../utils/auth";
import FollowButton from "./FollowButton";
import Reactions from "./Reactions";
import PostDelete from "./PostDelete";
import PostEdit from "./PostEdit";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser?.user_id) {
      setUserId(storedUser.user_id);
    }

    fetch("http://localhost:8000/api/posts", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...authHeader(),
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch posts");
        return res.json();
      })
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleDelete = (deletedId) => {
    setPosts((prev) => prev.filter((post) => post.post_id !== deletedId));
  };

  const handleEdit = (updatedPost) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.post_id === updatedPost.post_id
          ? {
              ...post,
              post_title: updatedPost.post_title,
              post_content: updatedPost.post_content,
              user_name: updatedPost.user_name, // Make sure user_name is updated
            }
          : post
      )
    );
  };
  

  const updateReactions = (postId, updatedReactions, userReaction) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.post_id === postId
          ? {
              ...post,
              reactions: updatedReactions,
              user_reaction: userReaction,
            }
          : post
      )
    );
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div
        className="flex-grow-1"
        style={{ marginLeft: "0", paddingTop: "20px" }}
      >
        <div
          className="container-fluid px-3 py-4"
          style={{ marginLeft: "0", marginTop: "20px" }}
        >
          <h2 className="mb-4">All Posts</h2>

          {loading && <p>Loading posts...</p>}
          {error && <div className="alert alert-danger">{error}</div>}

          <div className="row">
            {!loading && posts.length === 0 ? (
              <div className="col-12">
                <div className="card p-4 text-center">
                  <h5>No posts found</h5>
                </div>
              </div>
            ) : (
              posts.map((post) => (
                <div
                  key={post.post_id}
                  className="col-12 col-sm-10 col-md-6 col-lg-4 mb-4 mx-auto"
                >
                  <div className="card p-4 shadow-sm h-100 position-relative">
                    {/* User name badge at top-right corner */}
                    <div
                      className="position-absolute top-0 end-0 translate-middle badge-glass"
                      style={{
                        marginTop: "30px",
                        marginRight: "2px",
                        padding: "6px 10px",
                        borderRadius: "999px",
                        display: "flex",
                        alignItems: "center",
                        fontWeight: "500",
                        fontSize: "0.85rem",
                        color: "#0d6efd",
                        background: "rgba(255, 255, 255, 0.75)",
                        backdropFilter: "blur(6px)",
                        WebkitBackdropFilter: "blur(6px)",
                        border: "1px solid #0d6efd",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                        transition: "all 0.3s ease",
                        zIndex: "10",
                      }}
                    >
                      <i className="la la-user-circle me-1"></i>{" "}
                      {post.user_name}
                    </div>

                    <h5>{post.post_title}</h5>
                    <p>{post.post_content}</p>

                    {parseInt(userId) === parseInt(post.user_id) && (
                      <div className="d-flex gap-2 mb-2 flex-wrap">
                        <PostEdit post={post} onEdit={handleEdit} />
                        <PostDelete
                          postId={post.post_id}
                          onDelete={handleDelete}
                        />
                      </div>
                    )}

                    <div className="d-flex justify-content-between align-items-center mt-3">
                      {/* Left side: Follow button (only if not the owner) */}
                      <div>
                        {parseInt(userId) !== parseInt(post.user_id) &&
                          (post.is_followed ? (
                            <button
                              className="btn btn-outline-primary"
                              disabled
                            >
                              Followed
                            </button>
                          ) : (
                            <FollowButton postId={post.post_id} />
                          ))}
                      </div>

                      {/* Right side: Reactions (always aligned to the right) */}
                      <div>
                        <Reactions
                          postId={post.post_id}
                          reactions={post.reactions || {}}
                          userReaction={post.user_reaction}
                          onReacted={(reactions, userReaction) =>
                            updateReactions(
                              post.post_id,
                              reactions,
                              userReaction
                            )
                          }
                          isOwner={userId === post.user_id}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
