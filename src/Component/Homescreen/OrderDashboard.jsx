import React, { useEffect, useState } from "react";
import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
} from "recharts";
import "./OrderDashboard.css";

const COLORS = ["#F59E0B", "#10B981", "#EF4444"];

export default function OrderDashboard() {
    const [orders, setOrders] = useState([]);
    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("https://ecommerence-backend-jade.vercel.app/api/orders")
            .then((res) => res.json())
            .then((data) => {
                setOrders(data);

                const counts = {
                    Pending: 0,
                    Completed: 0,
                    Cancelled: 0,
                };

                data.forEach((order) => {
                    const status = order.status?.toLowerCase();

                    if (status === "pending") {
                        counts.Pending++;
                    } else if (
                        status === "completed" ||
                        status === "complete"
                    ) {
                        counts.Completed++;
                    } else if (
                        status === "cancelled" ||
                        status === "canceled"
                    ) {
                        counts.Cancelled++;
                    }
                });

                setChartData([
                    {
                        status: "Pending",
                        count: counts.Pending,
                    },
                    {
                        status: "Completed",
                        count: counts.Completed,
                    },
                    {
                        status: "Cancelled",
                        count: counts.Cancelled,
                    },
                ]);

                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="dashboard-loading">
                Loading Order Records...
            </div>
        );
    }

    const pending =
        chartData.find((item) => item.status === "Pending")?.count || 0;

    const completed =
        chartData.find((item) => item.status === "Completed")?.count || 0;

    const cancelled =
        chartData.find((item) => item.status === "Cancelled")?.count || 0;

    return (
        <div className="dashboard-container">
            {/* Header */}

            <div className="dashboard-header">
                <h1>Order Records</h1>
                <p>
                    Monitor order status, distribution and overall
                    performance.
                </p>
            </div>

            {/* Stats Cards */}

            <div className="stats-grid" >
                <div className="stat-card total">
                    <h4>Total Orders</h4>
                    <h2>{orders.length}</h2>
                </div>

                <div className="stat-card completed">
                    <h4>Completed</h4>
                    <h2>{completed}</h2>
                </div>

                <div className="stat-card pending">
                    <h4>Pending</h4>
                    <h2>{pending}</h2>
                </div>

                <div className="stat-card cancelled">
                    <h4>Cancelled</h4>
                    <h2>{cancelled}</h2>
                </div>
            </div>

            {/* Charts */}

            <div className="charts-grid" >
                {/* Pie Chart */}

                <div className="chart-card">
                    <div className="chart-title">
                        Order Distribution
                    </div>

                    <ResponsiveContainer width="100%" height={350}>
                        <PieChart>
                            <Pie
                                data={chartData}
                                dataKey="count"
                                nameKey="status"
                                outerRadius={120}
                                label
                            >
                                {chartData.map((entry, index) => (
                                    <Cell
                                        key={index}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>

                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Horizontal Bar Chart */}

                <div className="chart-card">
                    <div className="chart-title">
                        Orders By Status
                    </div>

                    <ResponsiveContainer width="100%" height={350} >
                        <BarChart
                            data={chartData}
                            layout="vertical"
                           
                        >
                            <CartesianGrid strokeDasharray="3 3" />

                            <XAxis type="number" />

                            <YAxis
                                type="category"
                                dataKey="status"
                            />

                            <Tooltip />

                            <Bar
                                dataKey="count"
                                radius={[0, 8, 8, 0]}
                                fill="#3B82F6"
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}