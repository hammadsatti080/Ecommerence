import React, { useState, useEffect } from "react";

const data = {
    "Kitchen Tissue": [
        { title: "Soft Kitchen Tissue", image: "/Homescreen/Sale/tssue.webp", price: "2", desc: "Ultra soft absorbent kitchen tissue for daily use." },
        { title: "Premium Roll Tissue", image: "/Homescreen/Sale/tssue.webp", price: "3", desc: "Strong and long lasting paper roll tissue." },
        { title: "Eco Tissue Pack", image: "/Homescreen/Sale/tssue.webp", price: "2", desc: "Eco friendly biodegradable tissue pack." },
    ],
    Detergent: [
        { title: "Power Clean Detergent", image: "/Homescreen/Sale/deter.webp", price: "5", desc: "Strong stain removing liquid detergent." },
        { title: "Laundry Powder", image: "/Homescreen/Sale/deter.webp", price: "4", desc: "Deep cleaning powder for clothes." },
    ],
    Cleaning: [
        { title: "Floor Cleaner", image: "/Homescreen/Sale/clean.jpg", price: "6", desc: "Kills 99% germs and cleans floors deeply." },
        { title: "Glass Cleaner", image: "/Homescreen/Sale/clean.jpg", price: "3", desc: "Crystal clear shine for glass surfaces." },
    ],
    Grocery: [
        { title: "Rice Pack", image: "/Homescreen/Sale/groc.jpg", price: "10", desc: "Premium basmati rice 5kg pack." },
        { title: "Cooking Oil", image: "/Homescreen/Sale/groc.jpg", price: "8", desc: "Pure cooking oil for daily meals." },
    ],
};

