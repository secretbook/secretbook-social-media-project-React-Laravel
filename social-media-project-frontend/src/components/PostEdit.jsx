import { useState } from "react";
import Swal from "sweetalert2";
import { authHeader } from "../utils/auth";
import { useNavigate } from "react-router-dom";

function PostEdit({ post, onEdit }) {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleOpen = () => {
    setTitle(post.post_title); // Reset to original post data
    setContent(post.post_content);
    setShow(true);
  };

  const handleClose = () => {
    setTitle(""); // Clear fields on close
    setContent("");
    setShow(false);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:8000/api/posts/${post.post_id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            ...authHeader(),
          },
          body: JSON.stringify({ post_title: title, post_content: content }),
        }
      );

      const data = await res.json();
      if (res.ok) {
        // Ensure the response contains the updated post data including 'user_name'
        onEdit(data.post); // Update parent state with the new post
        Swal.fire("Updated!", "Your post has been updated.", "success");
        handleClose(); // Clear modal
      } else {
        Swal.fire("Failed!", data.message || "Something went wrong", "error");
        handleClose();
      }
    } catch (err) {
      Swal.fire("Error!", "Something went wrong.", "error");
      handleClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button className="btn btn-sm btn-warning" onClick={handleOpen}>
        ✏️ Edit
      </button>

      {show && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        >
          <div
            className="modal-dialog modal-dialog-centered modal-sm"
            role="document"
            id="editModal"
          >
            <div className="modal-content shadow">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">Edit Post</h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={handleClose}
                ></button>
              </div>
              <div className="modal-body">
                <div className="form-group mb-3">
                  <label className="form-label">Title</label>
                  <input
                    className="form-control"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Content</label>
                  <textarea
                    className="form-control"
                    rows={3}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Content"
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={handleClose}
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-success"
                  onClick={handleSave}
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default PostEdit;
