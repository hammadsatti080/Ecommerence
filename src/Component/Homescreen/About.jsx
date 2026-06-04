import { useState, useEffect } from "react";
import React from "react";
import "./About.css";

export default function About() {
  const text = "Learn more about our company and what we offer";
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let i = 0;

    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, i));
      i++;

      if (i > text.length) {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container py-5">

      {/* HEADER */}
      <div className="text-center mb-5">

        {/* TITLE WITH BACKGROUND */}
        <h2 className="fw-bold d-inline-block px-4 py-2 rounded-pill bg-dark text-white shadow">
          About Us
        </h2>

        {/* TYPING TEXT BADGE */}
        <div className="mt-3">
          <span className="typing-badge">
            {displayedText}
            <span className="cursor">|</span>
          </span>
        </div>

      </div>

      {/* MAIN CONTENT */}
      <div className="row g-4 mb-4">

        {/* LEFT */}
        <div className="col-md-6 d-flex align-items-center">
          <div className="about-left-card">
            <div>
              <p className="text-muted lh-lg">
                Our company has been operating in the market for the past 4 to 5 years.
                We specialize in providing a wide range of high-quality products at
                affordable prices. Our focus is on customer satisfaction, trust, and
                long-term service relationships.
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="col-md-6">
          <div className="about-right-card">
            <h5 className="fw-semibold mb-3">Why Choose Us?</h5>
            <p className="text-muted mb-0">
              Reliable service, premium quality Items, and fast delivery experience
              that ensures customer satisfaction every time.
            </p>
          </div>
        </div>

      </div>

      {/* MOVING CARDS */}
      <div className="moving-wrapper">

        <div className="moving-track">

          <div className="moving-card card border-0 shadow-sm p-4">
            <h5 className="fw-semibold">High Quality Products</h5>
            <p className="text-muted mb-0">
              We carefully select and deliver only the best quality items.
            </p>
          </div>

          <div className="moving-card card border-0 shadow-sm p-4">
            <h5 className="fw-semibold">Fast & Secure Delivery</h5>
            <p className="text-muted mb-0">
              Quick delivery service ensuring your orders arrive safely and on time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}