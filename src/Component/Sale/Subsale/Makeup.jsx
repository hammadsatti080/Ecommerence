import React, { useState, useEffect } from "react";

const makeup = {
  Lipstick: [
    {
      title: "Matte Red Lipstick",
      image:
        "https://images.unsplash.com/photo-1586495777744-4413f21062fa",
      price: "$12",
      desc: "Long-lasting matte lipstick with bold red shade.",
    },
    {
      title: "Nude Soft Lipstick",
      image:
        "https://images.unsplash.com/photo-1596462502278-27bfdc403348",
      price: "$10",
      desc: "Natural nude shade for everyday look.",
    },
  ],

  Foundation: [
    {
      title: "Full Coverage Foundation",
      image:
        "https://images.unsplash.com/photo-1596704017254-9b121068fb31",
      price: "$18",
      desc: "Smooth full coverage foundation for flawless skin.",
    },
    {
      title: "Light Tone Foundation",
      image:
        "https://images.unsplash.com/photo-1612810436541-336d8f2a14a1",
      price: "$16",
      desc: "Lightweight foundation for natural glow.",
    },
  ],

  Perfume: [
    {
      title: "Luxury Floral Perfume",
      image:
        "https://images.unsplash.com/photo-1541643600914-78b084683601",
      price: "$35",
      desc: "Long-lasting floral fragrance perfume.",
    },
    {
      title: "Classic Oud Perfume",
      image:
        "https://images.unsplash.com/photo-1615634260167-c8cdede054de",
      price: "$40",
      desc: "Strong oriental oud fragrance for premium feel.",
    },
  ],

  Eyeliner: [
    {
      title: "Black Waterproof Eyeliner",
      image:
        "https://images.unsplash.com/photo-1620916566398-39f1143ab7be",
      price: "$8",
      desc: "Smudge-proof waterproof eyeliner.",
    },
    {
      title: "Precision Liquid Liner",
      image:
        "https://images.unsplash.com/photo-1616683693504-3ea7e9d0c8c1",
      price: "$9",
      desc: "Sharp precision liner for perfect wings.",
    },
  ],

  Skincare: [
    {
      title: "Vitamin C Serum",
      image:
        "https://images.unsplash.com/photo-1620916297397-1f3c8c2a1d55",
      price: "$22",
      desc: "Glow boosting vitamin C serum.",
    },
    {
      title: "Hydrating Face Cream",
      image:
        "https://images.unsplash.com/photo-1612810806695-30f7f5a0f3d4",
      price: "$20",
      desc: "Deep hydration cream for soft skin.",
    },
  ],
};

export default function Makeup() {
  const [selected, setSelected] = useState("Lipstick");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () =>
      setIsMobile(window.innerWidth <= 768);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        minHeight: "100vh",
        background: "#f7f0f5",
        fontFamily: "Segoe UI",
      }}
    >
      {/* SIDEBAR */}
      <aside
        style={{
          width: isMobile ? "100%" : "12%",
          background: "#111",
          padding: "15px",
        }}
      >
        <h2 style={{ color: "#ff4da6", textAlign: "center" }}>
          MAKEUP
        </h2>

        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "row" : "column",
            gap: "10px",
            overflowX: "auto",
          }}
        >
          {Object.keys(makeup).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelected(cat)}
              style={{
                padding: "10px",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                background:
                  selected === cat ? "#ff4da6" : "#222",
                color: selected === cat ? "#000" : "#fff",
                minWidth: "110px",
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </aside>

      {/* MAIN */}
      <main style={{ flex: 1, padding: "20px" }}>
        <h2 style={{ marginBottom: "15px" }}>
          {selected} Products
        </h2>

        {/* GRID */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile
              ? "1fr"
              : "repeat(3, 1fr)",
            gap: "15px",
          }}
        >
          {makeup[selected].map((item, i) => (
            <div
              key={i}
              style={{
                background: "#fff",
                borderRadius: "12px",
                padding: "12px",
                boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
              }}
            >
              <img
                src={item.image}
                alt={item.title}
                style={{
                  width: "100%",
                  height: "180px",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
              />

              <h3 style={{ marginTop: "10px" }}>
                {item.title}
              </h3>

              <p style={{ fontSize: "13px", color: "#555" }}>
                {item.desc}
              </p>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "10px",
                }}
              >
                <strong>{item.price}</strong>

                <button
                  style={{
                    padding: "6px 10px",
                    border: "none",
                    background: "#111",
                    color: "#fff",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                >
                  Buy
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}