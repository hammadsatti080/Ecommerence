import React, { useState, useEffect } from "react";

const colors = ["All", "Black", "White", "Red", "Blue", "Lightbrown", "Brown"];
const hoodies = [
    {
        title: "Winter Hoodie",
        image: "https://www.hushpuppies.com.pk/cdn/shop/files/0033copy.jpg?v=1767688510&width=2048",
        price: "39",
        desc: "Soft fleece warm hoodie.",
        color: "Lightbrown",
    },
    {
        title: "Zip Hoodie",
        image: "https://www.hushpuppies.com.pk/cdn/shop/files/0033copy.jpg?v=1767688510&width=2048",
        price: "42",
        desc: "Stylish zip-up hoodie.",
        color: "Lightbrown",
    },
    {
        title: "Streetwear Hoodie",
        image: "https://m.media-amazon.com/images/I/41e41ycdjNL._AC_SR70_.jpg",
        price: "48",
        desc: "Premium oversized hoodie.",
        color: "Black",
    },
    {
        title: "Streetwear Hoodie",
        image: "https://m.media-amazon.com/images/I/41e41ycdjNL._AC_SR70_.jpg",
        price: "28",
        desc: "Premium oversized hoodie.",
        color: "Black",
    },
    {
        title: "Streetwear Hoodie",
        image: "https://m.media-amazon.com/images/I/41e41ycdjNL._AC_SR70_.jpg",
        price: "18",
        desc: "Premium oversized hoodie.",
        color: "Black",
    },
    {
        title: "Classic Black Hoodie",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR71mznfVIOjCec7yCBHpCvi55l5njDh0ptVA&s",
        price: "45",
        desc: "Simple and elegant black hoodie.",
        color: "Brown",
    },
    {
        title: "Classic Black Hoodie",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR71mznfVIOjCec7yCBHpCvi55l5njDh0ptVA&s",
        price: "25",
        desc: "Simple and elegant black hoodie.",
        color: "Brown",
    },
    {
        title: "Classic Black Hoodie",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR71mznfVIOjCec7yCBHpCvi55l5njDh0ptVA&s",
        price: "15",
        desc: "Simple and elegant black hoodie.",
        color: "Brown",
    },
    {
        title: "Classic Black Hoodie",
        image: "https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/F70391s.jpg?im=Resize,width=750",
        price: "45",
        desc: "Simple and elegant black hoodie.",
        color: "Red",
    },
    {
        title: "Classic Black Hoodie",
        image: "https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/F70391s.jpg?im=Resize,width=750",
        price: "35",
        desc: "Simple and elegant black hoodie.",
        color: "Red",
    },
    {
        title: "Classic Black Hoodie",
        image: "https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/F70391s.jpg?im=Resize,width=750",
        price: "45",
        desc: "Simple and elegant black hoodie.",
        color: "Red",
    },
    {
        title: "Classic Black Hoodie",
        image: "https://hbindustries.pk/cdn/shop/files/36-3_ca2b4f65-8294-4432-bbcb-df4f55e7d78d.jpg?v=1757532437&width=1024",
        price: "45",
        desc: "Simple and elegant black hoodie.",
        color: "White",
    },
    {
        title: "Classic Black Hoodie",
        image: "https://hbindustries.pk/cdn/shop/files/36-3_ca2b4f65-8294-4432-bbcb-df4f55e7d78d.jpg?v=1757532437&width=1024",
        price: "55",
        desc: "Simple and elegant black hoodie.",
        color: "White",
    },
    {
        title: "Classic Black Hoodie",
        image: "https://hbindustries.pk/cdn/shop/files/36-3_ca2b4f65-8294-4432-bbcb-df4f55e7d78d.jpg?v=1757532437&width=1024",
        price: "15",
        desc: "Simple and elegant black hoodie.",
        color: "White",
    },
];

