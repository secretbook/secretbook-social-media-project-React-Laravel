import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { authHeader } from '../utils/auth';
import Sidebar from './Sidebar';
import { PencilLine, Upload, Loader } from 'lucide-react';

function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async () => {
    const errs = {};
    if (!title) errs.title = 'Title is required';
    if (!content) errs.content = 'Content is required';
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setLoading(true);

    try {
      const res = await fetch('http://localhost:8000/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Accept": "application/json",
          ...authHeader(),
        },
        body: JSON.stringify({ title, content }),
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Post Created',
          text: 'Your post has been published!',
          confirmButtonColor: '#3085d6',
        }).then(() => {
          navigate('/home'); // SPA-friendly redirect
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: data.message || 'Failed to create post',
        });
      }
    } catch (err) {
      setLoading(false);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Something went wrong. Please try again.',
      });
    }
  };

  return (
    <div className="d-flex flex-column flex-lg-row min-vh-100 bg-light">
      <Sidebar />

      <div className="flex-fill d-flex align-items-center justify-content-center p-3">
        <div
          className="card shadow-sm border-0 p-4 w-100"
          style={{ maxWidth: '400px' }}
        >
          <h4 className="mb-4 text-center d-flex align-items-center justify-content-center gap-2">
            <PencilLine size={22} className="text-primary" />
            Create a New Post
          </h4>

          <div className="mb-3">
            <label className="form-label fw-semibold">Post Title</label>
            <input
              className={`form-control ${errors.title ? 'is-invalid' : ''}`}
              placeholder="Enter title..."
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
            {errors.title && <div className="invalid-feedback">{errors.title}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Post Content</label>
            <textarea
              className={`form-control ${errors.content ? 'is-invalid' : ''}`}
              rows="4"
              placeholder="Write something awesome..."
              value={content}
              onChange={e => setContent(e.target.value)}
            ></textarea>
            {errors.content && <div className="invalid-feedback">{errors.content}</div>}
          </div>

          <button
            className="btn btn-primary w-100 fw-semibold d-flex align-items-center justify-content-center gap-2"
            onClick={submit}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader className="spin" size={18} /> Submitting...
              </>
            ) : (
              <>
                <Upload size={18} /> Submit Post
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
