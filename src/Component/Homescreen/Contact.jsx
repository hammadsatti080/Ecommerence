import React, { useState } from "react";

export default function Contact() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        message: "",
        rating: 0,
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
        if (form.rating === 0) {
            newErrors.rating = "Please select rating";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleRating = (value) => {
        setForm({ ...form, rating: value });
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
                setForm({ name: "", email: "", message: "", rating: 0, });
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

            {/* ⭐ Star Rating */}
            <div style={styles.ratingContainer}>
                <p>Select Rating:</p>

                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        type="button"
                        onClick={() => handleRating(star)}
                        style={{
                            ...styles.starBtn,
                            color:
                                form.rating >= star ? "#facc15" : "#cbd5e1",
                        }}
                    >
                        ★
                    </button>
                ))}
            </div>

            {errors.rating && (
                <p style={styles.error}>{errors.rating}</p>
            )}



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
    starBtn: {
        background: "transparent",
        border: "none",
        fontSize: "30px",
        cursor: "pointer",
        marginRight: "5px",
    },




    error: {
        color: "red",
        fontSize: "12px",
    },
};