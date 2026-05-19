import React, { useState, useEffect } from "react";

// ─── MICROPHONE BRANDS FILTER ─────────────────────
const brands = ["All", "Rode", "Boyaa", "Maono", "Shure", "FIFINE"];

// ─── PRODUCTS ─────────────────────────────────────
const microphones = [
    {
        title: "Rode NT-USB Mic",
        image:
            "https://www.dynamicavl.com.pk/wp-content/uploads/2019/04/studiomaster-microphones-km92-01-600x600.png",
        price: "120",
        desc: "Professional USB condenser microphone.",
        brand: "Rode",
    },
    {
        title: "Rode VideoMic GO",
        image:
            "https://www.dynamicavl.com.pk/wp-content/uploads/2019/04/studiomaster-microphones-km92-01-600x600.png",
        price: "95",
        desc: "Lightweight shotgun microphone.",
        brand: "Rode",
    },
    {
        title: "Boyaa BY-M1 Mic",
        image:
            "https://fusionmax.com.pk/wp-content/uploads/2025/10/rode-nt1-5th-generation-black-3-quarter-with-shock-mount-and-pop-shield-5464x8192-rgb-2000x2000-4f7630d.png",
        price: "25",
        desc: "Clip-on lavalier microphone.",
        brand: "Boyaa",
    },
    {
        title: "Maono AU-A04",
        image:
            "https://cdn.hswstatic.com/gif/microphone-types.jpg",
        price: "60",
        desc: "Studio condenser microphone kit.",
        brand: "Maono",
    },
    {
        title: "Shure SM7B",
        image:
            "https://fusionmax.com.pk/wp-content/uploads/2025/10/rode-nt1-5th-generation-black-3-quarter-with-shock-mount-and-pop-shield-5464x8192-rgb-2000x2000-4f7630d.png",
        price: "399",
        desc: "Broadcast quality dynamic microphone.",
        brand: "Shure",
    },
    {
        title: "FIFINE K669B",
        image:
            "https://fusionmax.com.pk/wp-content/uploads/2025/10/rode-nt1-5th-generation-black-3-quarter-with-shock-mount-and-pop-shield-5464x8192-rgb-2000x2000-4f7630d.png",
        price: "45",
        desc: "USB streaming microphone.",
        brand: "FIFINE",
    },
    {
        title: "Rode NT-USB Mic",
        image:
            "https://www.dynamicavl.com.pk/wp-content/uploads/2019/04/studiomaster-microphones-km92-01-600x600.png",
        price: "120",
        desc: "Professional USB condenser microphone.",
        brand: "Rode",
    },
    {
        title: "Rode VideoMic GO",
        image:
            "https://www.dynamicavl.com.pk/wp-content/uploads/2019/04/studiomaster-microphones-km92-01-600x600.png",
        price: "95",
        desc: "Lightweight shotgun microphone.",
        brand: "Rode",
    },
    {
        title: "Boyaa BY-M1 Mic",
        image:
            "https://fusionmax.com.pk/wp-content/uploads/2025/10/rode-nt1-5th-generation-black-3-quarter-with-shock-mount-and-pop-shield-5464x8192-rgb-2000x2000-4f7630d.png",
        price: "25",
        desc: "Clip-on lavalier microphone.",
        brand: "Boyaa",
    },
    {
        title: "Maono AU-A04",
        image:
            "https://cdn.hswstatic.com/gif/microphone-types.jpg",
        price: "60",
        desc: "Studio condenser microphone kit.",
        brand: "Maono",
    },
    {
        title: "Shure SM7B",
        image:
            "https://fusionmax.com.pk/wp-content/uploads/2025/10/rode-nt1-5th-generation-black-3-quarter-with-shock-mount-and-pop-shield-5464x8192-rgb-2000x2000-4f7630d.png",
        price: "399",
        desc: "Broadcast quality dynamic microphone.",
        brand: "Shure",
    },
    {
        title: "FIFINE K669B",
        image:
            "https://fusionmax.com.pk/wp-content/uploads/2025/10/rode-nt1-5th-generation-black-3-quarter-with-shock-mount-and-pop-shield-5464x8192-rgb-2000x2000-4f7630d.png",
        price: "45",
        desc: "USB streaming microphone.",
        brand: "FIFINE",
    },
    {
        title: "Rode NT-USB Mic",
        image:
            "https://www.dynamicavl.com.pk/wp-content/uploads/2019/04/studiomaster-microphones-km92-01-600x600.png",
        price: "120",
        desc: "Professional USB condenser microphone.",
        brand: "Rode",
    },
    {
        title: "Rode VideoMic GO",
        image:
            "https://www.dynamicavl.com.pk/wp-content/uploads/2019/04/studiomaster-microphones-km92-01-600x600.png",
        price: "95",
        desc: "Lightweight shotgun microphone.",
        brand: "Rode",
    },
    {
        title: "Boyaa BY-M1 Mic",
        image:
            "https://fusionmax.com.pk/wp-content/uploads/2025/10/rode-nt1-5th-generation-black-3-quarter-with-shock-mount-and-pop-shield-5464x8192-rgb-2000x2000-4f7630d.png",
        price: "25",
        desc: "Clip-on lavalier microphone.",
        brand: "Boyaa",
    },
    {
        title: "Maono AU-A04",
        image:
            "https://cdn.hswstatic.com/gif/microphone-types.jpg",
        price: "60",
        desc: "Studio condenser microphone kit.",
        brand: "Maono",
    },
    {
        title: "Shure SM7B",
        image:
            "https://fusionmax.com.pk/wp-content/uploads/2025/10/rode-nt1-5th-generation-black-3-quarter-with-shock-mount-and-pop-shield-5464x8192-rgb-2000x2000-4f7630d.png",
        price: "399",
        desc: "Broadcast quality dynamic microphone.",
        brand: "Shure",
    },
    {
        title: "FIFINE K669B",
        image:
            "https://fusionmax.com.pk/wp-content/uploads/2025/10/rode-nt1-5th-generation-black-3-quarter-with-shock-mount-and-pop-shield-5464x8192-rgb-2000x2000-4f7630d.png",
        price: "45",
        desc: "USB streaming microphone.",
        brand: "FIFINE",
    },
];

