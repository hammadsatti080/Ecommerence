import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer style={styles.footer}>

            <div style={styles.container}>

                {/* ================= BRAND ================= */}
                <div style={styles.col}>
                    <h2 style={styles.logo}>🛒 Ecommerce</h2>
                    <p style={styles.text}>
                        Your one-stop shop for quality products at best prices.
                    </p>
                </div>

                {/* ================= QUICK LINKS ================= */}
                <div style={styles.col}>
                    <h3 style={styles.title}>Quick Links</h3>

                    <div style={styles.supportRow}>
                        <Link to="/" style={styles.link}>Home</Link>
                        <Link to="/prod" style={styles.link}>Products</Link>
                        <Link to="/prod/69fa422a5b01f116d5f8e1c3" style={styles.link}>Cart</Link>
                        <Link to="/FAQ" style={styles.link}>Contact</Link>
                    </div>
                </div>

                {/* ================= SUPPORT ================= */}
                <div style={styles.col}>
                    <h3 style={styles.title}>Support</h3>

                    <div style={styles.supportRow}>
                        <a href="/FAQ" style={styles.link}>FAQ</a>
                        <a href="/FAQ" style={styles.link}>Privacy Policy</a>
                    </div>
                </div>

                {/* ================= CONTACT ================= */}
                <div style={styles.col}>
                    <h3 style={styles.title}>Contact</h3>
                    <p style={styles.text}>📧 support@ecommerce.com</p>
                    <p style={styles.text}>📞 +92 300 1234567</p>
                    <p style={styles.text}>📍 Pakistan</p>
                </div>

            </div>

            {/* ================= BOTTOM ================= */}
            <div style={styles.bottom}>
                © {new Date().getFullYear()} Ecommerce. All rights reserved.
            </div>

        </footer>
    );
}

/* ================= INLINE STYLES ================= */
const styles = {

    footer: {
        background: "#111",
        color: "#fff",
        marginTop: "40px",
    },

    container: {
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "20px",
        padding: "40px 20px",
        maxWidth: "1100px",
        margin: "0 auto",
    },

    col: {
        flex: "1",
        minWidth: "200px",
    },

    logo: {
        fontSize: "20px",
        marginBottom: "10px",
    },

    title: {
        fontSize: "16px",
        marginBottom: "10px",
        color: "#f1f1f1",
    },

    text: {
        fontSize: "13px",
        color: "#bbb",
        marginBottom: "8px",
        lineHeight: "1.5",
    },

    /* LINKS ROW */
    supportRow: {
        display: "flex",
        flexDirection: "column",
        gap: "6px",
    },

    link: {
        fontSize: "13px",
        color: "#bbb",
        textDecoration: "none",
        cursor: "pointer",
        transition: "0.3s",
    },

    bottom: {
        textAlign: "center",
        padding: "15px",
        borderTop: "1px solid #333",
        fontSize: "12px",
        color: "#888",
    },
};