import React, { useEffect, useRef } from "react";

export default function Review() {
  const scrollRef = useRef(null);

  const reviews = [
    { name: "Ali Khan", rating: 5, date: "2 days ago", text: "Amazing product quality!", verified: true },
    { name: "Sara Ahmed", rating: 4.5, date: "1 week ago", text: "Very good experience.", verified: true },
    { name: "John Doe", rating: 5, date: "2 weeks ago", text: "Best purchase ever!", verified: false },
    { name: "Usman Ali", rating: 5, date: "3 days ago", text: "Premium quality product.", verified: true },
    { name: "Ayesha Malik", rating: 4, date: "5 days ago", text: "Good but delivery slow.", verified: true },
    { name: "Michael Scott", rating: 5, date: "1 month ago", text: "Absolutely perfect!", verified: true },
  ];

  const renderStars = (rating) => {
    const full = Math.floor(rating);
    const half = rating % 1 !== 0;
    return "★".repeat(full) + (half ? "½" : "") + "☆".repeat(5 - Math.ceil(rating));
  };

  // ================= AUTO SCROLL LOGIC =================
  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const maxScroll =
          scrollRef.current.scrollWidth - scrollRef.current.clientWidth;

        if (scrollRef.current.scrollLeft >= maxScroll) {
          scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
        }
      }
    }, 1000); // speed control (2.5 sec)

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={styles.wrapper}>

      {/* HEADER */}
      <h2 style={styles.title}>⭐ Customer Reviews</h2>
      <p style={styles.subtitle}>Auto-scrolling trusted feedback</p>

      {/* SCROLLER */}
      <div ref={scrollRef} style={styles.scrollRow}>

        {reviews.map((r, i) => (
          <div key={i} style={styles.card}>

            <div style={styles.top}>
              <div style={styles.avatar}>{r.name.charAt(0)}</div>
              <div>
                <h4 style={{ margin: 0 }}>{r.name}</h4>
                <p style={styles.date}>{r.date}</p>
              </div>
            </div>

            <div style={styles.rating}>
              <span style={{ color: "#f59e0b" }}>
                {renderStars(r.rating)}
              </span>
              <span>{r.rating}/5</span>
            </div>

            <p style={styles.text}>{r.text}</p>

            {r.verified && (
              <span style={styles.badge}>✔ Verified</span>
            )}

          </div>
        ))}

      </div>
    </div>
  );
}

/* ================= STYLES ================= */
const styles = {

  wrapper: {
    padding: "20px",
    background: "#f6f7fb",
  },

  title: {
    textAlign: "center",
    marginBottom: "5px",
  },

  subtitle: {
    textAlign: "center",
    color: "#666",
    marginBottom: "20px",
  },

  scrollRow: {
    display: "flex",
    gap: "15px",
    overflowX: "auto",
    scrollBehavior: "smooth",
    paddingBottom: "10px",
  },

  card: {
    minWidth: "280px",
    maxWidth: "280px",
    background: "#fff",
    padding: "15px",
    borderRadius: "14px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    flexShrink: 0,
  },

  top: {
    display: "flex",
    gap: "10px",
    marginBottom: "10px",
  },

  avatar: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    background: "#2563eb",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
  },

  date: {
    fontSize: "12px",
    color: "#888",
    margin: 0,
  },

  rating: {
    display: "flex",
    gap: "8px",
    marginBottom: "8px",
    alignItems: "center",
  },

  text: {
    fontSize: "14px",
    color: "#333",
    marginBottom: "10px",
  },

  badge: {
    fontSize: "12px",
    color: "green",
    fontWeight: "600",
  },
};