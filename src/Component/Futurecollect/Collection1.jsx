import React, { useState } from "react";
import { FaSprayCanSparkles } from "react-icons/fa6";
export default function Collection1() {
    const [gender, setGender] = useState("female");
    const [flipped, setFlipped] = useState(null);

    /* ================= FRONTEND DATA ================= */
    const perfumes = [
        {
            id: 1,
            name: "Royal Oud",
            gender: "male",
            price: 1200,
            // image: "data:image/jpeg;base64,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",
            image: "./Homescreen/Perfume/arman.webp",
            note: "Woody • Strong • Luxury",
            brand: "Armani"
        },
        {
            id: 2,
            name: "Dark Musk",
            gender: "male",
            price: 950,
            image: "./Homescreen/Perfume/Dior1.webp",
            note: "Musky • Bold • Night Wear",
            brand: "Dior"
        },
        {
            id: 3,
            name: "Blossom Rose",
            gender: "female",
            price: 1100,
            image: "./Homescreen/Perfume/Chanel1.webp",
            note: "Floral • Soft • Elegant",
            brand: "Chanel"
        },
        {
            id: 4,
            name: "Vanilla Dream",
            gender: "female",
            price: 850,
            image: "./Homescreen/Perfume/Gucci1.webp",
            note: "Sweet • Warm • Cozy",
            brand: "Gucci"
        },
        {
            id: 5,
            name: "Blossom Rose",
            gender: "female",
            price: 1100,
            image: "./Homescreen/Perfume/Chanel3.jpg",
            note: "Floral • Soft • Elegant",
            brand: "Chanel"
        },
        {
            id: 6,
            name: "Vanilla Dream",
            gender: "female",
            price: 850,
            image: "./Homescreen/Perfume/Gucci3.webp",
            note: "Sweet • Warm • Cozy",
            brand: "Gucci"
        },
        {
            id: 7,
            name: "Vanilla Dream",
            gender: "female",
            price: 850,
            image: "./Homescreen/Perfume/Gucci4.jpg",
            note: "Sweet • Warm • Cozy",
            brand: "Gucci"
        },
        {
            id: 9,
            name: "Dark Musk",
            gender: "male",
            price: 950,
            image: "./Homescreen/Perfume/Dior2.jpg",
            note: "Musky • Bold • Night Wear",
            brand: "Dior"
        },
    ];

    const filtered = perfumes.filter((p) => p.gender === gender);

    return (
        <div style={styles.page}>

            {/* HEADER */}
            <h1 style={styles.title}><FaSprayCanSparkles /> Perfume Collection</h1>

            {/* FILTER BUTTONS */}
            <div style={styles.filterRow}>
                <button
                    style={gender === "male" ? styles.activeBtn : styles.btn}
                    onClick={() => setGender("male")}
                >
                    Men
                </button>

                <button
                    style={gender === "female" ? styles.activeBtn : styles.btn}
                    onClick={() => setGender("female")}
                >
                    Women
                </button>
            </div>

            {/* GRID */}
            <div style={styles.grid}>
                {filtered.map((p, index) => (
                    <div
                        key={p.id}
                        style={styles.cardContainer}
                        onClick={() =>
                            setFlipped(flipped === index ? null : index)
                        }
                    >
                        <div
                            style={{
                                ...styles.cardInner,
                                transform:
                                    flipped === index
                                        ? "rotateY(180deg)"
                                        : "rotateY(0deg)"
                            }}
                        >

                            {/* FRONT */}
                            <div style={styles.front}>
                                <img src={p.image} alt={p.name} style={styles.img} />
                            </div>

                            {/* BACK */}
                            <div style={styles.back}>
                                <h3 style={{ margin: 0 }}>{p.name}</h3>
                                <p style={styles.brand}>{p.brand}</p>
                                <p style={styles.note}>{p.note}</p>
                                <p style={styles.price}>{p.price}</p>

                                <div style={styles.contact}>
                                    📞 +92-300-1234567 <br />
                                    📧 perfume@shop.com
                                </div>
                            </div>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

/* ================= STYLES ================= */

const styles = {
    page: {
        padding: "20px",
        minHeight: "100vh",
        textAlign: "center"
    },

    title: {
        fontSize: "28px",
        marginBottom: "15px"
    },

    filterRow: {
        marginBottom: "20px"
    },

    btn: {
        padding: "10px 16px",
        margin: "0 8px",
        borderRadius: "20px",
        border: "1px solid #ddd",
        background: "#fff",
        cursor: "pointer"
    },

    activeBtn: {
        padding: "10px 16px",
        margin: "0 8px",
        borderRadius: "20px",
        border: "none",
        background: "#111",
        color: "#fff",
        cursor: "pointer"
    },

    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
        gap: "16px"
    },

    /* FLIP */
    cardContainer: {
        perspective: "1000px",
        height: "280px",
        cursor: "pointer"
    },

    cardInner: {
        width: "100%",
        height: "100%",
        position: "relative",
        transition: "transform 0.6s",
        transformStyle: "preserve-3d"
    },

    front: {
        position: "absolute",
        width: "100%",
        height: "100%",
        backfaceVisibility: "hidden",
        borderRadius: "14px",
        overflow: "hidden"
    },

    back: {
        position: "absolute",
        width: "100%",
        height: "100%",
        backfaceVisibility: "hidden",
        transform: "rotateY(180deg)",
        background: "#111",
        color: "#fff",
        borderRadius: "14px",
        padding: "15px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
    },

    img: {
        width: "100%",
        height: "100%",
        objectFit: "cover"
    },

    brand: {
        fontSize: "13px",
        color: "#aaa",
        margin: "5px 0"
    },

    note: {
        fontSize: "13px",
        color: "#ccc"
    },

    price: {
        fontSize: "16px",
        fontWeight: "bold",
        color: "#4ade80"
    },

    contact: {
        fontSize: "11px",
        opacity: 0.7,
        marginTop: "10px"
    }
};