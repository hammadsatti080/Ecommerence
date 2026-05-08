import React, { useState } from "react";

export default function Contact() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        message: "",
    });

    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(false);

    const validate = () => {
        let newErrors = {};

        if (!form.name.trim()) {
            newErrors.name = "Name is required";
        }

        if (!form.email) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(form.email)) {
            newErrors.email = "Invalid email";
        }

        if (!form.message.trim()) {
            newErrors.message = "Message is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        if (!validate()) return;

        setLoading(true);
        setStatus("");

        try {
            const res = await fetch("http://localhost:5000/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });

            const data = await res.json();

            if (res.ok) {
                setStatus("✅ Message sent successfully!");
                setForm({ name: "", email: "", message: "" });
            } else {
                setStatus("❌ " + data.error);
            }
        } catch (err) {
            console.error("Frontend error:", err);
            setStatus("❌ Server error");
        }

        setLoading(false);
    };

    return (
        <div>
            <h2>📞 Contact Us</h2>

            <input
                style={styles.input}
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
            />
            {errors.name && <p style={styles.error}>{errors.name}</p>}

            <input
                style={styles.input}
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
            />
            {errors.email && <p style={styles.error}>{errors.email}</p>}

            <textarea
                style={styles.textarea}
                name="message"
                placeholder="Message"
                value={form.message}
                onChange={handleChange}
            />
            {errors.message && <p style={styles.error}>{errors.message}</p>}

            <button
                style={styles.btn}
                onClick={handleSubmit}
                disabled={loading}
            >
                {loading ? "Sending..." : "Send Message"}
            </button>

            {status && <p>{status}</p>}
        </div>
    );
}

const styles = {
    input: {
        width: "100%",
        padding: "10px",
        marginBottom: "10px",
        border: "1px solid #ddd",
        borderRadius: "8px",
    },
    textarea: {
        width: "100%",
        padding: "10px",
        height: "80px",
        marginBottom: "10px",
        border: "1px solid #ddd",
        borderRadius: "8px",
    },
    btn: {
        width: "100%",
        padding: "10px",
        border: "none",
        borderRadius: "8px",
        background: "#2563eb",
        color: "#fff",
        cursor: "pointer",
        fontWeight: "600",
    },
    error: {
        color: "red",
        fontSize: "12px",
    },
};