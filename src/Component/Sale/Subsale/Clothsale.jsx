import React, { useState, useEffect } from "react";

const products = {
  "T-Shirts": [
    {
      title: "Premium Summer T-Shirt",
      image: "/Homescreen/Sale/Tshrt.jpg",
      price: "$29",
      desc: "Soft cotton breathable summer t-shirt.",
    },
    {
      title: "Oversized Street Tee",
      image: "/Homescreen/Sale/Tshrt.jpg",
      price: "$25",
      desc: "Trendy oversized streetwear style.",
    },
  ],

  Jeans: [
    {
      title: "Blue Slim Fit Jeans",
      image: "/Homescreen/Sale/Jeans.jpg",
      price: "$45",
      desc: "Stretchable slim fit modern jeans.",
    },
    {
      title: "Black Cargo Jeans",
      image: "/Homescreen/Sale/Jeans.jpg",
      price: "$50",
      desc: "Stylish cargo jeans with pockets.",
    },
  ],

  Jackets: [
    {
      title: "Denim Jacket",
      image: "/Homescreen/Sale/jacets.jpg",
      price: "$60",
      desc: "Classic denim jacket premium style.",
    },
    {
      title: "Leather Jacket",
      image: "/Homescreen/Sale/jacets.jpg",
      price: "$90",
      desc: "Bold biker leather jacket.",
    },
  ],

  Hoodies: [
    {
      title: "Winter Hoodie",
      image: "/Homescreen/Sale/hoddes.jpg",
      price: "$39",
      desc: "Soft fleece warm hoodie.",
    },
    {
      title: "Zip Hoodie",
      image: "/Homescreen/Sale/hoddes.jpg",
      price: "$42",
      desc: "Stylish zip-up hoodie.",
    },
  ],

  Shoes: [
    {
      title: "Running Sneakers",
      image: "/Homescreen/Sale/shoe.webp",
      price: "$70",
      desc: "Comfortable running shoes.",
    },
    {
      title: "Casual White Shoes",
      image: "/Homescreen/Sale/shoe.webp",
      price: "$55",
      desc: "Clean white casual sneakers.",
    },
  ],

  Langa: [
    {
      title: "Langa",
      image: "/Homescreen/Sale/langa.jpg",
      price: "$15",
      desc: "Stylish streetwear langa.",
    },
    {
      title: "Langa Premium",
      image: "/Homescreen/Sale/langa.jpg",
      price: "$18",
      desc: "Lightweight premium design langa.",
    },
  ],
};

export default function Clothsale() {
  const [selected, setSelected] = useState("T-Shirts");
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
        background: "#f7f5f2",
        fontFamily: "Segoe UI",
      }}
    >

      {/* SIDEBAR */}
      <aside
        style={{
          width: isMobile ? "100%" : "15%",
          background: "#111",
          padding: "12px",
        }}
      >
        <h2 style={{ color: "#c9a96e", textAlign: "center" }}>
          CLOTHES
        </h2>

        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "row" : "column",
            flexWrap: "wrap",
            gap: "8px",
            justifyContent: "center",
          }}
        >
          {Object.keys(products).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelected(cat)}
              style={{
                padding: "8px 10px",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                background:
                  selected === cat ? "#c9a96e" : "#222",
                color: selected === cat ? "#000" : "#fff",
                fontSize: "12px",
                minWidth: isMobile ? "45%" : "100%",
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </aside>

      {/* MAIN */}
      <main
        style={{
          flex: 1,
          padding: isMobile ? "12px" : "20px",
        }}
      >
        <h2 style={{ marginBottom: "15px" }}>
          {selected} Collection
        </h2>

        {/* GRID */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile
              ? "1fr"
              : "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "15px",
          }}
        >
          {products[selected].map((item, i) => (
            <div
              key={i}
              style={{
                background: "#fff",
                borderRadius: "12px",
                padding: "12px",
                boxShadow:
                  "0 3px 10px rgba(0,0,0,0.08)",
                      height: "480px",
              }}
            >
              <img
                src={item.image}
                alt={item.title}
                style={{
                  width: "100%",
                  height: "380px",
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