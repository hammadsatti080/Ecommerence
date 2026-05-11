/*
import React, { useEffect, useState } from "react";

export default function Adminrating() {
    const [reviews, setReviews] = useState([]);
    const [filteredReviews, setFilteredReviews] = useState([]);
    const [search, setSearch] = useState("");
    const [toast, setToast] = useState("");
 
    useEffect(() => {
        fetch("http://localhost:5000/api/contact")
            .then((res) => res.json())
            .then((data) => {
                setReviews(data);
                setFilteredReviews(data);
            })
            .catch((err) => console.log(err));
    }, []);

    
    const handleFilter = (e) => {
        const value = e.target.value;
        setSearch(value);

        const filtered = reviews.filter((item) =>
            (item.name || "")
                .toLowerCase()
                .includes(value.toLowerCase()) ||

            (item.email || "")
                .toLowerCase()
                .includes(value.toLowerCase()) ||

            (item.message || "")
                .toLowerCase()
                .includes(value.toLowerCase())
        );

        setFilteredReviews(filtered);
    };

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm("Are you sure?");

        if (!confirmDelete) return;

        try {

            const res = await fetch(
                `http://localhost:5000/api/contact/${id}`,
                {
                    method: "DELETE",
                }
            );

            const data = await res.json();

            if (res.ok) {

             
                setReviews(reviews.filter(r => r._id !== id));
                setFilteredReviews(filteredReviews.filter(r => r._id !== id));

                setToast("🗑️ Review deleted successfully");
                setTimeout(() => setToast(""), 3000);
            } else {
                setToast("❌ " + data.error);
                setTimeout(() => setToast(""), 3000);
            }

        } catch (error) {
            console.log(error);
            alert("Delete failed");
        }
    };

    return (
        <div style={styles.container}>
            <style>
                {`
    ::-webkit-scrollbar {
        width: 8px;
    }

    ::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 10px;
    }

    ::-webkit-scrollbar-thumb {
        background:  #fffcfc;
        border-radius: 10px;
    }

    ::-webkit-scrollbar-thumb:hover {
        background:  #f519c5;
    }
`}
            </style>
            <h2 style={styles.heading}>⭐ Customer Reviews</h2>

           
            <input
                type="text"
                placeholder="Search by name, email or message..."
                value={search}
                onChange={handleFilter}
                style={styles.search}
            />
            {toast && (
                <div style={styles.toast}>
                    {toast}
                </div>
            )}

          
            <div style={styles.cardWrapper}>
                {filteredReviews.length > 0 ? (
                    filteredReviews.map((review) => (
                        <div key={review._id} style={styles.card}>
                            <h3>{review.name}</h3>

                            <p style={styles.email}>
                                📧 {review.email}
                            </p>

                            <p style={styles.message}>
                                {review.message}
                            </p>

                            <div style={styles.rating}>
                                {"⭐".repeat(review.rating)}
                            </div>

                            <p style={styles.date}>
                                {new Date(
                                    review.createdAt
                                ).toLocaleString()}
                            </p>
                            <button
                                onClick={() => handleDelete(review._id)}
                                style={styles.deleteBtn}
                            >
                                Delete
                            </button>
                        </div>
                    ))
                ) : (
                    <p>No Reviews Found</p>
                )}
            </div>

        </div>
    );
}

const styles = {
    container: {
        padding: "20px",
        maxWidth: "1200px",
        margin: "auto",
    },

    heading: {
        textAlign: "center",
        marginBottom: "20px",
    },

    search: {
        width: "100%",
        padding: "12px",
        marginBottom: "25px",
        borderRadius: "10px",
        border: "1px solid #ccc",
        fontSize: "16px",
    },

    cardWrapper: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
        gap: "20px",
        maxHeight: "500px", 
        overflowY: "auto",

        paddingRight: "10px",
        alignItems: "start",

        scrollBehavior: "smooth",
    },

    card: {
        background: "#fff",
        padding: "20px",
        borderRadius: "14px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        border: "1px solid #eee",
    },

    email: {
        color: "#2563eb",
        fontSize: "14px",
        marginBottom: "10px",
    },

    message: {
        fontSize: "15px",
        lineHeight: "1.5",
        marginBottom: "15px",
    },

    rating: {
        fontSize: "22px",
        marginBottom: "10px",
    },
    deleteBtn: {
        marginTop: "10px",
        padding: "6px 12px",
        border: "none",
        borderRadius: "6px",
        background: "red",
        color: "#fff",
        cursor: "pointer",
        fontWeight: "600",
    },

    date: {
        fontSize: "12px",
        color: "gray",
    },
    toast: {
        position: "fixed",
        top: "20px",
        right: "20px",
        background: "#111",
        color: "#fff",
        padding: "12px 18px",
        borderRadius: "8px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
        zIndex: 9999,
        fontWeight: "500",
    },
};

*/

