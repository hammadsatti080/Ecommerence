import { useState } from "react";
import Forgetpswd from "./Forgetpswd";

const API_BASE = "http://localhost:5000/api";

export default function UserLogin() {
  const [mode, setMode] = useState("signup");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setMessage(null);
  };

  const switchMode = (m) => {
    setMode(m);
    setMessage(null);

    setForm({
      name: "",
      email: "",
      phone: "",
      password: "",
    });
  };

  // ================= LOGIN / SIGNUP =================
  const handleSubmit = async () => {
    setLoading(true);
    setMessage(null);

    try {
      const endpoint =
        mode === "login" ? "/auth/login" : "/auth/signup";

      const body =
        mode === "login"
          ? {
            email: form.email,
            password: form.password,
          }
          : form;

      const res = await fetch(`${API_BASE}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage({ type: "error", text: data.message });
        return;
      }

      if (mode === "login") {
        localStorage.setItem("user", JSON.stringify(data.user));

        setMessage({
          type: "success",
          text: "Login successful!",
        });

        setTimeout(() => {
          window.location.href = "/usernavbar";
        }, 1200);
      } else {
        setMessage({
          type: "success",
          text: "Account created successfully!",
        });

        setTimeout(() => switchMode("login"), 1200);
      }
    } catch {
      setMessage({
        type: "error",
        text: "Server error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.root}>
      <div style={styles.card} className="shadow-lg bg-white">
        <h1 style={styles.title}>User Portal</h1>

        {message && (
          <div
            style={{
              ...styles.message,
              background:
                message.type === "success"
                  ? "#163d2a"
                  : "#442222",
            }}
          >
            {message.text}
          </div>
        )}

        {/* LOGIN */}
        {mode === "login" && (
          <>
            <input
              style={styles.input}
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
            />

            <input
              style={styles.input}
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
            />

            <button style={styles.button} onClick={handleSubmit}>
              {loading ? "Loading..." : "Login"}
            </button>

            <p style={styles.linkText}>
              Don't have account?{" "}
              <span
                style={styles.link}
                onClick={() => switchMode("signup")}
              >
                Sign Up
              </span>
               <Forgetpswd />
            </p>
          </>
        )}

        {/* SIGNUP */}
        {mode === "signup" && (
          <>
            <input
              style={styles.input}
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
            />

            <input
              style={styles.input}
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
            />

            <input
              style={styles.input}
              name="phone"
              placeholder="Phone"
              value={form.phone}
              onChange={handleChange}
            />

            <input
              style={styles.input}
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
            />

            <button style={styles.button} onClick={handleSubmit}>
              {loading ? "Loading..." : "Create Account"}
            </button>

            <p style={styles.linkText}>
              Already have account?{" "}
              <span
                style={styles.link}
                onClick={() => switchMode("login")}
              >
                Login
              </span>

             

            </p>
          </>
        )}
      </div>
    </div>
  );
}

const styles = {
  root: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
   // background: "#0f172a",
    fontFamily: "Arial",
  },
card: {
  width: 400,
  background: "#f5f5f5", // light gray (dark-ish white)
  color: "#111",          // dark text for contrast
  padding: 30,
  borderRadius: 14,
  display: "flex",
  flexDirection: "column",
  gap: 15,
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)", // subtle shadow
  
},
  title: { color: "black", textAlign: "center" },
  input: {
    padding: 14,
    borderRadius: 8,
    border: "1px solid #374151",
   // background: "#1f2937",
    color: "#1f2937",
  },
  button: {
    padding: 14,
    border: "none",
    borderRadius: 8,
    background: "#2563eb",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
  },
  linkText: { color: "#9ca3af", textAlign: "center" },
  link: { color: "#60a5fa", cursor: "pointer" },
  message: {
    padding: 12,
    borderRadius: 8,
    color: "white",
    textAlign: "center",
  },
};