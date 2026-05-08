import React, { useEffect, useState } from "react";
import Contact from "./Contact";

export default function ContactFAQ() {
    const [openIndex, setOpenIndex] = useState(null);
    const [isMobile, setIsMobile] = useState(false);

    const faqs = [
        { q: "Delivery time?", a: "2–5 working days depending on location." },
        { q: "Return policy?", a: "7 days return policy on unused items." },
        { q: "Cash on delivery?", a: "Yes, COD available in most areas." },
        { q: "Track order?", a: "You will get tracking ID after shipping." },
    ];

    // detect screen size
    useEffect(() => {
        const checkSize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkSize();
        window.addEventListener("resize", checkSize);

        return () => window.removeEventListener("resize", checkSize);
    }, []);

    const toggle = (i) => {
        setOpenIndex(openIndex === i ? null : i);
    };

    return (
        <div style={styles.wrapper}>

            <div
                style={{
                    ...styles.grid,
                    gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                }}
            >
                {/* ================= FAQ ================= */}
                <div style={styles.box}>
                    <h2>❓ FAQ</h2>

                    {faqs.map((f, i) => (
                        <div key={i} style={styles.faqCard}>

                            <div style={styles.question} onClick={() => toggle(i)}>
                                {f.q}
                                <span>{openIndex === i ? "−" : "+"}</span>
                            </div>

                            {openIndex === i && (
                                <div style={styles.answer}>{f.a}</div>
                            )}

                        </div>
                    ))}
                </div>

                {/* ================= CONTACT ================= */}
                <div style={styles.box}>
                    <Contact /> 
                </div>



            </div>
        </div>
    );
}

/* ================= INLINE STYLES ================= */
const styles = {

    wrapper: {
        padding: "30px 20px",
        background: "#f6f7fb",
    },

    grid: {
        display: "grid",
        gap: "20px",
        maxWidth: "1100px",
        margin: "0 auto",
    },

    box: {
        background: "#fff",
        padding: "20px",
        borderRadius: "14px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    },

    text: {
        fontSize: "14px",
        color: "#666",
        marginBottom: "15px",
    },

    
    faqCard: {
        background: "#f9f9f9",
        marginBottom: "10px",
        padding: "12px",
        borderRadius: "10px",
    },

    question: {
        display: "flex",
        justifyContent: "space-between",
        cursor: "pointer",
        fontWeight: "600",
    },

    answer: {
        marginTop: "8px",
        fontSize: "13px",
        color: "#555",
    },
};