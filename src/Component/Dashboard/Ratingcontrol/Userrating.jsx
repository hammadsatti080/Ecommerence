import React, { useEffect, useState, useCallback } from "react";

export default function MyReviews() {

    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    const userEmail = loggedInUser?.email || "";

    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchReviews = useCallback(async () => {

        if (!userEmail) return;

        setLoading(true);
        setError("");

        try {

            const res = await fetch(
                `https://ecommerence-backend-jade.vercel.app/api/contact/${userEmail}`
            );

            if (!res.ok) throw new Error("Failed to fetch reviews");

            const data = await res.json();

            setReviews(data);

        } catch (err) {

            console.error(err);

            setError(err.message || "Something went wrong");

        } finally {
            setLoading(false);
        }

    }, [userEmail]);

    useEffect(() => {
        fetchReviews();
    }, [fetchReviews]);

    return (
        <div style={{ maxWidth: "900px", margin: "auto", padding: "20px" }}>

            <h2
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    marginBottom: "20px",
                }}
            >
                <span style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                    My Reviews
                </span>

                <button
                    onClick={() => window.history.back()}
                    style={{
                        padding: "8px 16px",
                        color: "#fff",
                        backgroundColor: "#007bff",
                        border: "none",
                        fontSize: "15px",
                        borderRadius: "4px",
                        cursor: "pointer",
                        marginTop: "8px",
                    }}
                >
                    Go Back
                </button>
            </h2>

            {loading && <p>Loading reviews...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {reviews.length === 0 && !loading && (
                <p>No reviews found</p>
            )}

            {/* TABLE VIEW */}
            <div className="reviews-table">
                <div className="table-scroll">
                    <table
                        style={{
                            width: "100%",
                            borderCollapse: "collapse",
                        }}
                    >
                        <thead>
                            <tr style={{ background: "#f0f0f0" }}>
                                <th style={thStyle}>Name</th>
                                <th style={thStyle}>Email</th>
                                <th style={thStyle}>Message</th>
                                <th style={thStyle}>Rating</th>
                                <th style={thStyle}>Date</th>
                            </tr>
                        </thead>

                        <tbody>
                            {reviews.map((r) => (
                                <tr key={r._id}>
                                    <td style={tdStyle}>{r.name}</td>
                                    <td style={tdStyle}>{r.email}</td>
                                    <td style={tdStyle}>{r.message}</td>
                                    <td style={tdStyle}>
                                        {"⭐".repeat(r.rating)}
                                    </td>
                                    <td style={tdStyle}>
                                        {new Date(
                                            r.createdAt
                                        ).toLocaleString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* MOBILE CARDS */}
            <div className="reviews-cards">
                {reviews.map((r) => (
                    <div key={r._id} className="review-card">
                        <p><b>Name:</b> {r.name}</p>
                        <p><b>Email:</b> {r.email}</p>
                        <p><b>Message:</b> {r.message}</p>
                        <p><b>Rating:</b> {"⭐".repeat(r.rating)}</p>
                        <p>
                            <b>Date:</b>{" "}
                            {new Date(r.createdAt).toLocaleString()}
                        </p>
                    </div>
                ))}
            </div>

            {/* CSS */}
            <style>
                {`
                .table-scroll {
                    max-height: 400px;
                    overflow-y: auto;
                    border: 1px solid #ccc;
                    border-radius: 8px;
                }

                .review-card {
                    border: 1px solid #ccc;
                    border-radius: 8px;
                    padding: 15px;
                    background: #fff;
                    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
                }

                @media (min-width: 768px) {
                    .reviews-table { display: block; }
                    .reviews-cards { display: none; }
                }

                @media (max-width: 767px) {
                    .reviews-table { display: none; }
                    .reviews-cards {
                        display: flex;
                        flex-direction: column;
                        gap: 15px;
                    }
                }
                `}
            </style>

        </div>
    );
}

const thStyle = {
    border: "1px solid #ccc",
    padding: "8px",
    textAlign: "left",
};

const tdStyle = {
    border: "1px solid #ccc",
    padding: "8px",
};