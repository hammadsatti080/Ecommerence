import React, { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === "admin@gmail.com" && password === "123456") {
      setError("");
      alert("Login Successful ✅");

      // redirect example (if using react-router)
      window.location.href = "/dashboards";
    } else {
      setError("Invalid email or password ❌");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        height: "100vh",
        background: "linear-gradient(135deg,#f8f9fa,#ffffff)"
      }}
    >
      <div
        className="p-4 shadow-lg bg-white"
        style={{
          width: "90%",
          maxWidth: 400,
          borderRadius: 15
        }}
      >

        {/* Header */}
        <div className="text-center mb-4">
          <div
            style={{
              width: 50,
              height: 50,
              borderRadius: "50%",
              background: "linear-gradient(135deg,#e94560,#ff7a7a)",
              margin: "0 auto 10px"
            }}
          ></div>
          <h4 className="fw-bold">Admin Login</h4>
          <p className="text-muted" style={{ fontSize: 13 }}>
            Access your ecommerce dashboard
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="alert alert-danger py-2 text-center" style={{ fontSize: 13 }}>
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin}>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="admin@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ borderRadius: 10 }}
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ borderRadius: 10 }}
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="btn w-100 text-white"
            style={{
              background: "linear-gradient(135deg,#e94560,#ff7a7a)",
              borderRadius: 10,
              padding: "10px"
            }}
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="text-center mt-3 text-muted" style={{ fontSize: 12 }}>
          © 2026 Ecommerce Admin Panel
        </p>

      </div>
    </div>
  );
}