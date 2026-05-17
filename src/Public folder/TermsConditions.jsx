import React, { useState } from "react";

export default function TermsConditions({ setOpenModal }) {

    const [flip, setFlip] = useState(false);

    return (
        <div
            style={{
                perspective: "1000px",
                width: "100%",
                height: "420px",
            }}
        >

            {/* FLIP CARD */}
            <div
                onClick={() => setFlip(!flip)}
                style={{
                    width: "100%",
                    height: "100%",
                    marginTop: "100px",
                    position: "relative",
                    transformStyle: "preserve-3d",
                    transition: "0.8s",
                    cursor: "pointer",
                    transform: flip ? "rotateY(180deg)" : "rotateY(0deg)",
                }}
            >

                {/* FRONT */}
                <div
                    style={{
                        position: "absolute",
                        width: "100%",
                        height: "60%",
                        backfaceVisibility: "hidden",
                        background: "#000",
                        color: "#fff",
                        borderRadius: "20px",
                        padding: "20px",
                        overflowY: "auto",
                    }}
                >

                    {/* CLOSE */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setOpenModal(false);
                        }}
                        style={{
                            position: "absolute",
                            top: "10px",
                            right: "10px",
                            border: "none",
                            background: "#fff",
                            fontSize: "18px",
                            cursor: "pointer",
                            width: "32px",
                            height: "32px",
                            borderRadius: "50%"
                        }}
                    >
                        ×
                    </button>

                    <h2 style={{ textAlign: "center", fontSize: "22px" }}>
                        Order Guidelines
                    </h2>

                    <div style={{ fontSize: "14px", lineHeight: "24px" }}>

                        <p><b>1. Delivery Time:</b> 1–2 weeks depending on location.</p>
                        <p><b>2. Shipping:</b> Charges vary by area & order size.</p>
                        <p><b>3. International:</b> Available worldwide.</p>
                        <p><b>4. Confirmation:</b> After payment verification.</p>

                    </div>

                    <p style={{ textAlign: "center", marginTop: "10px", fontSize: "12px" }}>
                        Tap to flip →
                    </p>

                </div>

                {/* BACK */}
                <div
                    style={{
                        position: "absolute",
                        width: "100%",
                        height: "60%",
                        backfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                        background: "#111",
                        color: "#fff",
                        borderRadius: "20px",
                        padding: "20px",

                        display: "flex",
                        flexDirection: "column",

                    }}
                >

                    <h2 style={{ textAlign: "center", fontSize: "22px" }}>
                        Contact Info
                    </h2>
                    <div
                        style={{
                            paddingLeft: "40px",
                        }}
                    >
                        <p><b>Phone:</b> +92 300 1234567</p>
                        <p><b>Email:</b> support@example.com</p>
                        <p><b>Address:</b> Rawalpindi, Pakistan</p>
                    </div>
                    <p style={{ textAlign: "center", marginTop: "10px", fontSize: "12px" }}>
                        Tap to flip back →
                    </p>

                </div>

            </div>
        </div>
    );
}