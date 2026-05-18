import React, { useState, useEffect } from "react";

const watches = {
  Rolex: [
    {
      title: "Rolex Submariner",
      image:
        "/Homescreen/Sale/Rolex.webp",
      price: "$899",
      desc: "Luxury stainless steel waterproof watch.",
    },
    {
      title: "Rolex Daytona",
      image:
        "/Homescreen/Sale/Rolex.webp",
      price: "$999",
      desc: "Premium racing luxury watch design.",
    },
  ],

  Casio: [
    {
      title: "Casio G-Shock",
      image:
        "/Homescreen/Sale/Casio.avif",
      price: "$120",
      desc: "Shock resistant sporty watch.",
    },
    {
      title: "Casio Digital Pro",
      image:
        "/Homescreen/Sale/Casio.avif",
      price: "$95",
      desc: "Classic digital durable watch.",
    },
  ],

  Apple: [
    {
      title: "Apple Watch Ultra",
      image:
        "/Homescreen/Sale/apple.webp",
      price: "$499",
      desc: "Smart fitness tracking watch.",
    },
    {
      title: "Apple Watch Series 9",
      image:
        "/Homescreen/Sale/apple.webp",
      price: "$429",
      desc: "Advanced smartwatch with health features.",
    },
  ],

  Fossil: [
    {
      title: "Fossil Gen 6",
      image:
        "/Homescreen/Sale/fossl.webp",
      price: "$240",
      desc: "Modern smartwatch with leather strap.",
    },
    {
      title: "Fossil Classic",
      image:
        "/Homescreen/Sale/fossl.webp",
      price: "$180",
      desc: "Elegant classic design watch.",
    },
  ],

  Titan: [
    {
      title: "Titan Classic",
      image:
        "/Homescreen/Sale/ttan.jpg",
      price: "$90",
      desc: "Simple elegant formal watch.",
    },
    {
      title: "Titan Premium",
      image:
        "/Homescreen/Sale/ttan.jpg",
      price: "$110",
      desc: "Premium leather strap watch.",
    },
  ],
};

export default function Watchsale() {
  const [selected, setSelected] = useState("Rolex");
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
        background: "#f5f5f5",
        fontFamily: "Segoe UI",
      }}
    >
      {/* SIDEBAR */}
      <aside
        style={{
          width: isMobile ? "100%" : "15%",
          background: "#111",
          padding: "15px",
        }}
      >
        <h2 style={{ color: "#d4af37", textAlign: "center" }}>
          WATCHES
        </h2>

        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "row" : "column",
            gap: "10px",
            overflowX: "auto",
          }}
        >
          {Object.keys(watches).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelected(cat)}
              style={{
                padding: "10px",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                background:
                  selected === cat ? "#d4af37" : "#222",
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
          {selected} Watches
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
          {watches[selected].map((item, i) => (
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