import React, { useEffect, useState } from "react";

export default function Adminrating() {
    const [reviews, setReviews] = useState([]);
    const [filteredReviews, setFilteredReviews] = useState([]);
    const [search, setSearch] = useState("");
    const [toast, setToast] = useState("");
 
    useEffect(() => {
        fetch("https://ecommerence-backend-ten.vercel.app/api/contact")
            .then((res) => res.json())
            .then((data) => {
                setReviews(data);
                setFilteredReviews(data);
            })
            .catch((err) => console.log(err));
    }, []);

    
    const handleFilter = (e) => {
        const value = e.target.value;
        setSearch(value);

        const filtered = reviews.filter((item) =>
            (item.name || "")
                .toLowerCase()
                .includes(value.toLowerCase()) ||

            (item.email || "")
                .toLowerCase()
                .includes(value.toLowerCase()) ||

            (item.message || "")
                .toLowerCase()
                .includes(value.toLowerCase())
        );

        setFilteredReviews(filtered);
    };

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm("Are you sure?");

        if (!confirmDelete) return;

        try {

            const res = await fetch(
                `http://localhost:5000/api/contact/${id}`,
                {
                    method: "DELETE",
                }
            );

            const data = await res.json();

            if (res.ok) {

             
                setReviews(reviews.filter(r => r._id !== id));
                setFilteredReviews(filteredReviews.filter(r => r._id !== id));

                setToast("🗑️ Review deleted successfully");
                setTimeout(() => setToast(""), 3000);
            } else {
                setToast("❌ " + data.error);
                setTimeout(() => setToast(""), 3000);
            }

        } catch (error) {
            console.log(error);
            alert("Delete failed");
        }
    };

    return (
        <div style={styles.container}>
            <style>
                {`
    ::-webkit-scrollbar {
        width: 8px;
    }

    ::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 10px;
    }

    ::-webkit-scrollbar-thumb {
        background:  #fffcfc;
        border-radius: 10px;
    }

    ::-webkit-scrollbar-thumb:hover {
        background:  #f519c5;
    }
`}
            </style>
            <h2 style={styles.heading}>⭐ Customer Reviews</h2>

           
            <input
                type="text"
                placeholder="Search by name, email or message..."
                value={search}
                onChange={handleFilter}
                style={styles.search}
            />
            {toast && (
                <div style={styles.toast}>
                    {toast}
                </div>
            )}

          
            <div style={styles.cardWrapper}>
                {filteredReviews.length > 0 ? (
                    filteredReviews.map((review) => (
                        <div key={review._id} style={styles.card}>
                            <h3>{review.name}</h3>

                            <p style={styles.email}>
                                📧 {review.email}
                            </p>

                            <p style={styles.message}>
                                {review.message}
                            </p>

                            <div style={styles.rating}>
                                {"⭐".repeat(review.rating)}
                            </div>

                            <p style={styles.date}>
                                {new Date(
                                    review.createdAt
                                ).toLocaleString()}
                            </p>
                            <button
                                onClick={() => handleDelete(review._id)}
                                style={styles.deleteBtn}
                            >
                                Delete
                            </button>
                        </div>
                    ))
                ) : (
                    <p>No Reviews Found</p>
                )}
            </div>

        </div>
    );
}

const styles = {
    container: {
        padding: "20px",
        maxWidth: "1200px",
        margin: "auto",
    },

    heading: {
        textAlign: "center",
        marginBottom: "20px",
    },

    search: {
        width: "100%",
        padding: "12px",
        marginBottom: "25px",
        borderRadius: "10px",
        border: "1px solid #ccc",
        fontSize: "16px",
    },

    cardWrapper: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
        gap: "20px",
        maxHeight: "500px", 
        overflowY: "auto",

        paddingRight: "10px",
        alignItems: "start",

        scrollBehavior: "smooth",
    },

    card: {
        background: "#fff",
        padding: "20px",
        borderRadius: "14px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        border: "1px solid #eee",
    },

    email: {
        color: "#2563eb",
        fontSize: "14px",
        marginBottom: "10px",
    },

    message: {
        fontSize: "15px",
        lineHeight: "1.5",
        marginBottom: "15px",
    },

    rating: {
        fontSize: "22px",
        marginBottom: "10px",
    },
    deleteBtn: {
        marginTop: "10px",
        padding: "6px 12px",
        border: "none",
        borderRadius: "6px",
        background: "red",
        color: "#fff",
        cursor: "pointer",
        fontWeight: "600",
    },

    date: {
        fontSize: "12px",
        color: "gray",
    },
    toast: {
        position: "fixed",
        top: "20px",
        right: "20px",
        background: "#111",
        color: "#fff",
        padding: "12px 18px",
        borderRadius: "8px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
        zIndex: 9999,
        fontWeight: "500",
    },
};