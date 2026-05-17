import { React, useState } from "react";
import TermsConditions from "./TermsConditions";

export default function Footer() {

    const [openModal, setOpenModal] = useState(false);

    const handlebuttons = () => {
        setOpenModal(true);
    };

    return (
        <footer style={styles.footer}>

            <div style={styles.container}>

                {/* BRAND */}
                <div style={styles.col}>
                    <h2 style={styles.logo}>🛒 Ecommerce</h2>
                    <p style={styles.text}>
                        Your one-stop shop for quality products at best prices.
                    </p>
                </div>

                {/* QUICK LINKS */}
                <div style={styles.col}>
                    <h3 style={styles.title}>Quick Links</h3>

                    <div style={styles.supportRow}>
                        <a href="/" style={styles.link}>Home</a>
                        <a href="/prod" style={styles.link}>Products</a>
                        <a href="/FAQ" style={styles.link}>Contact</a>
                    </div>
                </div>

                {/* SUPPORT */}
                <div style={styles.col}>
                    <h3 style={styles.title}>Support</h3>

                    <div style={styles.supportRow}>
                        <a href="/FAQ" style={styles.link}>Contact</a>

                        {/* SMALL BUTTON */}
                        <button
                            onClick={handlebuttons}
                            style={styles.smallBtn}
                        >
                            Terms & Conditions
                        </button>
                    </div>
                </div>

                {/* CONTACT */}
                <div style={styles.col}>
                    <h3 style={styles.title}>Contact</h3>
                    <p style={styles.text}>📧 support@ecommerce.com</p>
                    <p style={styles.text}>📞 +92 300 1234567</p>
                    <p style={styles.text}>📍 Pakistan</p>
                </div>

            </div>

            {/* FOOTER BOTTOM */}
            <div style={styles.bottom}>
                © {new Date().getFullYear()} Ecommerce. All rights reserved.
            </div>

            {/* MODAL OUTSIDE FLEX (IMPORTANT FIX) */}
            {openModal && (
                <div style={styles.modalOverlay}>
                    <div style={styles.modalBox}>
                        <TermsConditions setOpenModal={setOpenModal} />
                    </div>
                </div>
            )}

        </footer>
    );
}

/* ================= STYLES ================= */
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
    },

    supportRow: {
        display: "flex",
        flexDirection: "column",
        gap: "8px",
    },

    link: {
        fontSize: "13px",
        color: "#bbb",
        textDecoration: "none",
        cursor: "pointer",
    },

    /* ✅ SMALL BUTTON */
    smallBtn: {
        background: "#222",
        color: "#bbb",
        border: "1px solid #333",
        padding: "6px 10px",
        fontSize: "12px",
        borderRadius: "20px",
        cursor: "pointer",
        width: "fit-content"
    },

    bottom: {
        textAlign: "center",
        padding: "15px",
        borderTop: "1px solid #333",
        fontSize: "12px",
        color: "#888",
    },

    /* MODAL */
    modalOverlay: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        background: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(5px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 999,
        padding: "15px"
    },

    modalBox: {
        width: "100%",
        maxWidth: "380px",
    }
};