export default function KitchenStore() {
    const [selected, setSelected] = useState("Kitchen Tissue");
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    // Cart state
    const [cart, setCart] = useState([]);
    const [showCart, setShowCart] = useState(false);
    const [step, setStep] = useState("cart"); // "cart" | "form" | "success"

    // Checkout form
    const [form, setForm] = useState({ name: "", email: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // ─── Cart helpers ────────────────────────────────────────────────────────────

    const addToCart = (item) => {
        setCart((prev) => {
            const exists = prev.find((x) => x.title === item.title);
            if (exists)
                return prev.map((x) =>
                    x.title === item.title ? { ...x, qty: x.qty + 1 } : x
                );
            return [...prev, { ...item, qty: 1 }];
        });
        setStep("cart");
        setShowCart(true);
    };

    const updateQty = (title, delta) => {
        setCart((prev) =>
            prev
                .map((x) => (x.title === title ? { ...x, qty: x.qty + delta } : x))
                .filter((x) => x.qty > 0)
        );
    };

    const removeItem = (title) =>
        setCart((prev) => prev.filter((x) => x.title !== title));

    const cartTotal = cart.reduce(
        (sum, item) => sum + parseFloat(item.price.replace("$", "")) * item.qty,
        0
    );

    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

    // ─── Checkout ────────────────────────────────────────────────────────────────

    const goToForm = () => {
        if (cart.length === 0) return;
        setError("");
        setForm({ name: "", email: "" });
        setStep("form");
    };

    const handlePlaceOrder = async () => {
        setError("");
        if (!form.name.trim()) { setError("Please enter your name."); return; }
        if (!form.email.trim()) { setError("Please enter your email."); return; }

        setLoading(true);
        try {
            // 1️⃣ Verify email
            const checkRes = await fetch("https://ecommerence-bay.vercel.app/api/auth/check-email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: form.email.trim() }),
            });
            const checkData = await checkRes.json();

            if (!checkData.exists) {
                setError("This email is not registered. Please sign up first.");
                setLoading(false);
                return;
            }

            // 2️⃣ Place order
            const orderRes = await fetch("https://ecommerence-bay.vercel.app/api/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    user: {
                        name: form.name.trim(),
                        email: form.email.trim().toLowerCase(),
                    },
                    cart: cart.map((item) => ({
                        name: item.title,
                        price: parseFloat(item.price.replace("$", "")),
                        qty: item.qty,
                    })),
                }),
            });

            if (!orderRes.ok) {
                const errData = await orderRes.json();
                setError(errData.message || "Failed to place order. Try again.");
                setLoading(false);
                return;
            }

            // 3️⃣ Success
            setCart([]);
            setStep("success");
        } catch (err) {
            setError("Network error. Please check your connection.");
        }
        setLoading(false);
    };

    const closeModal = () => {
        setShowCart(false);
        setStep("cart");
        setError("");
    };

    // ─── Styles ──────────────────────────────────────────────────────────────────

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

    // ─── Render ──────────────────────────────────────────────────────────────────

    return (
        <div
            style={{
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                minHeight: "100vh",
                background: "#f4f4f4",
                fontFamily: "Segoe UI",
            }}
        >
            {/* ── SIDEBAR ── */}
            <aside style={{ width: isMobile ? "100%" : "12%", background: "#111", padding: "15px" }}>
                <h2 style={{ color: "#fff", textAlign: "center" }}>STORE</h2>

                <div style={{ display: "flex", flexDirection: isMobile ? "row" : "column", gap: "10px", overflowX: "auto" }}>
                    {Object.keys(data).map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelected(cat)}
                            style={{
                                padding: "10px",
                                borderRadius: "8px",
                                border: "none",
                                cursor: "pointer",
                                background: selected === cat ? "#ffcc00" : "#222",
                                color: selected === cat ? "#000" : "#fff",
                                minWidth: "120px",
                            }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </aside>

            {/* ── MAIN ── */}
            <main style={{ flex: 1, padding: "20px" }}>

                {/* Top bar */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
                    <h2>{selected} Products</h2>

                    {/* Cart button */}
                    <button
                        onClick={() => { setStep("cart"); setShowCart(true); }}
                        style={{
                            background: "#111",
                            color: "#fff",
                            border: "none",
                            borderRadius: "10px",
                            padding: "8px 16px",
                            cursor: "pointer",
                            fontSize: "14px",
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                        }}
                    >
                        🛒 Cart
                        {totalItems > 0 && (
                            <span
                                style={{
                                    background: "#ffcc00",
                                    color: "#000",
                                    borderRadius: "50%",
                                    width: "20px",
                                    height: "20px",
                                    fontSize: "11px",
                                    fontWeight: "bold",
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

                {/* Product Grid */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
                        gap: "15px",
                    }}
                >
                    {data[selected].map((item, index) => (
                        <div
                            key={index}
                            style={{
                                background: "#fff",
                                borderRadius: "12px",
                                padding: "12px",
                                boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
                            }}
                        >
                            <img
                                src={item.image}
                                alt={item.title}
                                style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "10px" }}
                            />
                            <h3 style={{ margin: "10px 0 5px" }}>{item.title}</h3>
                            <p style={{ fontSize: "13px", color: "#555" }}>{item.desc}</p>

                            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px", alignItems: "center" }}>
                                <strong>{item.price}</strong>
                                <button
                                    onClick={() => addToCart(item)}
                                    style={{
                                        padding: "6px 12px",
                                        border: "none",
                                        background: "#ffcc00",
                                        color: "#000",
                                        borderRadius: "6px",
                                        cursor: "pointer",
                                        fontWeight: "600",
                                        fontSize: "12px",
                                    }}
                                >
                                    + Add to Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            {/* ── CART / CHECKOUT MODAL ── */}
            {showCart && (
                <div style={overlay} onClick={(e) => e.target === e.currentTarget && closeModal()}>
                    <div style={modal}>

                        {/* Close */}
                        <button
                            onClick={closeModal}
                            style={{ position: "absolute", top: "14px", right: "16px", background: "none", border: "none", fontSize: "22px", cursor: "pointer", color: "#555" }}
                        >
                            ✕
                        </button>

                        {/* ── STEP 1: CART ── */}
                        {step === "cart" && (
                            <>
                                <h2 style={{ marginBottom: "18px", fontSize: "20px" }}>🛒 Your Cart</h2>

                                {cart.length === 0 ? (
                                    <p style={{ color: "#888", textAlign: "center", padding: "30px 0" }}>Your cart is empty.</p>
                                ) : (
                                    <>
                                        {cart.map((cartItem, idx) => (
                                            <div
                                                key={idx}
                                                style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 0", borderBottom: "1px solid #eee" }}
                                            >
                                                <img
                                                    src={cartItem.image}
                                                    alt={cartItem.title}
                                                    style={{ width: "64px", height: "64px", objectFit: "cover", borderRadius: "8px", flexShrink: 0 }}
                                                />
                                                <div style={{ flex: 1 }}>
                                                    <p style={{ fontWeight: "600", fontSize: "14px" }}>{cartItem.title}</p>
                                                    <p style={{ color: "#888", fontSize: "12px" }}>{cartItem.price} each</p>
                                                </div>

                                                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                                    <button onClick={() => updateQty(cartItem.title, -1)} style={qtyBtn}>−</button>
                                                    <span style={{ fontWeight: "700", minWidth: "18px", textAlign: "center" }}>{cartItem.qty}</span>
                                                    <button onClick={() => updateQty(cartItem.title, 1)} style={qtyBtn}>+</button>
                                                </div>

                                                <strong style={{ minWidth: "52px", textAlign: "right", fontSize: "14px" }}>
                                                    ${(parseFloat(cartItem.price.replace("$", "")) * cartItem.qty).toFixed(2)}
                                                </strong>

                                                <button
                                                    onClick={() => removeItem(cartItem.title)}
                                                    style={{ background: "none", border: "none", cursor: "pointer", color: "#e74c3c", fontSize: "16px", padding: "0 4px" }}
                                                >
                                                    🗑
                                                </button>
                                            </div>
                                        ))}

                                        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "16px", fontSize: "17px", fontWeight: "700" }}>
                                            <span>Total</span>
                                            <span>${cartTotal.toFixed(2)}</span>
                                        </div>

                                        <button onClick={goToForm} style={primaryBtn}>Proceed to Payment →</button>
                                    </>
                                )}
                            </>
                        )}

                        {/* ── STEP 2: CHECKOUT FORM ── */}
                        {step === "form" && (
                            <>
                                <button
                                    onClick={() => { setStep("cart"); setError(""); }}
                                    style={{ background: "none", border: "none", color: "#ffcc00", cursor: "pointer", fontSize: "13px", marginBottom: "12px", padding: 0 }}
                                >
                                    ← Back to Cart
                                </button>

                                <h2 style={{ marginBottom: "6px", fontSize: "20px" }}>📋 Checkout</h2>
                                <p style={{ color: "#888", fontSize: "13px", marginBottom: "20px" }}>Enter your details to place the order.</p>

                                {/* Order summary */}
                                <div style={{ background: "#f4f4f4", borderRadius: "10px", padding: "12px", marginBottom: "20px", fontSize: "13px" }}>
                                    {cart.map((cartItem, i) => (
                                        <div key={i} style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                                            <span>{cartItem.title} × {cartItem.qty}</span>
                                            <span>${(parseFloat(cartItem.price.replace("$", "")) * cartItem.qty).toFixed(2)}</span>
                                        </div>
                                    ))}
                                    <div style={{ borderTop: "1px solid #ddd", marginTop: "8px", paddingTop: "8px", fontWeight: "700", display: "flex", justifyContent: "space-between" }}>
                                        <span>Total</span>
                                        <span>${cartTotal.toFixed(2)}</span>
                                    </div>
                                </div>

                                <label style={labelStyle}>Full Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter your name"
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    style={inputStyle}
                                />

                                <label style={labelStyle}>Email Address</label>
                                <input
                                    type="email"
                                    placeholder="Enter your registered email"
                                    value={form.email}
                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                    style={inputStyle}
                                />

                                {error && (
                                    <p style={{ color: "#e74c3c", fontSize: "13px", marginBottom: "12px", background: "#fff0f0", padding: "10px 12px", borderRadius: "8px", border: "1px solid #fcd0d0" }}>
                                        ⚠️ {error}
                                    </p>
                                )}

                                <button onClick={handlePlaceOrder} disabled={loading} style={{ ...primaryBtn, opacity: loading ? 0.7 : 1 }}>
                                    {loading ? "Verifying & Placing Order..." : "✅ Place Order"}
                                </button>
                            </>
                        )}

                        {/* ── STEP 3: SUCCESS ── */}
                        {step === "success" && (
                            <div style={{ textAlign: "center", padding: "20px 0" }}>
                                <div style={{ fontSize: "60px", marginBottom: "12px" }}>🎉</div>
                                <h2 style={{ marginBottom: "10px", color: "#27ae60" }}>Order Placed!</h2>
                                <p style={{ color: "#555", fontSize: "14px", marginBottom: "24px" }}>
                                    Your order has been successfully placed.<br />
                                    You'll receive a confirmation soon.
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

// ─── Shared styles ────────────────────────────────────────────────────────────

const qtyBtn = {
    width: "28px",
    height: "28px",
    border: "1px solid #ddd",
    borderRadius: "6px",
    background: "#f0f0f0",
    cursor: "pointer",
    fontSize: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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

const labelStyle = {
    display: "block",
    fontSize: "13px",
    fontWeight: "600",
    color: "#333",
    marginBottom: "6px",
};

const inputStyle = {
    width: "100%",
    padding: "11px 14px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    fontSize: "14px",
    marginBottom: "14px",
    outline: "none",
};