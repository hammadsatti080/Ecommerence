import React, { useState, useEffect } from "react";

export default function ForgetPasswordCaptcha() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [step, setStep] = useState(1); // start with modal open step 1
    const [email, setEmail] = useState("");
    const [captcha, setCaptcha] = useState("");
    const [typedCaptcha, setTypedCaptcha] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (step === 1) generateCaptcha();
    }, [step]);

    const generateCaptcha = () => {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let text = "";
        for (let i = 0; i < 6; i++) {
            text += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        setCaptcha(text);
    };

    const handleVerifyCaptcha = () => {
        if (!email) return alert("Enter email.");
        if (typedCaptcha !== captcha) return alert("CAPTCHA does not match.");
        setStep(2);
    };

    const handleResetPassword = async () => {
        if (!newPassword) return alert("Enter new password.");

        try {
            const res = await fetch("http://localhost:5000/api/auth/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, newPassword }),
            });
            const data = await res.json();
            setMessage(data.message || "Password updated successfully!");
            setStep(1);
            setEmail("");
            setTypedCaptcha("");
            setNewPassword("");
            generateCaptcha();
        } catch (err) {
            console.error(err);
            setMessage("Error updating password.");
        }
    };

    // Modal styles
    const overlayStyle = {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: isModalOpen ? "flex" : "none",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
    };

    const modalStyle = {
        backgroundColor: "#ffffff",
        borderRadius: "12px",
        padding: "30px",
        width: "90%",
        maxWidth: "400px",
        boxShadow: "0 12px 24px rgba(0,0,0,0.25)",
        display: "flex",
        flexDirection: "column",
    };

    const inputStyle = {
        width: "100%",
        padding: "12px",
        marginBottom: "15px",
        borderRadius: "8px",
        border: "1px solid #ccc",
        fontSize: "14px",
        outline: "none",
        transition: "border-color 0.3s",
    };

    const buttonStyle = {
        width: "100%",
        padding: "14px",
        borderRadius: "8px",
        border: "none",
        backgroundColor: "#4CAF50",
        color: "#fff",
        fontSize: "16px",
        fontWeight: "bold",
        cursor: "pointer",
        transition: "all 0.3s ease",
    };

    const captchaStyle = {
        backgroundColor: "#f7f7f7",
        textAlign: "center",
        padding: "12px",
        fontWeight: "bold",
        borderRadius: "8px",
        letterSpacing: "4px",
        marginBottom: "15px",
        fontSize: "18px",
        userSelect: "none",
    };

    return (
        <div>
            <button
                onClick={() => setIsModalOpen(true)}
                style={{ ...buttonStyle, maxWidth: "200px", margin: "50px auto", display: "block" }}
            >
                Forget Password
            </button>

            {/* Modal */}
            <div style={overlayStyle}>
                <div style={modalStyle}>
                    <button
                        onClick={() => setIsModalOpen(false)}
                        style={{ alignSelf: "flex-end", marginBottom: "10px", background: "none", border: "none", fontSize: "18px", cursor: "pointer" }}
                    >
                        &times;
                    </button>

                    {step === 1 && (
                        <div>
                            <h3 style={{ textAlign: "center", marginBottom: "20px" }}>Enter Email & CAPTCHA</h3>
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                style={inputStyle}
                                onFocus={(e) => (e.currentTarget.style.borderColor = "#4CAF50")}
                                onBlur={(e) => (e.currentTarget.style.borderColor = "#ccc")}
                            />
                            <div style={captchaStyle}>{captcha}</div>
                            <input
                                type="text"
                                placeholder="Type CAPTCHA"
                                value={typedCaptcha}
                                onChange={(e) => setTypedCaptcha(e.target.value)}
                                style={inputStyle}
                                onFocus={(e) => (e.currentTarget.style.borderColor = "#4CAF50")}
                                onBlur={(e) => (e.currentTarget.style.borderColor = "#ccc")}
                            />
                            <button
                                onClick={handleVerifyCaptcha}
                                style={buttonStyle}
                                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#45a049")}
                                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#4CAF50")}
                            >
                                Verify CAPTCHA
                            </button>
                        </div>
                    )}

                    {step === 2 && (
                        <div>
                            <h3 style={{ textAlign: "center", marginBottom: "20px" }}>Reset Password</h3>
                            <p style={{ textAlign: "center" }}>Email: <strong>{email}</strong></p>
                            <input
                                type="password"
                                placeholder="New Password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                style={inputStyle}
                                onFocus={(e) => (e.currentTarget.style.borderColor = "#4CAF50")}
                                onBlur={(e) => (e.currentTarget.style.borderColor = "#ccc")}
                            />
                            <button
                                onClick={handleResetPassword}
                                style={buttonStyle}
                                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#45a049")}
                                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#4CAF50")}
                            >
                                Update Password
                            </button>
                            {message && (
                                <p style={{ marginTop: "20px", color: "#4CAF50", fontWeight: "bold", textAlign: "center" }}>
                                    {message}
                                </p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}