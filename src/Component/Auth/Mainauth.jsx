/*
import { useState, useEffect } from "react";

const ADMIN_ROUTE = "/Login";

export default function Mainauth() {
    const [hovered, setHovered] = useState(null);

    const handleUser = () => { window.location.href = "/userlogin"; };
    const handleAdmin = () => { window.location.href = ADMIN_ROUTE; };

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, []);
    return (
        <div style={styles.root}>
            <div style={styles.bgCircle1} />
            <div style={styles.bgCircle2} />
            <div style={styles.container}>
                <div style={styles.header}>
                    <div style={styles.logoMark}>⬡</div>
                    <h1 style={styles.title}>Welcome</h1>
                    <p style={styles.subtitle}>Select how you want to continue</p>
                </div>
                <div style={styles.cards}>
                    <button
                        style={{ ...styles.card, ...(hovered === "user" ? styles.cardHovered : {}) }}
                        onMouseEnter={() => setHovered("user")}
                        onMouseLeave={() => setHovered(null)}
                        onClick={handleUser}
                    >
                        <div style={{ ...styles.cardIcon, background: "rgba(99,179,237,0.15)" }}>
                            <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
                                <circle cx="12" cy="8" r="4" stroke="#63B3ED" strokeWidth="2" />
                                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="#63B3ED" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                        </div>
                        <h2 style={styles.cardTitle}>User Mode</h2>
                        <p style={styles.cardDesc}>Access your dashboard, manage your profile, and explore features built for you.</p>
                        <div style={{ ...styles.cardArrow, color: "#63B3ED" }}>Continue as User →</div>
                    </button>

                    <div style={styles.divider}><span style={styles.dividerText}>or</span></div>

                    <button
                        style={{ ...styles.card, ...(hovered === "admin" ? styles.cardHoveredAdmin : {}) }}
                        onMouseEnter={() => setHovered("admin")}
                        onMouseLeave={() => setHovered(null)}
                        onClick={handleAdmin}
                    >
                        <div style={{ ...styles.cardIcon, background: "rgba(246,173,85,0.15)" }}>
                            <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
                                <rect x="3" y="11" width="18" height="11" rx="2" stroke="#F6AD55" strokeWidth="2" />
                                <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="#F6AD55" strokeWidth="2" strokeLinecap="round" />
                                <circle cx="12" cy="16" r="1.5" fill="#F6AD55" />
                            </svg>
                        </div>
                        <h2 style={{ ...styles.cardTitle, color: "#F6AD55" }}>Admin Mode</h2>
                        <p style={styles.cardDesc}>Access system controls, manage users, and oversee platform operations.</p>
                        <div style={{ ...styles.cardArrow, color: "#F6AD55" }}>Continue as Admin →</div>
                    </button>
                </div>
                <p style={styles.footer}>Protected by end-to-end encryption · All rights reserved</p>
            </div>
        </div>
    );
}

const styles = {
    root: { minHeight: "100vh", background: "white", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Segoe UI', sans-serif", position: "relative", overflow: "hidden" },
    bgCircle1: { position: "absolute", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,179,237,0.07) 0%, transparent 70%)", top: -100, left: -100, pointerEvents: "none" },
    bgCircle2: { position: "absolute", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(246,173,85,0.07) 0%, transparent 70%)", bottom: -80, right: -80, pointerEvents: "none" },
    container: { zIndex: 1, width: "100%", maxWidth: 860, padding: "0 24px", display: "flex", flexDirection: "column", alignItems: "center", gap: 40 },
    header: { textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 10 },
    logoMark: { fontSize: 40, color: "#63B3ED", marginBottom: 4 },
    title: { fontSize: 42, fontWeight: 700, color: "0D1117", margin: 0, letterSpacing: "-1px" },
    subtitle: { color: "#718096", fontSize: 16, margin: 0 },
    cards: { display: "flex", flexDirection: "row", gap: 0, alignItems: "stretch", width: "100%", flexWrap: "wrap", justifyContent: "center" },
    card: { flex: 1, minWidth: 280, maxWidth: 360, background: "#161B22", border: "1px solid #21262D", borderRadius: 20, padding: "36px 32px", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 14, transition: "transform 0.2s, border-color 0.2s, box-shadow 0.2s", textAlign: "left", margin: "0 10px" },
    cardHovered: { transform: "translateY(-6px)", borderColor: "#63B3ED", boxShadow: "0 12px 40px rgba(99,179,237,0.15)" },
    cardHoveredAdmin: { transform: "translateY(-6px)", borderColor: "#F6AD55", boxShadow: "0 12px 40px rgba(246,173,85,0.15)" },
    cardIcon: { width: 64, height: 64, borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center" },
    cardTitle: { fontSize: 22, fontWeight: 700, color: "#63B3ED", margin: 0 },
    cardDesc: { fontSize: 14, color: "#718096", margin: 0, lineHeight: 1.6 },
    cardArrow: { fontSize: 14, fontWeight: 600, marginTop: 8 },
    divider: { display: "flex", alignItems: "center", justifyContent: "center", width: 40, flexShrink: 0, alignSelf: "center" },
    dividerText: { color: "#4A5568", fontSize: 13, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 },
    footer: { color: "#4A5568", fontSize: 12, textAlign: "center" },
};
*/

import { useState, useEffect } from "react";

const ADMIN_ROUTE = "/Login";

