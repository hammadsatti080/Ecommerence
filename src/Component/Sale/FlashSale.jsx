import React from "react";
import { useNavigate } from "react-router-dom";

const products = [
    {
        id: 1,
        link: "sale1",
        name: "3Pc Embroidered Chiffon Suit",
        price: 3239,
        oldPrice: 7999,
        discount: "-60%",
        image: "/Homescreen/Sale/s1.avif"
    },
    {
        id: 2,
        link: "sale2",
        name: "Watch Box Organizer",
        price: 896,
        oldPrice: 1480,
        discount: "-39%",
        image: "/Homescreen/Sale/s2.avif"
    },
    {
        id: 3,
        link: "sale3",
        name: "Stylish Slippers",
        price: 999,
        oldPrice: 4458,
        discount: "-78%",
        image: "/Homescreen/Sale/s3.avif"
    },
    {
        id: 4,
        link: "sale4",
        name: "Kitchen Tissue Rolls",
        price: 439,
        oldPrice: 590,
        discount: "-26%",
        image: "/Homescreen/Sale/s4.avif"
    },
    {
        id: 5,
        link: "sale5",
        name: "Makeup Brush Set",
        price: 321,
        oldPrice: 800,
        discount: "-60%",
        image: "/Homescreen/Sale/s5.avif"
    },
   
];

export default function FlashSale() {
    const navigate = useNavigate();

    return (
        <>
            {/* Bootstrap + Custom CSS */}
            <style>{`
                .flash-card {
                    background: #fff;
                    border-radius: 12px;
                    overflow: hidden;
                    box-shadow: 0 5px 15px rgba(0,0,0,0.08);
                    cursor: pointer;
                    position: relative;
                    transition: 0.3s;
                }

                .flash-card:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 8px 24px rgba(0,0,0,0.12);
                }

                .flash-card img {
                    width: 100%;
                    height: 180px;
                    object-fit: cover;
                    display: block;
                }

                .flash-badge {
                    position: absolute;
                    top: 8px;
                    right: 8px;
                    background: red;
                    color: #fff;
                    font-size: 11px;
                    font-weight: 700;
                    padding: 3px 7px;
                    border-radius: 8px;
                }

                .flash-title {
                    font-size: 14px;
                    font-weight: 600;
                    margin-bottom: 6px;
                }

                .flash-price {
                    font-weight: bold;
                    color: #e53935;
                }

                .flash-old {
                    text-decoration: line-through;
                    font-size: 12px;
                    color: gray;
                }

                @media (max-width: 768px) {
                    .flash-card img {
                        height: 140px;
                    }
                    .flash-title {
                        font-size: 12px;
                    }
                }
            `}</style>

            <div className="container my-4">

                {/* Heading */}
                <h2 className="mb-3">🔥 Flash Sale</h2>

                {/* Bootstrap Grid */}
                <div className="row g-2 g-md-3">

                    {products.map((item) => (
                        <div
                            key={item.id}
                            className="col-6 col-md-4 col-lg-3 col-xl-2"
                            onClick={() => navigate(`/product/${item.link}`)}
                        >
                            <div className="flash-card">

                                <img src={item.image} alt={item.name} />

                                <div className="flash-badge">
                                    {item.discount}
                                </div>

                                <div className="p-2">

                                    <h3 className="flash-title">
                                        {item.name}
                                    </h3>

                                    <div className="d-flex justify-content-between align-items-center">
                                        <span className="flash-price">
                                            Rs. {item.price.toLocaleString()}
                                        </span>

                                        <span className="flash-old">
                                            Rs. {item.oldPrice.toLocaleString()}
                                        </span>
                                    </div>

                                </div>

                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </>
    );
}