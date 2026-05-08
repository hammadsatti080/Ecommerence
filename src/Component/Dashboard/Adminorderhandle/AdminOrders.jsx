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