export default function Mainauth() {
  const [hovered, setHovered] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  const handleUser = () => {
    window.location.href = "/userlogin";
  };

  const handleAdmin = () => {
    window.location.href = ADMIN_ROUTE;
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    const checkScreen = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  return (
    <div style={styles.root}>
      <div style={styles.bgCircle1} />
      <div style={styles.bgCircle2} />

      <div style={styles.container}>
        <div style={styles.header}>
          <div style={styles.logoMark}>⬡</div>
          <h1 style={styles.title}>Welcome</h1>
          <p style={styles.subtitle}>Select how you want to continue</p>
        </div>

        {/* CARDS */}
        <div
          style={{
            ...styles.cards,
            flexDirection: isMobile ? "column" : "row",
            alignItems: isMobile ? "center" : "stretch"
          }}
        >
          {/* USER CARD */}
          <button
            style={{
              ...styles.card,
              ...(hovered === "user" ? styles.cardHovered : {}),
              margin: isMobile ? "10px 0" : "0 10px"
            }}
            onMouseEnter={() => setHovered("user")}
            onMouseLeave={() => setHovered(null)}
            onClick={handleUser}
          >
            <div
              style={{
                ...styles.cardIcon,
                background: "rgba(99,179,237,0.15)"
              }}
            >
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
                <circle
                  cx="12"
                  cy="8"
                  r="4"
                  stroke="#63B3ED"
                  strokeWidth="2"
                />
                <path
                  d="M4 20c0-4 3.6-7 8-7s8 3 8 7"
                  stroke="#63B3ED"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <h2 style={styles.cardTitle}>User Mode</h2>
            <p style={styles.cardDesc}>
              Access your dashboard, manage your profile, and explore features.
            </p>
            <div style={{ ...styles.cardArrow, color: "#63B3ED" }}>
              Continue as User →
            </div>
          </button>

          {/* DIVIDER (hide on mobile) */}
          {!isMobile && (
            <div style={styles.divider}>
              <span style={styles.dividerText}>or</span>
            </div>
          )}

          {/* ADMIN CARD */}
          <button
            style={{
              ...styles.card,
              ...(hovered === "admin" ? styles.cardHoveredAdmin : {}),
              margin: isMobile ? "10px 0" : "0 10px"
            }}
            onMouseEnter={() => setHovered("admin")}
            onMouseLeave={() => setHovered(null)}
            onClick={handleAdmin}
          >
            <div
              style={{
                ...styles.cardIcon,
                background: "rgba(246,173,85,0.15)"
              }}
            >
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
                <rect
                  x="3"
                  y="11"
                  width="18"
                  height="11"
                  rx="2"
                  stroke="#F6AD55"
                  strokeWidth="2"
                />
                <path
                  d="M7 11V7a5 5 0 0 1 10 0v4"
                  stroke="#F6AD55"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <circle cx="12" cy="16" r="1.5" fill="#F6AD55" />
              </svg>
            </div>

            <h2 style={{ ...styles.cardTitle, color: "#F6AD55" }}>
              Admin Mode
            </h2>
            <p style={styles.cardDesc}>
              Access system controls, manage users, and oversee platform.
            </p>
            <div style={{ ...styles.cardArrow, color: "#F6AD55" }}>
              Continue as Admin →
            </div>
          </button>
        </div>

        <p style={styles.footer}>
          Protected by end-to-end encryption · All rights reserved
        </p>
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const styles = {
  root: {
    minHeight: "100vh",
    background: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Segoe UI', sans-serif",
    position: "relative",
    overflow: "hidden"
  },

  bgCircle1: {
    position: "absolute",
    width: 500,
    height: 500,
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(99,179,237,0.07) 0%, transparent 70%)",
    top: -100,
    left: -100,
    pointerEvents: "none"
  },

  bgCircle2: {
    position: "absolute",
    width: 400,
    height: 400,
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(246,173,85,0.07) 0%, transparent 70%)",
    bottom: -80,
    right: -80,
    pointerEvents: "none"
  },

  container: {
    zIndex: 1,
    width: "100%",
    maxWidth: 860,
    padding: "0 24px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 40
  },

  header: {
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 10
  },

  logoMark: {
    fontSize: 40,
    color: "#63B3ED"
  },

  title: {
    fontSize: 42,
    fontWeight: 700,
    margin: 0
  },

  subtitle: {
    color: "#718096",
    fontSize: 16,
    margin: 0
  },

  cards: {
    display: "flex",
    gap: 0,
    width: "100%",
    justifyContent: "center"
  },

  card: {
    flex: 1,
    minWidth: 280,
    maxWidth: 360,
    background: "#161B22",
    border: "1px solid #21262D",
    borderRadius: 20,
    padding: "36px 32px",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 14,
    transition: "0.2s",
    textAlign: "left"
  },

  cardHovered: {
    transform: "translateY(-6px)",
    borderColor: "#63B3ED",
    boxShadow: "0 12px 40px rgba(99,179,237,0.15)"
  },

  cardHoveredAdmin: {
    transform: "translateY(-6px)",
    borderColor: "#F6AD55",
    boxShadow: "0 12px 40px rgba(246,173,85,0.15)"
  },

  cardIcon: {
    width: 64,
    height: 64,
    borderRadius: 16,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },

  cardTitle: {
    fontSize: 22,
    fontWeight: 700,
    color: "#63B3ED",
    margin: 0
  },

  cardDesc: {
    fontSize: 14,
    color: "#718096",
    margin: 0,
    lineHeight: 1.6
  },

  cardArrow: {
    fontSize: 14,
    fontWeight: 600,
    marginTop: 8
  },

  divider: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 40
  },

  dividerText: {
    color: "#4A5568",
    fontSize: 13,
    fontWeight: 600
  },

  footer: {
    color: "#4A5568",
    fontSize: 12,
    textAlign: "center"
  }
};