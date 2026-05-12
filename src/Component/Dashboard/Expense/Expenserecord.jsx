import React, { useEffect, useState } from "react";
import {
    FaDollarSign,
    FaShoppingCart,
    FaBoxOpen,
    FaArrowLeft,
    FaUsers,
    FaClock,
    FaCheckCircle,
    FaTimesCircle
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Expenserecord() {

    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/orders");
            const data = await res.json();
            setOrders(data);
        } catch (err) {
            console.log(err);
        }
    };

    /* ================= CALCULATIONS ================= */
    const totalRevenue = orders.reduce(
        (t, o) => t + Number(o.totalPrice || 0),
        0
    );

    const totalProductsSold = orders.reduce(
        (t, o) => t + Number(o.quantity || 1),
        0
    );

    const totalOrders = orders.length;

    const uniqueCustomers = new Set(
        orders.map((o) => o.customerEmail || o.user?.email).filter(Boolean)
    ).size;

    /* ================= STATUS COUNTS ================= */
    const pendingOrders = orders.filter(o => o.status === "pending").length;
    const completedOrders = orders.filter(o => o.status === "completed").length;
    const cancelledOrders = orders.filter(o => o.status === "cancelled").length;

    const cards = [
        {
            title: "Total Revenue",
            value: `₨ ${totalRevenue.toFixed(2)}`,
            icon: <FaDollarSign />,
            bg: "linear-gradient(135deg,#16a34a,#22c55e)"
        },
        {
            title: "Products Sold",
            value: totalProductsSold,
            icon: <FaShoppingCart />,
            bg: "linear-gradient(135deg,#2563eb,#3b82f6)"
        },
        {
            title: "Total Orders",
            value: totalOrders,
            icon: <FaBoxOpen />,
            bg: "linear-gradient(135deg,#ea580c,#fb923c)"
        },
        {
            title: "Customers",
            value: uniqueCustomers,
            icon: <FaUsers />,
            bg: "linear-gradient(135deg,#9333ea,#c084fc)"
        },

        /* ================= STATUS CARDS ================= */
        {
            title: "Pending Orders",
            value: pendingOrders,
            icon: <FaClock />,
            bg: "linear-gradient(135deg,#f59e0b,#fbbf24)"
        },
        {
            title: "Completed Orders",
            value: completedOrders,
            icon: <FaCheckCircle />,
            bg: "linear-gradient(135deg,#10b981,#34d399)"
        },
        {
            title: "Cancelled Orders",
            value: cancelledOrders,
            icon: <FaTimesCircle />,
            bg: "linear-gradient(135deg,#ef4444,#f87171)"
        }
    ];

    const handleback = () => {
        navigate(-1);
    };

    useEffect(() => {
        const style = document.createElement("style");
        style.innerHTML = `
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .card-animate {
      transition: all 0.3s ease;
      animation: fadeInUp 0.6s ease forwards;
    }

    .card-animate:hover {
      transform: translateY(-8px) scale(1.03);
      box-shadow: 0 15px 30px rgba(0,0,0,0.2);
    }
  `;
        document.head.appendChild(style);
    }, []);
    return (
        <div style={styles.container}>

            {/* ================= HEADER ================= */}
            <div style={styles.container1}>


                <h2 style={styles.heading}>
                    📊 Admin Dashboard
                </h2>

                <button
                    style={styles.bckBtn}
                    onClick={handleback}
                >
                    <FaArrowLeft /> Back
                </button>

            </div>

            {/* ================= CARDS ================= */}
            <div style={styles.grid}>

                {cards.map((card, index) => (
                    <div
                        key={index}
                        className="card-animate"
                        style={{
                            ...styles.card,
                            background: card.bg
                        }}
                    >

                        <div style={styles.iconBox}>
                            {card.icon}
                        </div>

                        <div>
                            <h3 style={styles.value}>{card.value}</h3>
                            <p style={styles.title}>{card.title}</p>
                        </div>

                    </div>
                ))}

            </div>

        </div>
    );
}

/* ================= STYLES ================= */

const styles = {

    container: {
        padding: "20px",
        background: "#f4f7fb",
        minHeight: "100vh"
    },

    container1: {
        display: "flex",
        alignItems: "center",
        gap: "40px",
        marginTop: "50px",

    },

    bckBtn: {
        padding: "10px 16px",
        border: "none",
        borderRadius: "12px",
        background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
        color: "#fff",
        cursor: "pointer",
        fontWeight: "600",
        display: "flex",
        alignItems: "center",
        gap: "8px"
    },

    heading: {
        margin: 0,
        fontWeight: "700",
        color: "#111827"
    },

    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        marginTop: "40px",
        gap: "20px"
    },

    card: {
        borderRadius: "22px",
        padding: "25px",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        gap: "18px",
        boxShadow: "0 10px 25px rgba(0,0,0,0.12)"
    },

    iconBox: {
        width: "70px",
        height: "70px",
        borderRadius: "18px",
        background: "rgba(255,255,255,0.18)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "28px",
        backdropFilter: "blur(10px)"
    },

    value: {
        margin: 0,
        fontSize: "2rem",
        fontWeight: "800"
    },

    title: {
        margin: 0,
        marginTop: "6px",
        opacity: 0.9,
        fontSize: "15px"
    }
};