import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { User, Mail, Lock } from "lucide-react";

function Register() {
  const [user_name, setName] = useState("");
  const [user_email, setEmail] = useState("");
  const [user_password, setPassword] = useState("");
  const navigate = useNavigate();

  const register = async () => {
    Swal.close();

    const res = await fetch("http://localhost:8000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ user_name, user_email, user_password }),
    });

    const data = await res.json();
    if (res.ok) {
      Swal.fire({
        title: "Success!",
        text: "You have registered successfully!",
        icon: "success",
        confirmButtonText: "Go to Login Page",
      }).then(() => {
        localStorage.setItem("token", data.token);
        navigate("/");
      });
    } else {
      Swal.fire({
        title: "Error!",
        text: data.message || "Registration failed",
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100 bg-light">
      <div
        className="card shadow-lg rounded p-4 w-100"
        style={{ maxWidth: 420 }}
      >
        <h2 className="text-center mb-4 text-primary fw-bold">Create Account</h2>

        <div className="mb-3 input-group">
          <span className="input-group-text bg-white border-end-0">
            <User size={20} className="text-primary" />
          </span>
          <input
            className="form-control border-start-0"
            placeholder="Name"
            value={user_name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-3 input-group">
          <span className="input-group-text bg-white border-end-0">
            <Mail size={20} className="text-primary" />
          </span>
          <input
            className="form-control border-start-0"
            placeholder="Email"
            type="email"
            value={user_email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-3 input-group">
          <span className="input-group-text bg-white border-end-0">
            <Lock size={20} className="text-primary" />
          </span>
          <input
            className="form-control border-start-0"
            placeholder="Password"
            type="password"
            value={user_password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="btn btn-primary w-100 py-2 mt-3 fw-semibold" onClick={register}>
          Register
        </button>

        <div className="text-center mt-4">
          <span className="text-muted">Already have an account?</span>
          <a
            href="/"
            className="ms-2 text-decoration-none fw-bold text-primary"
          >
            Login
          </a>
        </div>
      </div>
    </div>
  );
}

export default Register;
