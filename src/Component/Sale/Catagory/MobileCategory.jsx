import React, { useEffect, useState } from "react";

export default function MobileCategory() {
    const [mobiles, setMobiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // CART STATE
    const [cart, setCart] = useState([]);
    const [showCart, setShowCart] = useState(false);
    const [step, setStep] = useState("cart");

    // FORM STATE
    const [form, setForm] = useState({ name: "", email: "" });
    const [errorMsg, setErrorMsg] = useState("");
    const [loadingOrder, setLoadingOrder] = useState(false);

    // ───────── FETCH PRODUCTS ─────────
    useEffect(() => {
        const fetchMobiles = async () => {
            try {
                setLoading(true);

                const res = await fetch("https://ecommerence-backend-jade.vercel.app/api/Saleprod");
                if (!res.ok) throw new Error("Failed to fetch products");

                const data = await res.json();

                // ONLY MOBILE CATEGORY
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

    // ───────── CART LOGIC (UNCHANGED FUNCTIONALITY) ─────────
    const addToCart = (item) => {
        const productName = item.name || item.title;

        setCart((prev) => {
            const exists = prev.find((x) => x._id === item._id);

            if (exists) {
                return prev.map((x) =>
                    x._id === item._id
                        ? { ...x, qty: x.qty + 1 }
                        : x
                );
            }

            return [
                ...prev,
                {
                    ...item,
                    name: productName, // FIXED SAFETY NAME
                    qty: 1,
                },
            ];
        });

        setShowCart(true);
        setStep("cart");
    };

    const updateQty = (id, delta) => {
        setCart((prev) =>
            prev
                .map((x) =>
                    x._id === id ? { ...x, qty: x.qty + delta } : x
                )
                .filter((x) => x.qty > 0)
        );
    };

    const removeItem = (id) => {
        setCart((prev) => prev.filter((x) => x._id !== id));
    };

    const totalItems = cart.reduce((sum, i) => sum + i.qty, 0);

    const cartTotal = cart.reduce(
        (sum, i) => sum + i.price * i.qty,
        0
    );

    // ───────── ORDER FUNCTION ─────────
    const handlePlaceOrder = async () => {
        setErrorMsg("");
        setLoadingOrder(true);

        try {
            const check = await fetch(
                "https://ecommerence-backend-jade.vercel.app/api/auth/check-email",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email: form.email }),
                }
            );

            const checkData = await check.json();

            if (!checkData.exists) {
                setErrorMsg("Email not registered");
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
                            name: form.name,
                            email: form.email,
                        },
                        cart: cart.map((i) => ({
                            name: i.name || i.title,
                            price: i.price,
                            qty: i.qty,
                        })),
                    }),
                }
            );

            if (!order.ok) throw new Error("Order failed");

            setCart([]);
            setStep("success");
        } catch (err) {
            setErrorMsg("Something went wrong");
        }

        setLoadingOrder(false);
    };

    // ───────── UI STYLES (PRO DESIGN) ─────────
    const styles = {
        page: {
            padding: "30px",
            background: "#f5f7fb",
            minHeight: "100vh",
            fontFamily: "Arial",
        },

        header: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
        },

        title: {
            fontSize: "24px",
            fontWeight: "800",
        },

        grid: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "18px",
        },

        card: {
            background: "#fff",
            // height: "500px",
            borderRadius: "14px",
            overflow: "hidden",
            boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
            transition: "0.3s",
        },

        img: {
            width: "100%",
            height: "400px",
            objectFit: "cover",
        },

        content: {
            padding: "12px",
        },

        name: {
            fontSize: "15px",
            fontWeight: "700",
        },

        desc: {
            fontSize: "12px",
            color: "#666",
            height: "32px",
            overflow: "hidden",
        },

        price: {
            fontSize: "16px",
            fontWeight: "800",
            color: "#1a73e8",
        },

        btn: {
            width: "100%",
            padding: "10px",
            border: "none",
            background: "#111",
            color: "#fff",
            borderRadius: "10px",
            cursor: "pointer",
            marginTop: "10px",
            fontWeight: "600",
        },

        cartBtn: {
            position: "fixed",
            bottom: "20px",
            right: "20px",
            background: "#111",
            color: "#fff",
            padding: "12px 16px",
            borderRadius: "50px",
            border: "none",
            cursor: "pointer",
            fontWeight: "600",
        },

        overlay: {
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            paddingTop: "40px",
            zIndex: 1000,
        },

        modal: {
            background: "#fff",
            width: "460px",
            maxHeight: "85vh",
            overflowY: "auto",
            borderRadius: "16px",
            padding: "20px",
        },
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div style={styles.page}>
            {/* HEADER */}
            <div style={styles.header}>
                <h2 style={styles.title}>📱 Mobile Category</h2>

                <button
                    style={{ ...styles.btn, width: "auto", padding: "10px 16px" }}
                    onClick={() => setShowCart(true)}
                >
                    🛒 Cart ({totalItems})
                </button>
            </div>

            {/* PRODUCTS */}
            <div style={styles.grid}>
                {mobiles.map((m) => (
                    <div
                        key={m._id}
                        style={styles.card}
                        onMouseOver={(e) =>
                            (e.currentTarget.style.transform = "translateY(-6px)")
                        }
                        onMouseOut={(e) =>
                            (e.currentTarget.style.transform = "translateY(0)")
                        }
                    >
                        <img src={m.image} style={styles.img} alt="m" />

                        <div style={styles.content}>
                            <div style={styles.name}>
                                {m.name || m.title}
                            </div>

                            <div style={styles.desc}>
                                {m.description || "Premium mobile device"}
                            </div>

                            <div style={styles.price}>${m.price}</div>

                            <button
                                style={styles.btn}
                                onClick={() => addToCart(m)}
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* FLOAT CART BUTTON */}
            <button
                style={styles.cartBtn}
                onClick={() => setShowCart(true)}
            >
                🛒 {totalItems}
            </button>

            {/* CART MODAL */}
            {showCart && (
                <div style={styles.overlay}>
                    <div style={styles.modal}>
                        <button onClick={() => setShowCart(false)}>✕</button>

                        {/* CART */}
                        {step === "cart" && (
                            <>
                                <h3>Cart</h3>

                                {cart.map((i) => (
                                    <div
                                        key={i._id}
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            padding: "10px 0",
                                            borderBottom: "1px solid #eee",
                                        }}
                                    >
                                        <span>{i.name}</span>

                                        <div>
                                            <button onClick={() => updateQty(i._id, -1)}>
                                                -
                                            </button>
                                            {i.qty}
                                            <button onClick={() => updateQty(i._id, 1)}>
                                                +
                                            </button>
                                        </div>

                                        <button onClick={() => removeItem(i._id)}>
                                            🗑
                                        </button>
                                    </div>
                                ))}

                                <h3>Total: ${cartTotal}</h3>

                                <button style={styles.btn} onClick={() => setStep("form")}>
                                    Checkout
                                </button>
                            </>
                        )}

                        {/* FORM */}
                        {step === "form" && (
                            <>
                                <input
                                    placeholder="Name"
                                    onChange={(e) =>
                                        setForm({ ...form, name: e.target.value })
                                    }
                                />

                                <input
                                    placeholder="Email"
                                    onChange={(e) =>
                                        setForm({ ...form, email: e.target.value })
                                    }
                                />

                                {errorMsg && <p>{errorMsg}</p>}

                                <button
                                    style={styles.btn}
                                    onClick={handlePlaceOrder}
                                >
                                    {loadingOrder
                                        ? "Processing..."
                                        : "Place Order"}
                                </button>
                            </>
                        )}

                        {/* SUCCESS */}
                        {step === "success" && (
                            <h2 style={{ color: "green" }}>
                                🎉 Order Placed Successfully!
                            </h2>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}