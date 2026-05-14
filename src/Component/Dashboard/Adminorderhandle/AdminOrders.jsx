/*
import React, { useEffect, useState, useCallback } from "react";

export default function AdminOrders() {
    const [orders, setOrders] = useState([]);
    const [filterStatus, setFilterStatus] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchOrders = useCallback(async () => {
        setLoading(true);
        setError("");
        try {
            const url = filterStatus
                ? `http://localhost:5000/api/orders?status=${filterStatus}`
                : "http://localhost:5000/api/orders";
            const res = await fetch(url);
            if (!res.ok) throw new Error("Failed to fetch orders");
            const data = await res.json();
            setOrders(data);
        } catch (err) {
            console.error(err);
            setError(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    }, [filterStatus]);

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    const changeStatus = async (id, status) => {
        try {
            await fetch(`http://localhost:5000/api/orders/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status }),
            });
            fetchOrders();
        } catch (err) {
            console.error(err);
            alert(err.message || "Could not update status");
        }
    };

    const changeDeliveryTime = async (id, deliveryTime) => {
        try {
            await fetch(`http://localhost:5000/api/orders/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ deliveryTime }),
            });
            fetchOrders();
        } catch (err) {
            console.error(err);
            alert(err.message || "Could not update delivery time");
        }
    };

    return (
        <div style={{ padding: "20px", maxWidth: "1000px", margin: "auto" }}>
            <h2>Orders Management</h2>

            <div style={{ marginBottom: "15px" }}>
                <label>
                    Filter by Status:{" "}
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                    >
                        <option value="">All</option>
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </label>
            </div>

            {loading && <p>Loading orders...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            <table
                style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    marginTop: "15px",
                }}
            >
                <thead>
                    <tr style={{ background: "#f0f0f0" }}>
                        <th style={{ border: "1px solid #ccc", padding: "8px" }}>User</th>
                        <th style={{ border: "1px solid #ccc", padding: "8px" }}>Email</th>
                        <th style={{ border: "1px solid #ccc", padding: "8px" }}>Total</th>
                        <th style={{ border: "1px solid #ccc", padding: "8px" }}>Status</th>
                        <th style={{ border: "1px solid #ccc", padding: "8px" }}>Delivery Time</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.length === 0 && !loading && (
                        <tr>
                            <td colSpan="5" style={{ textAlign: "center", padding: "10px" }}>
                                No orders found.
                            </td>
                        </tr>
                    )}
                    {orders.map((o) => (
                        <tr key={o._id}>
                            <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                                {o.user?.name || "Unknown"}
                            </td>
                            <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                                {o.user?.email || "N/A"}
                            </td>
                            <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                                ${o.totalPrice.toFixed(2)}
                            </td>
                            <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                                <select
                                    value={o.status}
                                    onChange={(e) => changeStatus(o._id, e.target.value)}
                                >
                                    <option value="pending">Pending</option>
                                    <option value="completed">Completed</option>
                                    <option value="cancelled">Cancelled</option>
                                </select>
                            </td>
                            <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                                <select
                                    value={o.deliveryTime || ""}
                                    onChange={(e) => changeDeliveryTime(o._id, e.target.value)}
                                >
                                    <option value="">Select Time</option>
                                    <option value="1-2 days">1-2 days</option>
                                    <option value="1 week">1 week</option>
                                    <option value="1 month">1 month</option>
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
*/

import React, { useEffect, useState, useCallback } from "react";