export default function Microphones() {

    const [isMobile, setIsMobile] = useState(
        window.innerWidth <= 768
    );

    // ─── CART STATE ─────────────────────────────
    const [cart, setCart] = useState([]);
    const [showCart, setShowCart] = useState(false);
    const [step, setStep] = useState("cart");

    // ─── FILTER STATE ───────────────────────────
    const [selectedBrand, setSelectedBrand] =
        useState("All");

    // ─── FORM ────────────────────────────────────
    const [form, setForm] = useState({
        name: "",
        email: "",
    });

    const [error, setError] = useState("");
    const [setLoading] = useState(false);

    const filteredProducts =
        selectedBrand === "All"
            ? microphones
            : microphones.filter(
                (item) =>
                    item.brand === selectedBrand
            );

    useEffect(() => {
        const handleResize = () =>
            setIsMobile(window.innerWidth <= 768);

        window.addEventListener(
            "resize",
            handleResize
        );

        return () =>
            window.removeEventListener(
                "resize",
                handleResize
            );
    }, []);

    // ─── CART FUNCTIONS ─────────────────────────

    const addToCart = (item) => {
        setCart((prev) => {
            const exists = prev.find(
                (x) => x.title === item.title
            );

            if (exists) {
                return prev.map((x) =>
                    x.title === item.title
                        ? {
                            ...x,
                            qty: x.qty + 1,
                        }
                        : x
                );
            }

            return [
                ...prev,
                {
                    ...item,
                    qty: 1,
                },
            ];
        });

        setShowCart(true);
        setStep("cart");
    };



    const totalItems = cart.reduce(
        (sum, item) => sum + item.qty,
        0
    );



    // ─── CHECKOUT ───────────────────────────────

    const goToForm = () => {
        if (cart.length === 0) return;
        setStep("form");
        setError("");
    };

    const handlePlaceOrder = async () => {
        setError("");

        if (!form.name.trim()) {
            setError("Enter your name");
            return;
        }

        if (!form.email.trim()) {
            setError("Enter your email");
            return;
        }

        setLoading(true);

        try {
            const checkRes = await fetch(
                "https://ecommerence-backend-jade.vercel.app/api/auth/check-email",
                {
                    method: "POST",
                    headers: {
                        "Content-Type":
                            "application/json",
                    },
                    body: JSON.stringify({
                        email: form.email.trim(),
                    }),
                }
            );

            const checkData =
                await checkRes.json();

            if (!checkData.exists) {
                setError(
                    "Email not registered"
                );
                setLoading(false);
                return;
            }

            const orderRes = await fetch(
                "https://ecommerence-backend-jade.vercel.app/api/orders",
                {
                    method: "POST",
                    headers: {
                        "Content-Type":
                            "application/json",
                    },
                    body: JSON.stringify({
                        user: {
                            name: form.name.trim(),
                            email: form.email
                                .trim()
                                .toLowerCase(),
                        },
                        cart: cart.map(
                            (item) => ({
                                name: item.title,
                                price: parseFloat(
                                    item.price
                                ),
                                qty: item.qty,
                            })
                        ),
                    }),
                }
            );

            if (!orderRes.ok) {
                setError(
                    "Order failed"
                );
                setLoading(false);
                return;
            }

            setCart([]);
            setStep("success");

        } catch (err) {
            setError("Network error");
        }

        setLoading(false);
    };

    const closeModal = () => {
        setShowCart(false);
        setStep("cart");
        setError("");
    };

    // ─── STYLES ─────────────────────────────────

    const overlay = {
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.55)",
        zIndex: 1000,
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        paddingTop: "40px",
    };

    const modal = {
        background: "#fff",
        borderRadius: "16px",
        width: isMobile ? "95%" : "480px",
        maxHeight: "85vh",
        overflowY: "auto",
        padding: "24px",
        position: "relative",
    };

    return (
        <div
            style={{
                padding: isMobile ? "15px" : "30px",
                background: "#f7f5f2",
                minHeight: "100vh",
                fontFamily: "Segoe UI",
            }}
        >
            {/* HEADER */}
            <div
                style={{
                    display: "flex",
                    justifyContent:
                        "space-between",
                    alignItems: "center",
                    marginBottom: "25px",
                }}
            >
                <div>
                    <h1>Microphones</h1>
                    <p style={{ color: "#666" }}>
                        Studio & streaming microphones
                    </p>
                </div>

                <button
                    onClick={() => {
                        setShowCart(true);
                        setStep("cart");
                    }}
                    style={{
                        background: "#111",
                        color: "#fff",
                        border: "none",
                        padding: "10px 16px",
                        borderRadius: "10px",
                        cursor: "pointer",
                    }}
                >
                    🛒 Cart ({totalItems})
                </button>
            </div>

            {/* FILTER */}
            <div
                style={{
                    display: "flex",
                    gap: "10px",
                    flexWrap: "wrap",
                    marginBottom: "20px",
                }}
            >
                {brands.map((b, i) => (
                    <button
                        key={i}
                        onClick={() =>
                            setSelectedBrand(b)
                        }
                        style={{
                            padding: "8px 14px",
                            borderRadius: "30px",
                            border:
                                selectedBrand === b
                                    ? "2px solid #111"
                                    : "1px solid #ddd",
                            background:
                                selectedBrand === b
                                    ? "#111"
                                    : "#fff",
                            color:
                                selectedBrand === b
                                    ? "#fff"
                                    : "#111",
                        }}
                    >
                        {b}
                    </button>
                ))}
            </div>

            {/* PRODUCTS */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns:
                        isMobile
                            ? "repeat(2,1fr)"
                            : "repeat(auto-fit,minmax(240px,1fr))",
                    gap: "18px",
                }}
            >
                {filteredProducts.map(
                    (item, i) => (
                        <div
                            key={i}
                            style={{
                                background: "#fff",
                                borderRadius: "14px",
                                overflow: "hidden",
                                boxShadow:
                                    "0 4px 12px rgba(0,0,0,0.08)",
                            }}
                        >
                            <img
                                src={item.image}
                                alt="phone"
                                style={{
                                    width: "100%",
                                    height: "220px",
                                    objectFit:
                                        "cover",
                                }}
                            />

                            <div style={{ padding: 14 }}>
                                <h3>
                                    {item.title}
                                </h3>
                                <p
                                    style={{
                                        fontSize:
                                            "13px",
                                        color:
                                            "#666",
                                    }}
                                >
                                    {item.desc}
                                </p>

                                <div
                                    style={{
                                        display:
                                            "flex",
                                        justifyContent:
                                            "space-between",
                                        marginTop:
                                            "10px",
                                    }}
                                >
                                    <strong>
                                        {item.price}
                                    </strong>

                                    <button
                                        onClick={() =>
                                            addToCart(
                                                item
                                            )
                                        }
                                        style={{
                                            background:
                                                "#111",
                                            color:
                                                "#fff",
                                            border:
                                                "none",
                                            padding:
                                                "8px 12px",
                                            borderRadius:
                                                "8px",
                                        }}
                                    >
                                        + Add
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                )}
            </div>

            {/* CART MODAL (same structure used before) */}
            {showCart && (
                <div
                    style={overlay}
                    onClick={(e) =>
                        e.target ===
                        e.currentTarget &&
                        closeModal()
                    }
                >
                    <div style={modal}>
                        <button
                            onClick={closeModal}
                            style={{
                                position:
                                    "absolute",
                                top: 14,
                                right: 16,
                                border: "none",
                                background: "none",
                                fontSize: 22,
                            }}
                        >
                            ✕
                        </button>

                        {step === "cart" && (
                            <>
                                <h2>Cart</h2>

                                {cart.map(
                                    (item, i) => (
                                        <div
                                            key={i}
                                            style={{
                                                display:
                                                    "flex",
                                                justifyContent:
                                                    "space-between",
                                                padding:
                                                    "10px 0",
                                                borderBottom:
                                                    "1px solid #eee",
                                            }}
                                        >
                                            <span>
                                                {
                                                    item.title
                                                }
                                            </span>
                                            <span>
                                                $
                                                {
                                                    item.price
                                                }
                                            </span>
                                        </div>
                                    )
                                )}

                                <button
                                    onClick={
                                        goToForm
                                    }
                                    style={{
                                        marginTop:
                                            "15px",
                                        width: "100%",
                                        padding:
                                            "12px",
                                        background:
                                            "#111",
                                        color:
                                            "#fff",
                                        border:
                                            "none",
                                        borderRadius:
                                            "8px",
                                    }}
                                >
                                    Checkout
                                </button>
                            </>
                        )}

                        {step === "form" && (
                            <>
                                <h2>Checkout</h2>

                                <input
                                    placeholder="Name"
                                    value={form.name}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            name: e.target.value,
                                        })
                                    }
                                    style={{
                                        width:
                                            "100%",
                                        padding:
                                            "10px",
                                        marginTop:
                                            "10px",
                                    }}
                                />

                                <input
                                    placeholder="Email"
                                    value={form.email}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            email:
                                                e.target
                                                    .value,
                                        })
                                    }
                                    style={{
                                        width:
                                            "100%",
                                        padding:
                                            "10px",
                                        marginTop:
                                            "10px",
                                    }}
                                />

                                {error && (
                                    <p style={{ color: "red" }}>
                                        {error}
                                    </p>
                                )}

                                <button
                                    onClick={
                                        handlePlaceOrder
                                    }
                                    style={{
                                        width: "100%",
                                        padding:
                                            "12px",
                                        marginTop:
                                            "15px",
                                        background:
                                            "#111",
                                        color:
                                            "#fff",
                                    }}
                                >
                                    Place Order
                                </button>
                            </>
                        )}

                        {step === "success" && (
                            <div
                                style={{
                                    textAlign:
                                        "center",
                                    padding:
                                        "20px",
                                }}
                            >
                                🎉 Order Placed!
                                <br />
                                <button
                                    onClick={
                                        closeModal
                                    }
                                    style={{
                                        marginTop:
                                            "15px",
                                        padding:
                                            "10px",
                                        background:
                                            "#27ae60",
                                        color:
                                            "#fff",
                                    }}
                                >
                                    Continue
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}