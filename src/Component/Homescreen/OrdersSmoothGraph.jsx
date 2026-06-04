import { useEffect, useState } from "react";
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
} from "chart.js";
import { Line } from "react-chartjs-2";
import "./OrdersSmoothGraph.css";

ChartJS.register(
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
);

export default function OrdersSmoothGraph() {
    const [chartData, setChartData] = useState(null);
    const [show, setShow] = useState(false);

    useEffect(() => {
        fetch("https://ecommerence-backend-jade.vercel.app/api/orders")
            .then(res => res.json())
            .then(data => {

                const grouped = {};

                data.forEach(order => {
                    const date = new Date(order.createdAt)
                        .toISOString()
                        .split("T")[0];

                    grouped[date] = (grouped[date] || 0) + 1;
                });

                const labels = Object.keys(grouped);
                const values = Object.values(grouped);

                setChartData({
                    labels,
                    datasets: [
                        {
                            label: "Orders",
                            data: values,
                            borderColor: "#111",
                            borderWidth: 3,
                            tension: 0.4,
                            pointRadius: 5,
                            pointBackgroundColor: "#ff4d4d"
                        }
                    ]
                });

                // trigger animation after load
                setTimeout(() => setShow(true), 100);
            });
    }, []);

    if (!chartData) return <p className="loading">Loading...</p>;

    return (
        <div className={`chart-wrapper ${show ? "show" : ""}`}>

            {/* LEFT */}
            <div className="left-card">
                  <h2>📊 Orders Analytics</h2>
                <p>
                    This chart shows daily order trends.
                    Each point represents total orders placed per day.
                </p>
                <div className="stats">
                      <ul>
                    <li>✔ Track daily sales</li>
                    <li>✔ Monitor growth</li>
                    <li>✔ Identify busy days</li>
                </ul>
                </div>
              
            </div>

            {/* RIGHT */}
            <div className="right-chart">
                <Line
                    data={chartData}
                    options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: { legend: { display: false } },
                        scales: {
                            x: { grid: { display: false } },
                            y: { beginAtZero: true }
                        }
                    }}
                />
            </div>

        </div>
    );
}