import React, { useEffect, useState } from "react";

const brands = ["All"];

export default function MobileCategory() {
    const [mobiles, setMobiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [selectedBrand, setSelectedBrand] = useState("All");

    const [cart, setCart] = useState([]);
    const [showCart, setShowCart] = useState(false);
    const [step, setStep] = useState("cart");

    const [form, setForm] = useState({ name: "", email: "" });
    const [errorMsg, setErrorMsg] = useState("");
    const [loadingOrder, setLoadingOrder] = useState(false);

    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // ───────── FETCH PRODUCTS ─────────
    useEffect(() => {
        const fetchMobiles = async () => {
            try {
                setLoading(true);
                const res = await fetch("https://ecommerence-backend-jade.vercel.app/api/Saleprod");
                if (!res.ok) throw new Error("Failed to fetch products");
                const data = await res.json();
                const filtered = data.filter(
                    (item) => item.category?.toLowerCase() === "mobile"
                );
                setMobiles(filtered);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchMobiles();
    }, []);

    // ───────── FILTERED PRODUCTS ─────────
    const filteredMobiles =
        selectedBrand === "All"
            ? mobiles
            : mobiles.filter((item) => item.brand === selectedBrand);

    // ───────── CART LOGIC ─────────
    const addToCart = (item) => {
        const productName = item.name || item.title;
        setCart((prev) => {
            const exists = prev.find((x) => x._id === item._id);
            if (exists) {
                return prev.map((x) =>
                    x._id === item._id ? { ...x, qty: x.qty + 1 } : x
                );
            }
            return [...prev, { ...item, name: productName, qty: 1 }];
        });
        setShowCart(true);
        setStep("cart");
    };

    const updateQty = (id, delta) => {
        setCart((prev) =>
            prev
                .map((x) => (x._id === id ? { ...x, qty: x.qty + delta } : x))
                .filter((x) => x.qty > 0)
        );
    };

    const removeItem = (id) => {
        setCart((prev) => prev.filter((x) => x._id !== id));
    };

    const totalItems = cart.reduce((sum, i) => sum + i.qty, 0);
    const cartTotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

    const goToForm = () => {
        if (cart.length === 0) return;
        setStep("form");
        setErrorMsg("");
    };

    // ───────── ORDER FUNCTION ─────────
    const handlePlaceOrder = async () => {
        setErrorMsg("");

        if (!form.name.trim()) { setErrorMsg("Please enter your name."); return; }
        if (!form.email.trim()) { setErrorMsg("Please enter your email."); return; }

        setLoadingOrder(true);

        try {
            const check = await fetch(
                "https://ecommerence-backend-jade.vercel.app/api/auth/check-email",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email: form.email.trim() }),
                }
            );
            const checkData = await check.json();

            if (!checkData.exists) {
                setErrorMsg("This email is not registered. Please sign up first.");
                setLoadingOrder(false);
                return;
            }

            const order = await fetch(
                "https://ecommerence-backend-jade.vercel.app/api/orders",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        user: {
                            name: form.name.trim(),
                            email: form.email.trim().toLowerCase(),
                        },
                        cart: cart.map((i) => ({
                            name: i.name || i.title,
                            price: i.price,
                            qty: i.qty,
                        })),
                    }),
                }
            );

            if (!order.ok) {
                const errData = await order.json();
                setErrorMsg(errData.message || "Failed to place order.");
                setLoadingOrder(false);
                return;
            }

            setCart([]);
            setStep("success");
        } catch (err) {
            setErrorMsg("Network error. Please check your connection.");
        }

        setLoadingOrder(false);
    };

    const closeModal = () => {
        setShowCart(false);
        setStep("cart");
        setErrorMsg("");
    };

    if (loading) return <p style={{ padding: "40px", fontFamily: "Segoe UI" }}>Loading...</p>;
    if (error) return <p style={{ padding: "40px", fontFamily: "Segoe UI", color: "#e74c3c" }}>{error}</p>;

    return (
        <div
            style={{
                padding: isMobile ? "15px" : "30px",
                background: "#f7f5f2",
                minHeight: "100vh",
                fontFamily: "Segoe UI",
            }}
        >
            {/* ─── TOP BAR ─────────────────────── */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "25px",
                }}
            >
                <div>
                    <h1
                        style={{
                            fontSize: isMobile ? "28px" : "38px",
                            marginBottom: "6px",
                            color: "#111",
                            fontWeight: "500",
                        }}
                    >
                        Mobile Phones
                    </h1>
                    <p style={{ color: "#666", fontSize: "14px" }}>
                        Top-rated smartphones for every budget and lifestyle.
                    </p>
                </div>

                <button
                    onClick={() => { setShowCart(true); setStep("cart"); }}
                    style={{
                        position: "relative",
                        background: "#111",
                        color: "#fff",
                        border: "none",
                        borderRadius: "10px",
                        padding: "10px 18px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        fontFamily: "Segoe UI",
                    }}
                >
                    🛒 Cart
                    {totalItems > 0 && (
                        <span
                            style={{
                                background: "#c9a96e",
                                color: "#000",
                                width: "22px",
                                height: "22px",
                                borderRadius: "50%",
                                fontSize: "11px",
                                fontWeight: "700",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            {totalItems}
                        </span>
                    )}
                </button>
            </div>

            {/* ─── BRAND FILTER ────────────────── */}
            <div
                style={{
                    display: "flex",
                    gap: "10px",
                    flexWrap: "wrap",
                    marginBottom: "25px",
                }}
            >
                {brands.map((brand, index) => (
                    <button
                        key={index}
                        onClick={() => setSelectedBrand(brand)}
                        style={{
                            padding: "8px 16px",
                            border: selectedBrand === brand ? "2px solid #111" : "1px solid #ddd",
                            background: selectedBrand === brand ? "#111" : "#fff",
                            color: selectedBrand === brand ? "#fff" : "#111",
                            borderRadius: "30px",
                            cursor: "pointer",
                            fontSize: "13px",
                            fontWeight: "600",
                            transition: "0.3s",
                            fontFamily: "Segoe UI",
                        }}
                    >
                        {brand}
                    </button>
                ))}
            </div>

            {/* ─── PRODUCT GRID ─────────────────── */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: isMobile
                        ? "repeat(2, 1fr)"
                        : "repeat(auto-fit, minmax(240px, 1fr))",
                    gap: "18px",
                }}
            >
                {filteredMobiles.map((m) => (
                    <div
                        key={m._id}
                        style={{
                            background: "#fff",
                            borderRadius: "14px",
                            overflow: "hidden",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                        }}
                    >
                        <img
                            src={m.image}
                            alt={m.name || m.title}
                            style={{
                                width: "100%",
                                height: isMobile ? "190px" : "280px",
                                objectFit: "cover",
                            }}
                        />
                        <div style={{ padding: "14px" }}>
                            <h3
                                style={{
                                    fontSize: "16px",
                                    fontWeight: "500",
                                    marginBottom: "6px",
                                    color: "#111",
                                }}
                            >
                                {m.name || m.title}
                            </h3>

                            <p
                                style={{
                                    color: "#666",
                                    fontSize: "13px",
                                    marginBottom: "10px",
                                }}
                            >
                                {m.description || "Premium mobile device"}
                            </p>

                            {m.brand && (
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        marginBottom: "12px",
                                        color: "#666",
                                        fontSize: "13px",
                                    }}
                                >
                                    <span>{m.brand}</span>
                                </div>
                            )}

                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}
                            >
                                <strong style={{ color: "#c9a96e", fontSize: "17px" }}>
                                    {m.price}
                                </strong>
                                <button
                                    onClick={() => addToCart(m)}
                                    style={{
                                        border: "none",
                                        background: "#111",
                                        color: "#fff",
                                        padding: "8px 14px",
                                        borderRadius: "8px",
                                        cursor: "pointer",
                                        fontSize: "10px",
                                        fontWeight: "400",
                                        fontFamily: "Segoe UI",
                                        width:"60px"
                                    }}
                                >
                                    + Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* ─── CART MODAL ───────────────────── */}
            {showCart && (
                <div
                    style={{
                        position: "fixed",
                        inset: 0,
                        background: "rgba(0,0,0,0.55)",
                        zIndex: 1000,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "flex-start",
                        paddingTop: "40px",
                    }}
                    onClick={(e) => e.target === e.currentTarget && closeModal()}
                >
                    <div
                        style={{
                            background: "#fff",
                            borderRadius: "16px",
                            width: isMobile ? "95%" : "480px",
                            maxHeight: "85vh",
                            overflowY: "auto",
                            padding: "24px",
                            position: "relative",
                        }}
                    >
                        <button
                            onClick={closeModal}
                            style={{
                                position: "absolute",
                                top: "14px",
                                right: "16px",
                                border: "none",
                                background: "none",
                                cursor: "pointer",
                                fontSize: "22px",
                            }}
                        >
                            ✕
                        </button>

                        {/* CART STEP */}
                        {step === "cart" && (
                            <>
                                <h2 style={{ marginBottom: "20px", fontWeight: "500" }}>
                                    🛒 Your Cart
                                </h2>

                                {cart.length === 0 ? (
                                    <p style={{ textAlign: "center", color: "#888" }}>
                                        Your cart is empty.
                                    </p>
                                ) : (
                                    <>
                                        {cart.map((i, idx) => (
                                            <div
                                                key={idx}
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: "12px",
                                                    padding: "12px 0",
                                                    borderBottom: "1px solid #eee",
                                                }}
                                            >
                                                <img
                                                    src={i.image}
                                                    alt={i.name}
                                                    style={{
                                                        width: "65px",
                                                        height: "65px",
                                                        borderRadius: "8px",
                                                        objectFit: "cover",
                                                    }}
                                                />
                                                <div style={{ flex: 1 }}>
                                                    <p style={{ fontWeight: "600", fontSize: "14px" }}>
                                                        {i.name}
                                                    </p>
                                                    <p style={{ fontSize: "12px", color: "#777" }}>
                                                        {i.price}
                                                    </p>
                                                </div>
                                                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                                                    <button onClick={() => updateQty(i._id, -1)} style={qtyBtn}>−</button>
                                                    <span>{i.qty}</span>
                                                    <button onClick={() => updateQty(i._id, 1)} style={qtyBtn}>+</button>
                                                </div>
                                                <button
                                                    onClick={() => removeItem(i._id)}
                                                    style={{ border: "none", background: "none", color: "#e74c3c", cursor: "pointer", fontSize: "16px" }}
                                                >
                                                    🗑
                                                </button>
                                            </div>
                                        ))}

                                        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "18px", fontWeight: "700", fontSize: "17px" }}>
                                            <span>Total</span>
                                            <span>${cartTotal.toFixed(2)}</span>
                                        </div>

                                        <button onClick={goToForm} style={primaryBtn}>
                                            Proceed to Payment →
                                        </button>
                                    </>
                                )}
                            </>
                        )}

                        {/* FORM STEP */}
                        {step === "form" && (
                            <>
                                <button
                                    onClick={() => setStep("cart")}
                                    style={{ border: "none", background: "none", color: "#c9a96e", cursor: "pointer", marginBottom: "16px", fontSize: "14px" }}
                                >
                                    ← Back
                                </button>

                                <h2 style={{ fontWeight: "500" }}>📋 Checkout</h2>

                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    style={inputStyle}
                                />
                                <input
                                    type="email"
                                    placeholder="Registered Email"
                                    value={form.email}
                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                    style={inputStyle}
                                />

                                {errorMsg && (
                                    <p style={{ color: "#e74c3c", fontSize: "13px", marginTop: "8px" }}>
                                        ⚠️ {errorMsg}
                                    </p>
                                )}

                                <button onClick={handlePlaceOrder} disabled={loadingOrder} style={primaryBtn}>
                                    {loadingOrder ? "Processing..." : "✅ Place Order"}
                                </button>
                            </>
                        )}

                        {/* SUCCESS STEP */}
                        {step === "success" && (
                            <div style={{ textAlign: "center", padding: "20px 0" }}>
                                <div style={{ fontSize: "60px", marginBottom: "12px" }}>🎉</div>
                                <h2 style={{ color: "#27ae60", fontWeight: "500" }}>Order Placed!</h2>
                                <p style={{ color: "#666", marginTop: "10px" }}>
                                    Your mobile order has been placed successfully.
                                </p>
                                <button onClick={closeModal} style={{ ...primaryBtn, background: "#27ae60" }}>
                                    Continue Shopping
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

// ─── SHARED STYLES ──────────────────────────────────

const qtyBtn = {
    width: "28px",
    height: "28px",
    border: "1px solid #ddd",
    borderRadius: "6px",
    background: "#f0f0f0",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "700",
};

const primaryBtn = {
    width: "100%",
    padding: "13px",
    background: "#111",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: "600",
    marginTop: "16px",
};

const inputStyle = {
    width: "100%",
    padding: "12px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    fontSize: "14px",
    marginTop: "12px",
};