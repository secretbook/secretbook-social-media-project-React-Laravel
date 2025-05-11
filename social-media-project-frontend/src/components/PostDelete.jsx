import Swal from "sweetalert2";
import { authHeader } from "../utils/auth";

function PostDelete({ postId, onDelete }) {
  const handleDelete = async () => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This post will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await fetch(`http://localhost:8000/api/posts/${postId}`, {
        method: "DELETE",
        headers: authHeader(),
      });

      if (res.ok) {
        onDelete(postId);
        Swal.fire("Deleted!", "Your post has been deleted.", "success");
      } else {
        Swal.fire("Failed!", "Unable to delete the post.", "error");
      }
    } catch (err) {
      Swal.fire("Error!", "Something went wrong.", "error");
    }
  };

  return (
    <button className="btn btn-sm btn-danger" onClick={handleDelete}>
      Delete
    </button>
  );
}

export default PostDelete;
