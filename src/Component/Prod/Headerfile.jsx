import React from "react";

export default function WhyUs() {
    return (
        <div
            style={{
                backgroundImage: "url('/Homescreen/Home.jpeg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                minHeight: "100vh",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
                color: "white",
                overflow: "hidden",
            }}
        >
            {/* Dark Overlay */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    background: "rgba(0, 0, 0, 0.55)",
                }}
            />

            {/* Animations */}
            <style>
                {`
          @keyframes fadeUp {
            from {
              opacity: 0;
              transform: translateY(60px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes zoomIn {
            from {
              opacity: 0;
              transform: scale(0.8);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }

          @keyframes float {
            0% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-12px);
            }
            100% {
              transform: translateY(0px);
            }
          }

          @keyframes pulseGlow {
            0% {
              box-shadow: 0 0 15px rgba(255,255,255,0.15);
            }
            50% {
              box-shadow: 0 0 35px rgba(250,204,21,0.35);
            }
            100% {
              box-shadow: 0 0 15px rgba(255,255,255,0.15);
            }
          }

          @keyframes shine {
            0% {
              background-position: -200px;
            }
            100% {
              background-position: 400px;
            }
          }

          .fade-up {
            animation: fadeUp 1s ease forwards;
          }

          .zoom-in {
            animation: zoomIn 1.2s ease forwards;
          }

          .floating {
            animation: float 4s ease-in-out infinite;
          }

          .delay-1 {
            animation-delay: 0.2s;
            opacity: 0;
          }

          .delay-2 {
            animation-delay: 0.5s;
            opacity: 0;
          }

          .delay-3 {
            animation-delay: 0.8s;
            opacity: 0;
          }

          .delay-4 {
            animation-delay: 1.1s;
            opacity: 0;
          }

          .badge {
            padding: 14px 24px;
            border-radius: 999px;
            background: rgba(255,255,255,0.08);
            border: 1px solid rgba(255,255,255,0.15);
            backdrop-filter: blur(4px);
            transition: all 0.35s ease;
            cursor: pointer;
            animation: pulseGlow 4s infinite;
          }

          .badge:hover {
            transform: translateY(-6px) scale(1.05);
            background: rgba(255,255,255,0.15);
          }

          .heading-gradient {
            background: linear-gradient(
              90deg,
              #ffffff,
              #facc15,
              #ffffff
            );
            background-size: 300% auto;
            animation: shine 6s linear infinite;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
        `}
            </style>

            {/* Content */}
            <div
                style={{
                    position: "relative",
                    zIndex: 2,
                    textAlign: "center",
                    width: "90%",
                    maxWidth: "850px",
                    margin: "0 auto",
                    padding: "20px",
                }}
            >
                {/* Small Heading */}

                <h3
                    className="fade-up delay-1"
                    style={{
                        letterSpacing: "4px",
                        textTransform: "uppercase",
                        fontSize: "14px",
                        color: "#facc15",
                        marginBottom: "20px",
                        fontWeight: "600",
                    }}
                >
                    Why Choose Us
                </h3>

                {/* Main Heading */}

                <h1
                    className="zoom-in delay-2"
                    style={{
                      //  fontSize: "clamp(2.5rem, 5vw, 5rem)",
                      fontSize:"30px",
                        fontWeight: "800",
                        lineHeight: "1.1",
                        marginBottom: "30px",
                        color: "#fff",
                        textShadow:
                            "0 5px 15px rgba(0,0,0,0.4), 0 0 25px rgba(255,255,255,0.15)",
                    }}
                >
                    Delivering Excellence
                    <br />
                    Through Innovation,
                    <br />
                    Quality & Trust
                </h1>
                {/* Description */}

                <p
                    className="fade-up delay-3"
                    style={{
                        fontSize: "clamp(1rem, 2vw, 1.2rem)",
                        lineHeight: "1.9",
                        maxWidth: "700px",
                        margin: "0 auto",
                        color: "#f3f4f6",
                    }}
                >
                    We focus on creating reliable, high-quality solutions that
                    help our customers achieve better results. Through
                    innovation, customer satisfaction, and continuous
                    improvement, we deliver experiences that inspire trust,
                    create value, and drive long-term success.
                </p>

                {/* Features */}

                <div
                    className="fade-up delay-4"
                    style={{
                        marginTop: "50px",
                        display: "flex",
                        justifyContent: "center",
                        gap: "20px",
                        flexWrap: "wrap",
                    }}
                >
                    <span className="badge floating">
                        🚀 High Performance
                    </span>

                    <span
                        className="badge floating"
                        style={{
                            animationDelay: "0.8s",
                        }}
                    >
                        🛡 Trusted Quality
                    </span>

                    <span
                        className="badge floating"
                        style={{
                            animationDelay: "1.6s",
                        }}
                    >
                        ⭐ Customer Focused
                    </span>
                </div>
            </div>
        </div>
    );
}