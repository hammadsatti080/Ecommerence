

import React, { useState, useEffect, useCallback } from "react";


export default function UserOrders() {
  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  const userEmail = loggedInUser?.email || "";

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchOrders = useCallback(async () => {
    if (!userEmail) return;

    setLoading(true);
    setError("");
    try {
      const res = await fetch(`https://ecommerence-backend-jade.vercel.app/api/orders?email=${userEmail}`);
      if (!res.ok) throw new Error("Failed to fetch orders");
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [userEmail]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return (
    <div style={{ maxWidth: "900px", margin: "auto", padding: "20px" }}>
      <h2
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",  // allow wrapping on small screens
          marginBottom: "20px",
        }}
      >
        <span style={{ fontSize: "1.5rem", fontWeight: "bold" }}>Your Orders</span>
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
            marginTop: "8px",       // spacing if it wraps on mobile
            flexShrink: 0,          // prevent shrinking
          }}
        >
          Go Back
        </button>
      </h2>

      {loading && <p>Loading orders...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {orders.length === 0 && !loading && <p>No orders placed yet.</p>}

      {/* Web Table */}
      <div className="orders-table">
        <div className="table-scroll">
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f0f0f0" }}>
                <th style={thStyle}>Name</th>
                <th style={thStyle}>Items</th>
                <th style={thStyle}>Total</th>
                <th style={thStyle}>Status</th>
                <th style={thStyle}>Delivery Time</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o._id}>
                  <td style={tdStyle}>{o.user.name}</td>
                  <td style={tdStyle}>
                    {o.items.map((item) => (
                      <div key={item.productId}>
                        {item.name} x {item.qty}
                      </div>
                    ))}
                  </td>
                  <td style={tdStyle}>{o.totalPrice.toFixed(2)}</td>
                  <td style={tdStyle}>{o.status}</td>
                  <td style={tdStyle}>{o.deliveryTime || "Not set"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="orders-cards">
        {orders.map((o) => (
          <div
            key={o._id}
            className="order-card"
          >
            <p><b>Name:</b> {o.user.name}</p>
            <p>
              <b>Items:</b>
              {o.items.map((item) => (
                <div key={item.productId}>
                  {item.name} x {item.qty}
                </div>
              ))}
            </p>
            <p><b>Total:</b> ${o.totalPrice.toFixed(2)}</p>
            <p><b>Status:</b> {o.status}</p>
            <p><b>Delivery Time:</b> {o.deliveryTime || "Not set"}</p>
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

          .order-card {
            border: 1px solid #ccc;
            border-radius: 8px;
            padding: 15px;
            background: #fff;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
          }

          /* Desktop: show table, hide cards */
          @media (min-width: 768px) {
            .orders-table { display: block; }
            .orders-cards { display: none; }
          }

          /* Mobile: show cards, hide table */
          @media (max-width: 767px) {
            .orders-table { display: none; }
            .orders-cards { display: flex; flex-direction: column; gap: 15px; }
          }
        `}
      </style>
    </div>
  );
}

const thStyle = { border: "1px solid #ccc", padding: "8px", textAlign: "left" };
const tdStyle = { border: "1px solid #ccc", padding: "8px" };