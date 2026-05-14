import React, { useEffect, useState, useCallback } from "react";

export default function Saved() {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    const userEmail = loggedInUser?.email || "";

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // ================= FETCH SAVED =================
    const fetchSaved = useCallback(async () => {
        if (!userEmail) return;

        setLoading(true);
        setError("");

        try {
            const res = await fetch(
                `https://ecommerence-backend-jade.vercel.app/api/saved?email=${userEmail}`
            );

            if (!res.ok) throw new Error("Failed to fetch saved products");

            const data = await res.json();
            setItems(data);
        } catch (err) {
            setError(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    }, [userEmail]);

    useEffect(() => {
        fetchSaved();
    }, [fetchSaved]);

    // ================= DELETE =================
    const handleDelete = async (id) => {
        try {
            const res = await fetch(
                `https://ecommerence-backend-jade.vercel.app/api/saved/${id}`,
                { method: "DELETE" }
            );

            if (!res.ok) throw new Error("Delete failed");

            setItems((prev) => prev.filter((i) => i._id !== id));
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <div style={styles.page}>

            {/* HEADER */}
            <div style={styles.header}>
                <h2>❤️ My Saved Products</h2>

                <button onClick={() => window.history.back()} style={styles.backBtn}>
                    Go Back
                </button>
            </div>

            {/* STATES */}
            {loading && <p>Loading saved products...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {!loading && items.length === 0 && (
                <p style={styles.empty}>No saved products found</p>
            )}

            {/* TABLE VIEW */}
            <div className="tableWrap">
                <table style={styles.table}>
                    <thead>
                        <tr style={styles.theadRow}>
                            <th style={styles.th}>Product</th>
                            <th style={styles.th}>Image</th>
                            <th style={styles.th}>Price</th>
                            <th style={styles.th}>Saved Date</th>
                            <th style={styles.th}>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {items.map((i) => (
                            <tr key={i._id}>
                                <td style={styles.td}>{i.product.name}</td>

                                <td style={styles.td}>
                                    <img
                                        src={i.product.image}
                                        alt={i.product.name}
                                        style={styles.img}
                                    />
                                </td>

                                <td style={styles.td}>Rs {i.product.price}</td>

                                {/* ✅ SAFE DATE FROM BACKEND */}
                                <td style={styles.td}>
                                    {i.createdAt
                                        ? new Date(i.createdAt).toLocaleString()
                                        : "N/A"}
                                </td>

                                <td style={styles.td}>
                                    <button
                                        onClick={() => handleDelete(i._id)}
                                        style={styles.deleteBtn}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* MOBILE CARDS */}
            <div className="mobile">
                {items.map((i) => (
                    <div key={i._id} style={styles.card}>
                        <img src={i.product.image} alt="" style={styles.cardImg} />

                        <div>
                            <p><b>{i.product.name}</b></p>
                            <p>Rs {i.product.price}</p>

                            <p style={{ fontSize: "12px", color: "#666" }}>
                                {i.createdAt
                                    ? new Date(i.createdAt).toLocaleString()
                                    : "N/A"}
                            </p>

                            <button
                                onClick={() => handleDelete(i._id)}
                                style={styles.deleteBtn}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* CSS */}
            <style>{`
        .tableWrap {
          max-height: 420px;
          overflow-y: auto;
          border: 1px solid #ddd;
          border-radius: 8px;
        }

        .mobile {
          display: none;
        }

        @media (max-width: 768px) {
          .tableWrap {
            display: none;
          }
          .mobile {
            display: flex;
            flex-direction: column;
            gap: 12px;
          }
        }
      `}</style>

        </div>
    );
}
const styles = {
    page: {
        maxWidth: "900px",
        margin: "auto",
        padding: "20px",
        fontFamily: "Arial",
    },

    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "20px",
    },

    backBtn: {
        padding: "8px 12px",
        background: "#007bff",
        color: "#fff",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
    },

    empty: {
        textAlign: "center",
        color: "#777",
    },

    table: {
        width: "100%",
        borderCollapse: "collapse",
    },

    theadRow: {
        background: "#f3f3f3",
    },

    th: {
        padding: "10px",
        border: "1px solid #ddd",
        textAlign: "left",
    },

    td: {
        padding: "10px",
        border: "1px solid #ddd",
    },

    img: {
        width: "60px",
        height: "60px",
        objectFit: "cover",
        borderRadius: "6px",
    },

    deleteBtn: {
        background: "red",
        color: "white",
        border: "none",
        padding: "6px 10px",
        borderRadius: "6px",
        cursor: "pointer",
    },

    card: {
        display: "flex",
        gap: "10px",
        padding: "10px",
        border: "1px solid #ddd",
        borderRadius: "10px",
    },

    cardImg: {
        width: "70px",
        height: "70px",
        objectFit: "cover",
        borderRadius: "8px",
    },
};