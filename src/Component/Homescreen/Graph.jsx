import { useEffect, useState } from "react";
import {
    Chart as ChartJS,
    LineElement,
    BarElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
} from "chart.js";
import "./Graph.css";
import { Line, Bar } from "react-chartjs-2";

ChartJS.register(
    LineElement,
    BarElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
);

export default function Graph() {

    const [ordersChart, setOrdersChart] = useState(null);
    const [revenueChart, setRevenueChart] = useState(null);
    const [productChart, setProductChart] = useState(null);
    const [ratingChart, setRatingChart] = useState(null);
    const [userChart] = useState(null);

    const [stats, setStats] = useState({
        users: 0,
        products: 0,
        orders: 0,
        saved: 0
    });

    useEffect(() => {

        // =========================
        // 📦 ORDERS + REVENUE
        // =========================
        fetch("https://ecommerence-backend-jade.vercel.app/api/orders")
            .then(res => res.json())
            .then(data => {

                const orderGroup = {};
                const revenueGroup = {};

                data.forEach(order => {
                    const date = new Date(order.createdAt)
                        .toISOString()
                        .split("T")[0];

                    orderGroup[date] = (orderGroup[date] || 0) + 1;
                    revenueGroup[date] =
                        (revenueGroup[date] || 0) + order.totalPrice;
                });

                setOrdersChart({
                    labels: Object.keys(orderGroup),
                    datasets: [{
                        label: "Orders",
                        data: Object.values(orderGroup),
                        borderColor: "#f00f0f",
                        tension: 0.4,
                        pointRadius: 4
                    }]
                });

                setRevenueChart({
                    labels: Object.keys(revenueGroup),
                    datasets: [{
                        label: "Revenue",
                        data: Object.values(revenueGroup),
                        borderColor: "green",
                        tension: 0.4,
                        pointRadius: 4
                    }]
                });

                setStats(prev => ({
                    ...prev,
                    orders: data.length
                }));
            });

        // =========================
        // 🛍️ PRODUCTS
        // =========================
        fetch("https://ecommerence-backend-jade.vercel.app/api/products")
            .then(res => res.json())
            .then(data => {

                const categoryCount = {};

                data.forEach(p => {
                    const cat = p.category || "Other";
                    categoryCount[cat] = (categoryCount[cat] || 0) + 1;
                });

                setProductChart({
                    labels: Object.keys(categoryCount),
                    datasets: [{
                        label: "Products",
                        data: Object.values(categoryCount),
                        backgroundColor: "#1be9df"
                    }]
                });

                setStats(prev => ({
                    ...prev,
                    products: data.length
                }));
            });

        fetch("https://ecommerence-backend-jade.vercel.app/api/rating")
            .then(res => res.json())
            .then(data => {

                const ratingCount = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

                data.forEach(r => {
                    ratingCount[r.value || 0]++;
                });

                setRatingChart({
                    labels: Object.keys(ratingCount),
                    datasets: [{
                        label: "Ratings",
                        data: Object.values(ratingCount),
                        backgroundColor: "orange"
                    }]
                });
            });

    }, []);

    return (
        <div className="dashboard">

            {/* STATS */}
            <div style={card}>📦 Products: {stats.products}</div>
            <div style={card}>🛒 Orders: {stats.orders}</div>

            {/* CHARTS WRAPPER */}
            <div className="grid">

                {/* ORDERS */}
                {ordersChart && (
                    <div style={card}>
                        <h3>📈 Orders Trend</h3>
                        <Line data={ordersChart} />
                    </div>
                )}

                {/* REVENUE */}
                {revenueChart && (
                    <div style={card}>
                        <h3>💰 Revenue Trend</h3>
                        <Line data={revenueChart} />
                    </div>
                )}

                {/* USER */}
                {userChart && (
                    <div style={card}>
                        <h3>👤 User Signups Trend</h3>
                        <Line data={userChart} />
                    </div>
                )}

                {/* PRODUCTS */}
                {productChart && (
                    <div style={card}>
                        <h3>🛍️ Products</h3>
                        <Bar data={productChart} />
                    </div>
                )}

                {/* RATINGS */}
                {ratingChart && (
                    <div style={card}>
                        <h3>⭐ Ratings</h3>
                        <Bar data={ratingChart} />
                    </div>
                )}

            </div>

        </div>
    );
}
const card = {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)"
}