export default function Hoddies() {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    // Cart State
    const [cart, setCart] = useState([]);
    const [showCart, setShowCart] = useState(false);
    const [step, setStep] = useState("cart");

    // Checkout Form
    const [form, setForm] = useState({
        name: "",
        email: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    // ─── Add this state inside component ─────────────────────

    const [selectedColor, setSelectedColor] = useState("All");
    // ─── Add filtered hoodies before return ──────────────────

    const filteredHoodies =
        selectedColor === "All"
            ? hoodies
            : hoodies.filter(
                (item) => item.color === selectedColor
            );
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // ─── Cart Functions ─────────────────────────────────────

    const addToCart = (item) => {
        setCart((prev) => {
            const exists = prev.find((x) => x.title === item.title);

            if (exists) {
                return prev.map((x) =>
                    x.title === item.title
                        ? { ...x, qty: x.qty + 1 }
                        : x
                );
            }

            return [...prev, { ...item, qty: 1 }];
        });

        setShowCart(true);
        setStep("cart");
    };

    const updateQty = (title, delta) => {
        setCart((prev) =>
            prev
                .map((x) =>
                    x.title === title
                        ? { ...x, qty: x.qty + delta }
                        : x
                )
                .filter((x) => x.qty > 0)
        );
    };

    const removeItem = (title) => {
        setCart((prev) =>
            prev.filter((x) => x.title !== title)
        );
    };

    const totalItems = cart.reduce(
        (sum, item) => sum + item.qty,
        0
    );

    const cartTotal = cart.reduce(
        (sum, item) =>
            sum +
            parseFloat(item.price.replace("$", "")) *
            item.qty,
        0
    );

    // ─── Checkout ───────────────────────────────────────────

    const goToForm = () => {
        if (cart.length === 0) return;

        setStep("form");
        setError("");
    };

    const handlePlaceOrder = async () => {
        setError("");

        if (!form.name.trim()) {
            setError("Please enter your name.");
            return;
        }

        if (!form.email.trim()) {
            setError("Please enter your email.");
            return;
        }

        setLoading(true);

        try {
            // Check Email
            const checkRes = await fetch(
                "https://ecommerence-backend-jade.vercel.app/api/auth/check-email",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: form.email.trim(),
                    }),
                }
            );

            const checkData = await checkRes.json();

            if (!checkData.exists) {
                setError(
                    "This email is not registered. Please sign up first."
                );

                setLoading(false);
                return;
            }

            // Place Order
            const orderRes = await fetch(
                "https://ecommerence-backend-jade.vercel.app/api/orders",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        user: {
                            name: form.name.trim(),
                            email: form.email
                                .trim()
                                .toLowerCase(),
                        },

                        cart: cart.map((item) => ({
                            name: item.title,
                            price: parseFloat(
                                item.price.replace("$", "")
                            ),
                            qty: item.qty,
                        })),
                    }),
                }
            );

            if (!orderRes.ok) {
                const errData = await orderRes.json();

                setError(
                    errData.message ||
                    "Failed to place order."
                );

                setLoading(false);
                return;
            }

            // Success
            setCart([]);
            setStep("success");
        } catch (err) {
            setError(
                "Network error. Please check your connection."
            );
        }

        setLoading(false);
    };

    const closeModal = () => {
        setShowCart(false);
        setStep("cart");
        setError("");
    };

    // ─── Styles ─────────────────────────────────────────────

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
            {/* ─── Top Bar ───────────────────────── */}

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
                        }}
                    >
                        Hoodies Collection
                    </h1>

                    <p
                        style={{
                            color: "#666",
                            fontSize: "14px",
                        }}
                    >
                        Premium hoodies for winter & streetwear fashion.
                    </p>
                </div>


                {/* Cart Button */}

                <button
                    onClick={() => {
                        setShowCart(true);
                        setStep("cart");
                    }}
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



            <div
                style={{
                    display: "flex",
                    gap: "10px",
                    flexWrap: "wrap",
                    marginBottom: "25px",
                }}
            >
                {colors.map((color, index) => (
                    <button
                        key={index}
                        onClick={() => setSelectedColor(color)}
                        style={{
                            padding: "8px 16px",
                            border:
                                selectedColor === color
                                    ? "2px solid #111"
                                    : "1px solid #ddd",
                            background:
                                selectedColor === color
                                    ? "#111"
                                    : "#fff",
                            color:
                                selectedColor === color
                                    ? "#fff"
                                    : "#111",
                            borderRadius: "30px",
                            cursor: "pointer",
                            fontSize: "13px",
                            fontWeight: "600",
                            transition: "0.3s",
                        }}
                    >
                        {color}
                    </button>
                ))}
            </div>
            {/* ─── Hoodies Cards ─────────────────── */}

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: isMobile
                        ? "repeat(2, 1fr)"
                        : "repeat(auto-fit, minmax(240px, 1fr))",
                    gap: "18px",
                }}
            >
                {filteredHoodies.map((item, index) => (
                    <div
                        key={index}
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
                            alt={item.title}
                            style={{
                                width: "100%",
                                height: isMobile
                                    ? "190px"
                                    : "280px",
                                objectFit: "cover",
                            }}
                        />

                        <div style={{ padding: "14px" }}>
                            <h3
                                style={{
                                    fontSize: "16px",
                                    marginBottom: "6px",
                                }}
                            >
                                {item.title}
                            </h3>

                            <p
                                style={{
                                    color: "#666",
                                    fontSize: "13px",
                                    marginBottom: "12px",
                                }}
                            >
                                {item.desc}
                            </p>

                            <div
                                style={{
                                    display: "flex",
                                    justifyContent:
                                        "space-between",
                                    alignItems: "center",
                                }}
                            >
                                <strong
                                    style={{
                                        color: "#c9a96e",
                                        fontSize: "17px",
                                    }}
                                >
                                    {item.price}
                                </strong>

                                <button
                                    onClick={() =>
                                        addToCart(item)
                                    }
                                    style={{
                                        border: "none",
                                        background: "#111",
                                        color: "#fff",
                                        padding: "8px 14px",
                                        borderRadius: "8px",
                                        cursor: "pointer",
                                        fontSize: "12px",
                                        fontWeight: "600",
                                    }}
                                >
                                    + Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* ─── CART MODAL ────────────────────── */}

            {showCart && (
                <div
                    style={overlay}
                    onClick={(e) =>
                        e.target === e.currentTarget &&
                        closeModal()
                    }
                >
                    <div style={modal}>
                        {/* Close */}

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
                                <h2
                                    style={{
                                        marginBottom: "20px",
                                    }}
                                >
                                    🛒 Your Cart
                                </h2>

                                {cart.length === 0 ? (
                                    <p
                                        style={{
                                            textAlign: "center",
                                            color: "#888",
                                        }}
                                    >
                                        Your cart is empty.
                                    </p>
                                ) : (
                                    <>
                                        {cart.map(
                                            (item, idx) => (
                                                <div
                                                    key={idx}
                                                    style={{
                                                        display:
                                                            "flex",
                                                        alignItems:
                                                            "center",
                                                        gap: "12px",
                                                        padding:
                                                            "12px 0",
                                                        borderBottom:
                                                            "1px solid #eee",
                                                    }}
                                                >
                                                    <img
                                                        src={
                                                            item.image
                                                        }
                                                        alt={
                                                            item.title
                                                        }
                                                        style={{
                                                            width:
                                                                "65px",
                                                            height:
                                                                "65px",
                                                            borderRadius:
                                                                "8px",
                                                            objectFit:
                                                                "cover",
                                                        }}
                                                    />

                                                    <div
                                                        style={{
                                                            flex: 1,
                                                        }}
                                                    >
                                                        <p
                                                            style={{
                                                                fontWeight:
                                                                    "600",
                                                            }}
                                                        >
                                                            {
                                                                item.title
                                                            }
                                                        </p>

                                                        <p
                                                            style={{
                                                                fontSize:
                                                                    "12px",
                                                                color:
                                                                    "#777",
                                                            }}
                                                        >
                                                            {
                                                                item.price
                                                            }{" "}
                                                            each
                                                        </p>
                                                    </div>

                                                    {/* Qty */}

                                                    <div
                                                        style={{
                                                            display:
                                                                "flex",
                                                            alignItems:
                                                                "center",
                                                            gap: "6px",
                                                        }}
                                                    >
                                                        <button
                                                            onClick={() =>
                                                                updateQty(
                                                                    item.title,
                                                                    -1
                                                                )
                                                            }
                                                            style={
                                                                qtyBtn
                                                            }
                                                        >
                                                            −
                                                        </button>

                                                        <span>
                                                            {
                                                                item.qty
                                                            }
                                                        </span>

                                                        <button
                                                            onClick={() =>
                                                                updateQty(
                                                                    item.title,
                                                                    1
                                                                )
                                                            }
                                                            style={
                                                                qtyBtn
                                                            }
                                                        >
                                                            +
                                                        </button>
                                                    </div>

                                                    <button
                                                        onClick={() =>
                                                            removeItem(
                                                                item.title
                                                            )
                                                        }
                                                        style={{
                                                            border:
                                                                "none",
                                                            background:
                                                                "none",
                                                            color:
                                                                "#e74c3c",
                                                            cursor:
                                                                "pointer",
                                                            fontSize:
                                                                "16px",
                                                        }}
                                                    >
                                                        🗑
                                                    </button>
                                                </div>
                                            )
                                        )}

                                        {/* Total */}

                                        <div
                                            style={{
                                                display:
                                                    "flex",
                                                justifyContent:
                                                    "space-between",
                                                marginTop:
                                                    "18px",
                                                fontWeight:
                                                    "700",
                                                fontSize:
                                                    "17px",
                                            }}
                                        >
                                            <span>Total</span>

                                            <span>
                                                $
                                                {cartTotal.toFixed(
                                                    2
                                                )}
                                            </span>
                                        </div>

                                        <button
                                            onClick={goToForm}
                                            style={
                                                primaryBtn
                                            }
                                        >
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
                                    onClick={() =>
                                        setStep("cart")
                                    }
                                    style={{
                                        border: "none",
                                        background: "none",
                                        color: "#c9a96e",
                                        cursor: "pointer",
                                        marginBottom:
                                            "16px",
                                    }}
                                >
                                    ← Back
                                </button>

                                <h2>📋 Checkout</h2>

                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    value={form.name}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            name: e.target.value,
                                        })
                                    }
                                    style={inputStyle}
                                />

                                <input
                                    type="email"
                                    placeholder="Registered Email"
                                    value={form.email}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            email:
                                                e.target.value,
                                        })
                                    }
                                    style={inputStyle}
                                />

                                {error && (
                                    <p
                                        style={{
                                            color: "#e74c3c",
                                            fontSize: "13px",
                                        }}
                                    >
                                        ⚠️ {error}
                                    </p>
                                )}

                                <button
                                    onClick={
                                        handlePlaceOrder
                                    }
                                    disabled={loading}
                                    style={primaryBtn}
                                >
                                    {loading
                                        ? "Processing..."
                                        : "✅ Place Order"}
                                </button>
                            </>
                        )}

                        {/* SUCCESS STEP */}

                        {step === "success" && (
                            <div
                                style={{
                                    textAlign: "center",
                                    padding: "20px 0",
                                }}
                            >
                                <div
                                    style={{
                                        fontSize: "60px",
                                        marginBottom: "12px",
                                    }}
                                >
                                    🎉
                                </div>

                                <h2
                                    style={{
                                        color: "#27ae60",
                                    }}
                                >
                                    Order Placed!
                                </h2>

                                <p
                                    style={{
                                        color: "#666",
                                        marginTop: "10px",
                                    }}
                                >
                                    Your hoodie order has
                                    been placed successfully.
                                </p>

                                <button
                                    onClick={closeModal}
                                    style={{
                                        ...primaryBtn,
                                        background:
                                            "#27ae60",
                                    }}
                                >
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

// ─── Shared Styles ─────────────────────────────────

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