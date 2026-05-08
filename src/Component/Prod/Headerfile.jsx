import React from "react";

export default function WhyUs() {
    return (
        <div
            style={{
                backgroundImage: "url('/Homescreen/Home3.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "white",
            }}
        >
            {/* ANIMATION STYLE */}
            <style>
                {`
          @keyframes fadeUp {
            from {
              opacity: 0;
              transform: translateY(40px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .animate {
            animation: fadeUp 1s ease forwards;
          }

          .delay-1 { animation-delay: 0.3s; opacity: 0; }
          .delay-2 { animation-delay: 0.6s; opacity: 0; }
          .delay-3 { animation-delay: 0.9s; opacity: 0; }
          .delay-4 { animation-delay: 1.2s; opacity: 0; }
        `}
            </style>

            <div
                style={{
                    textAlign: "center",
                    backdropFilter: "blur(10px)",
                    background: "rgba(0,0,0,0.4)",

                    padding: "clamp(20px, 5vw, 50px)",   // responsive padding
                    borderRadius: "20px",
                    width: "90%",                        // take screen width
                    maxWidth: "500px",                   // limit on large screens

                    margin: "0 auto",                    // center on mobile
                }}
            >
                <h2 className="animate delay-1" style={{ letterSpacing: "2px", opacity: 0.8 }}>
                    WHAT MAKES US SPECIAL ?
                </h2>

                <h1 className="animate delay-2" style={{ fontSize: "30px", margin: "20px 0" }}>
                    Faster Performance <br /> Smarter Experience Than The Rest
                </h1>

                <p className="animate delay-3" style={{ fontSize: "16px", lineHeight: "1.6" }}>
                    Our product is built with passion, designed for performance, and made
                    to stand out. We combine innovation with reliability so you always get
                    something better than the rest.
                </p>

                <div
                    className="animate delay-4"
                    style={{
                        marginTop: "30px",
                        display: "flex",
                        justifyContent: "center",
                        gap: "20px",
                        flexWrap: "wrap",
                    }}
                >
                    <span>🚀 Fast</span>
                    <span>💡 Smart</span>
                    <span>🔥 Unique</span>
                </div>
            </div>
        </div>
    );
}