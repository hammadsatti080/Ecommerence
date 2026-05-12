import React, { useState } from "react";
import {
    FaUserPlus,
    FaShoppingCart,
    FaBoxOpen,
    FaCreditCard
} from "react-icons/fa";

export default function Howwecome() {

    const [activeCard, setActiveCard] = useState(null);

    const cards = [
        {
            id: 1,
            title: "Connect",
            icon: <FaUserPlus size={32} />,
            frontColor: "#6C63FF",
            backTitle: "Login & Signup",
            description:
                "Create your account or login to access your orders, wishlist, and personalized shopping experience."
        },
        {
            id: 2,
            title: "Add To Cart",
            icon: <FaShoppingCart size={32} />,
            frontColor: "#00C9A7",
            backTitle: "Smart Cart System",
            description:
                "Add your favorite products to cart and manage quantities with a smooth shopping experience."
        },
        {
            id: 3,
            title: "Order",
            icon: <FaBoxOpen size={32} />,
            frontColor: "#FF6B6B",
            backTitle: "Place Orders",
            description:
                "Confirm your order instantly and track shipping status directly from your dashboard."
        },
        {
            id: 4,
            title: "Payment",
            icon: <FaCreditCard size={32} />,
            frontColor: "#FFB347",
            backTitle: "Secure Payment",
            description:
                "Pay securely using cards, bank transfer, or cash on delivery with encrypted checkout."
        }
    ];

    return (
        <div
            style={{
                minHeight: "100vh",
                background: "white",
                padding: "80px 20px"
            }}
        >
            <div className="container">

                {/* Heading */}
                <div className="text-center  mb-5">
                    <h1
                        style={{
                            fontSize: "3rem",
                            color:"#0f172a",
                            fontWeight: "800"
                        }}
                    >
                        How We Connect
                    </h1>

                    <p
                        style={{
                            color:"#0f172a",
                            marginTop: "15px",
                            fontSize: "1.1rem"
                        }}
                    >
                        Simple steps to enjoy your shopping experience
                    </p>
                </div>

                {/* Cards Row */}
                <div className="row g-4 justify-content-center">

                    {cards.map((card) => (

                        <div className="col-lg-3 col-md-6" key={card.id}>

                            <div
                                style={{
                                    perspective: "1200px"
                                }}
                            >

                                <div
                                    onClick={() =>
                                        setActiveCard(
                                            activeCard === card.id ? null : card.id
                                        )
                                    }
                                    style={{
                                        position: "relative",
                                        width: "100%",
                                        height: "320px",
                                        transformStyle: "preserve-3d",
                                        transition: "0.8s",
                                        cursor: "pointer",
                                        transform:
                                            activeCard === card.id
                                                ? "rotateY(180deg)"
                                                : "rotateY(0deg)"
                                    }}
                                >

                                    {/* FRONT SIDE */}
                                    <div
                                        style={{
                                            position: "absolute",
                                            width: "100%",
                                            height: "100%",
                                            backfaceVisibility: "hidden",
                                            borderRadius: "28px",
                                            background: `linear-gradient(135deg, ${card.frontColor}, #111827)`,
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            color: "white",
                                            boxShadow:
                                                "0 10px 30px rgba(0,0,0,0.35)",
                                            padding: "30px"
                                        }}
                                    >

                                        <div
                                            style={{
                                                width: "90px",
                                                height: "90px",
                                                borderRadius: "50%",
                                                background: "rgba(255,255,255,0.12)",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                marginBottom: "25px",
                                                backdropFilter: "blur(10px)"
                                            }}
                                        >
                                            {card.icon}
                                        </div>

                                        <h3
                                            style={{
                                                fontWeight: "700",
                                                fontSize: "1.8rem"
                                            }}
                                        >
                                            {card.title}
                                        </h3>

                                        <button
                                            className="btn btn-light mt-4 px-4 py-2"
                                            style={{
                                                borderRadius: "12px",
                                                fontWeight: "600"
                                            }}
                                        >
                                            Click Me
                                        </button>
                                    </div>

                                    {/* BACK SIDE */}
                                    <div
                                        style={{
                                            position: "absolute",
                                            width: "100%",
                                            height: "100%",
                                            backfaceVisibility: "hidden",
                                            borderRadius: "28px",
                                            background: "#111827",
                                            color: "white",
                                            transform: "rotateY(180deg)",
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            padding: "30px",
                                            textAlign: "center",
                                            border: `2px solid ${card.frontColor}`,
                                            boxShadow:
                                                "0 10px 30px rgba(0,0,0,0.35)"
                                        }}
                                    >

                                        <h3
                                            style={{
                                                color: card.frontColor,
                                                fontWeight: "700",
                                                marginBottom: "20px"
                                            }}
                                        >
                                            {card.backTitle}
                                        </h3>

                                        <p
                                            style={{
                                                color: "#d1d5db",
                                                lineHeight: "1.8"
                                            }}
                                        >
                                            {card.description}
                                        </p>

                                        <button
                                            className="btn btn-outline-light mt-3"
                                            style={{
                                                borderRadius: "12px"
                                            }}
                                        >
                                            Learn More
                                        </button>

                                    </div>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

            </div>
        </div>
    );
}