import React, { useState, useEffect } from "react";

const data = {
  "Kitchen Tissue": [
    {
      title: "Soft Kitchen Tissue",
      image:
        "https://images.unsplash.com/photo-1583947581924-a0b6504a07e3",
      price: "$2",
      desc: "Ultra soft absorbent kitchen tissue for daily use.",
    },
    {
      title: "Premium Roll Tissue",
      image:
        "https://images.unsplash.com/photo-1604908554027-7b5c8c9a9f0d",
      price: "$3",
      desc: "Strong and long lasting paper roll tissue.",
    },
    {
      title: "Eco Tissue Pack",
      image:
        "https://images.unsplash.com/photo-1615486364462-ef6363a2c3d5",
      price: "$2.5",
      desc: "Eco friendly biodegradable tissue pack.",
    },
  ],

  Detergent: [
    {
      title: "Power Clean Detergent",
      image:
        "https://images.unsplash.com/photo-1585421514738-01798e348b17",
      price: "$5",
      desc: "Strong stain removing liquid detergent.",
    },
    {
      title: "Laundry Powder",
      image:
        "https://images.unsplash.com/photo-1583947215259-38e31be8751f",
      price: "$4",
      desc: "Deep cleaning powder for clothes.",
    },
  ],

  Cleaning: [
    {
      title: "Floor Cleaner",
      image:
        "https://images.unsplash.com/photo-1585421514284-efb74c2b4a8f",
      price: "$6",
      desc: "Kills 99% germs and cleans floors deeply.",
    },
    {
      title: "Glass Cleaner",
      image:
        "https://images.unsplash.com/photo-1583947581924-a0b6504a07e3",
      price: "$3",
      desc: "Crystal clear shine for glass surfaces.",
    },
  ],

  Grocery: [
    {
      title: "Rice Pack",
      image:
        "https://images.unsplash.com/photo-1600628422019-4a8c6b5b5f6a",
      price: "$10",
      desc: "Premium basmati rice 5kg pack.",
    },
    {
      title: "Cooking Oil",
      image:
        "https://images.unsplash.com/photo-1622483767028-3f66f32a7a4c",
      price: "$8",
      desc: "Pure cooking oil for daily meals.",
    },
  ],
};

export default function KitchenStore() {
  const [selected, setSelected] = useState("Kitchen Tissue");
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
        background: "#f4f4f4",
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
        <h2 style={{ color: "#fff", textAlign: "center" }}>
          STORE
        </h2>

        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "row" : "column",
            gap: "10px",
            overflowX: "auto",
          }}
        >
          {Object.keys(data).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelected(cat)}
              style={{
                padding: "10px",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
                background:
                  selected === cat ? "#ffcc00" : "#222",
                color: selected === cat ? "#000" : "#fff",
                minWidth: "120px",
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main style={{ flex: 1, padding: "20px" }}>
        <h2 style={{ marginBottom: "15px" }}>
          {selected} Products
        </h2>

        {/* PRODUCT GRID */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile
              ? "1fr"
              : "repeat(3, 1fr)",
            gap: "15px",
          }}
        >
          {data[selected].map((item, index) => (
            <div
              key={index}
              style={{
                background: "#fff",
                borderRadius: "12px",
                padding: "12px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
              }}
            >
              <img
                src={item.image}
                alt={item.title}
                style={{
                  width: "100%",
                  height: "150px",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
              />

              <h3 style={{ margin: "10px 0 5px" }}>
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
                  alignItems: "center",
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