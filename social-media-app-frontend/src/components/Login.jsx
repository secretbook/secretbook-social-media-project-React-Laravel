import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Mail, Lock } from "lucide-react";

function Login() {
  const [user_email, setEmail] = useState("");
  const [user_password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    const res = await fetch("http://localhost:8000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ user_email, user_password }),
    });

    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      Swal.fire({
        title: "Login Successful",
        text: "Welcome back!",
        icon: "success",
        confirmButtonText: "OK",
        background: "#d1e7dd",
        customClass: { popup: "swal-popup" },
      }).then(() => {
        navigate("/home");
      });
    } else {
      Swal.fire({
        title: "Error",
        text: data.message || "Login failed",
        icon: "error",
        confirmButtonText: "Try Again",
        background: "#f8d7da",
        customClass: { popup: "swal-popup" },
      });
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100 bg-light">
      <div
        className="card shadow-lg rounded p-4 w-100"
        style={{ maxWidth: 420 }}
      >
        <h2 className="text-center mb-4 text-primary fw-bold">Welcome Back</h2>

        <div className="mb-3 input-group">
          <span className="input-group-text bg-white border-end-0">
            <Mail size={20} className="text-primary" />
          </span>
          <input
            type="email"
            className="form-control border-start-0"
            placeholder="Email"
            value={user_email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-3 input-group">
          <span className="input-group-text bg-white border-end-0">
            <Lock size={20} className="text-primary" />
          </span>
          <input
            type="password"
            className="form-control border-start-0"
            placeholder="Password"
            value={user_password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          className="btn btn-primary w-100 py-2 mt-3 fw-semibold"
          onClick={login}
        >
          Login
        </button>

        <div className="text-center mt-4">
          <span className="text-muted">Don’t have an account?</span>
          <Link to="/register" className="ms-2 text-decoration-none fw-bold text-primary">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
