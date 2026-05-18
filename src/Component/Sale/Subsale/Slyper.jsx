import React, { useState, useEffect } from "react";

const slippers = {
    Nike: {
        title: "Nike Comfort Slippers",
        image:
            "/Homescreen/Sale/slper.webp",
        price: "$45",
        oldPrice: "$60",
        save: "Save 25%",
        description:
            "Premium Nike slippers designed for daily comfort, lightweight feel, and soft cushioning.",
        reviews: [
            { text: "Very comfortable and soft.", avatar: "AK" },
            { text: "Perfect for daily use.", avatar: "RS" },
            { text: "Great quality build.", avatar: "MN" },
        ],
    },

    Adidas: {
        title: "Adidas Cloud Slippers",
        image:
            "/Homescreen/Sale/slper1.webp",
        price: "$40",
        oldPrice: "$55",
        save: "Save 27%",
        description:
            "Adidas ultra-soft slippers with modern design and anti-slip sole.",
        reviews: [
            { text: "Super light and comfy.", avatar: "AB" },
            { text: "Good grip and design.", avatar: "KD" },
            { text: "Worth the price.", avatar: "LM" },
        ],
    },

    Gucci: {
        title: "Gucci Luxury Slippers",
        image:
            "/Homescreen/Sale/gucc.jpg",
        price: "$120",
        oldPrice: "$150",
        save: "Save 20%",
        description:
            "Luxury Gucci slippers with premium leather finish and stylish designer look.",
        reviews: [
            { text: "Very premium feel.", avatar: "GT" },
            { text: "Luxury design is amazing.", avatar: "PR" },
            { text: "Super stylish.", avatar: "JK" },
        ],
    },

    Puma: {
        title: "Puma Sport Slippers",
        image:
            "/Homescreen/Sale/puma.avif",
        price: "$35",
        oldPrice: "$50",
        save: "Save 30%",
        description:
            "Sporty Puma slippers designed for gym, home, and outdoor comfort.",
        reviews: [
            { text: "Best for gym use.", avatar: "PM" },
            { text: "Very comfortable.", avatar: "RT" },
            { text: "Nice grip.", avatar: "SN" },
        ],
    },

    Bata: {
        title: "Bata Everyday Slippers",
        image:
            "/Homescreen/Sale/bata.webp",
        price: "$20",
        oldPrice: "$28",
        save: "Save 28%",
        description:
            "Affordable Bata slippers for everyday use with soft sole and durable build.",
        reviews: [
            { text: "Budget friendly.", avatar: "BT" },
            { text: "Very durable.", avatar: "HN" },
            { text: "Good for daily wear.", avatar: "AL" },
        ],
    },
};


const CartIcon = () => (
    <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
    >
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 001.98 1.61h9.72a2 2 0 001.98-1.61L23 6H6" />
    </svg>
);

export default function Slyper() {
    const [selected, setSelected] = useState("Nike");
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () =>
            setIsMobile(window.innerWidth <= 768);

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const item = slippers[selected];

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
                    padding: "20px",
                }}
            >
                <h2
                    style={{
                        color: "#d4af37",
                        textAlign: "center",
                        marginBottom: "20px",
                    }}
                >
                    SLIPPERS
                </h2>

                <div
                    style={{
                        display: "flex",
                        flexDirection: isMobile ? "row" : "column",
                        gap: "10px",
                        overflowX: "auto",
                    }}
                >
                    {Object.keys(slippers).map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelected(cat)}
                            style={{
                                background: selected === cat ? "#d4af37" : "#222",
                                color: selected === cat ? "#111" : "#fff",
                                border: "none",
                                padding: "12px",
                                borderRadius: "10px",
                                minWidth: "100px",
                            }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </aside>

            {/* MAIN */}
            <main style={{ flex: 1, padding: isMobile ? "15px" : "30px" }}>
                <div
                    style={{
                        display: "flex",
                        flexDirection: isMobile ? "column" : "row",
                        gap: "25px",
                        background: "#fff",
                        borderRadius: "20px",
                        padding: "20px",
                        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                    }}
                >
                    {/* IMAGE */}
                    <div style={{ width: isMobile ? "100%" : "40%" }}>
                        <img
                            src={item.image}
                            alt={item.title}
                            style={{
                                width: "100%",
                                borderRadius: "16px",
                                objectFit: "cover",
                            }}
                        />
                    </div>

                    {/* INFO */}
                    <div style={{ width: isMobile ? "100%" : "60%" }}>
                        <h1 style={{ fontSize: "30px", marginBottom: "10px" }}>
                            {item.title}
                        </h1>

                        <div style={{ display: "flex", gap: "10px" }}>
                            <span style={{ fontSize: "28px" }}>{item.price}</span>
                            <span style={{ textDecoration: "line-through", color: "#888" }}>
                                {item.oldPrice}
                            </span>
                            <span style={{ color: "green" }}>{item.save}</span>
                        </div>

                        <p style={{ margin: "15px 0", color: "#444" }}>
                            {item.description}
                        </p>

                        {/* REVIEWS */}
                        <div>
                            {item.reviews.map((r, i) => (
                                <div key={i} style={{ marginBottom: "10px" }}>
                                    <strong>{r.avatar}</strong> {r.text}
                                </div>
                            ))}
                        </div>

                        {/* BUTTONS */}
                        <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
                            <button
                                style={{
                                    background: "#111",
                                    color: "#fff",
                                    padding: "12px",
                                    flex: 1,
                                    borderRadius: "10px",
                                }}
                            >
                                <CartIcon /> Buy Now
                            </button>

                            <button
                                style={{
                                    border: "2px solid #111",
                                    padding: "12px",
                                    flex: 1,
                                    borderRadius: "10px",
                                }}
                            >
                                Add To Cart
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}