export default function AdminOrders() {
    const [orders, setOrders] = useState([]);
    const [filterStatus, setFilterStatus] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [emailFilter, setEmailFilter] = useState("");
    const fetchOrders = useCallback(async () => {
        setLoading(true);
        setError("");
        try {
            const url = filterStatus
                ? `https://ecommerence-backend-jade.vercel.app/api/orders?status=${filterStatus}`
                : "https://ecommerence-backend-jade.vercel.app/api/orders";

            const res = await fetch(url);
            if (!res.ok) throw new Error("Failed to fetch orders");

            const data = await res.json();
            setOrders(data);
        } catch (err) {
            console.error(err);
            setError(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    }, [filterStatus]);

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    const changeStatus = async (id, status) => {
        try {
            await fetch(`https://ecommerence-backend-jade.vercel.app/api/orders/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status }),
            });
            fetchOrders();
        } catch (err) {
            console.error(err);
            alert(err.message || "Could not update status");
        }
    };

    const changeDeliveryTime = async (id, deliveryTime) => {
        try {
            await fetch(`https://ecommerence-backend-jade.vercel.app/api/orders/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ deliveryTime }),
            });
            fetchOrders();
        } catch (err) {
            console.error(err);
            alert(err.message || "Could not update delivery time");
        }
    };

    return (
        <div style={styles.container}>

            <style>
                {`
                tr:hover {
                    background: #f5f7ff;
                    transition: 0.2s;
                }
                `}
            </style>

            <h2 style={styles.title}>📦 Orders Management</h2>

            {/* Filter */}
            <div style={styles.filterBox}>
                <label style={{ fontWeight: "600" }}>
                    Filter Status:
                </label>
                <input
                    type="text"
                    placeholder="Enter email..."
                    value={emailFilter}
                    onChange={(e) => setEmailFilter(e.target.value)}
                    style={styles.input}

                />
                <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    style={styles.filter}
                >
                    <option value="">All</option>
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                </select>
            </div>

            {loading && <p>Loading orders...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            <div style={styles.tableWrapper}>
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.th}>User</th>
                            <th style={styles.th}>Email</th>
                            <th style={styles.th}>Total</th>
                            <th style={styles.th}>Status</th>
                            <th style={styles.th}>Delivery Time</th>
                        </tr>
                    </thead>

                    <tbody>
                        {orders.length === 0 && !loading ? (
                            <tr>
                                <td
                                    colSpan="5"
                                    style={styles.empty}
                                >
                                    No orders found.
                                </td>
                            </tr>
                        ) : (
                            orders
                                .filter((o) =>
                                    emailFilter
                                        ? (o.user?.email || "")
                                            .toLowerCase()
                                            .includes(emailFilter.toLowerCase())
                                        : true
                                )
                                .map((o) => (
                                    <tr key={o._id}>
                                        <td style={styles.td}>
                                            {o.user?.name || "Unknown"}
                                        </td>

                                        <td style={styles.td}>
                                            {o.user?.email || "N/A"}
                                        </td>

                                        <td style={styles.td}>
                                            ${o.totalPrice.toFixed(2)}
                                        </td>

                                        <td style={styles.td}>
                                            <select
                                                value={o.status}
                                                onChange={(e) =>
                                                    changeStatus(
                                                        o._id,
                                                        e.target.value
                                                    )
                                                }
                                                style={styles.select}
                                            >
                                                <option value="pending">Pending</option>
                                                <option value="completed">Completed</option>
                                                  <option value="delivered">Delivered</option>
                                                <option value="cancelled">Cancelled</option>
                                            </select>
                                        </td>

                                        <td style={styles.td}>
                                            <select
                                                value={o.deliveryTime || ""}
                                                onChange={(e) =>
                                                    changeDeliveryTime(
                                                        o._id,
                                                        e.target.value
                                                    )
                                                }
                                                style={styles.select}
                                            >
                                                <option value="">Select</option>
                                                <option value="1-2 days">1-2 days</option>
                                                <option value="1 week">1 week</option>
                                                <option value="1 month">1 month</option>
                                            </select>
                                        </td>
                                    </tr>
                                ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

const styles = {
    container: {
        padding: "20px",
        maxWidth: "1000px",
        margin: "auto",
    },
    tableWrapper: {
        maxHeight: "450px",
        overflowY: "auto",
        borderRadius: "10px",
    },
    input: {
        padding: "8px 12px",
        borderRadius: "8px",
        border: "1px solid #ccc",
        width: "250px",
        outline: "none",
    },
    title: {
        fontSize: "24px",
        fontWeight: "700",
        marginBottom: "15px",
    },

    filterBox: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
        marginBottom: "15px",
    },

    filter: {
        padding: "8px 12px",
        borderRadius: "8px",
        border: "1px solid #ccc",
        background: "#fff",
        cursor: "pointer",
    },

    table: {
        width: "100%",
        borderCollapse: "collapse",
        background: "#fff",
        borderRadius: "10px",
        overflow: "hidden",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    },

    th: {
        padding: "12px",
        background: "#2563eb",
        color: "#fff",
        textAlign: "left",
        fontWeight: "600",
    },

    td: {
        padding: "12px",
        borderBottom: "1px solid #eee",
        fontSize: "14px",
    },

    select: {
        padding: "6px 10px",
        borderRadius: "8px",
        border: "1px solid #ccc",
        background: "#f9fafb",
        cursor: "pointer",
        outline: "none",
    },

    empty: {
        textAlign: "center",
        padding: "15px",
        color: "gray",
    },
};