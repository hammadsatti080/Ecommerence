import React, { useState, useEffect } from "react";

const brands = [
    "All",
    "iPhone",
    "Samsung",
    "Xiaomi",
    "Oppo",
    "Vivo",
    "Infinix",
];

const protectors = [
    {
        title: "iPhone 15 Pro Glass",
        image:
            "https://aukey.com.pk/cdn/shop/files/fbgd_be77c9aa-3931-459c-b56d-755e31f5a391.jpg?v=1708768914",
        price: "15",
        desc: "9D premium tempered glass.",
        brand: "iPhone",
    },
    {
        title: "iPhone 14 Protector",
        image:
            "https://aukey.com.pk/cdn/shop/files/fbgd_be77c9aa-3931-459c-b56d-755e31f5a391.jpg?v=1708768914",
        price: "12",
        desc: "Scratch resistant protector.",
        brand: "iPhone",
    },
    {
        title: "iPhone 14 Protector",
        image:
            "https://aukey.com.pk/cdn/shop/files/fbgd_be77c9aa-3931-459c-b56d-755e31f5a391.jpg?v=1708768914",
        price: "15",
        desc: "Scratch resistant protector.",
        brand: "iPhone",
    },
    {
        title: "Samsung S24 Ultra Glass",
        image:
            "https://pk-live-21.slatic.net/kf/Sdffedd10d932416089e99e9764fdb1ebk.jpg",
        price: "18",
        desc: "Ultra HD screen protection.",
        brand: "Samsung",
    },
    {
        title: "Samsung A54 Protector",
        image:
            "https://pk-live-21.slatic.net/kf/Sdffedd10d932416089e99e9764fdb1ebk.jpg",
        price: "10",
        desc: "Strong edge-to-edge glass.",
        brand: "Samsung",
    },
    {
        title: "Samsung A54 Protector",
        image:
            "https://pk-live-21.slatic.net/kf/Sdffedd10d932416089e99e9764fdb1ebk.jpg",
        price: "10",
        desc: "Strong edge-to-edge glass.",
        brand: "Samsung",
    }, {
        title: "Samsung A54 Protector",
        image:
            "https://pk-live-21.slatic.net/kf/Sdffedd10d932416089e99e9764fdb1ebk.jpg",
        price: "10",
        desc: "Strong edge-to-edge glass.",
        brand: "Samsung",
    },
    {
        title: "Xiaomi Redmi Glass",
        image:
            "https://images-na.ssl-images-amazon.com/images/I/61CUgPAW5xL._SS400_.jpg",
        price: "8",
        desc: "Premium Xiaomi protection.",
        brand: "Xiaomi",
    },
    {
        title: "Xiaomi Redmi Glass",
        image:
            "https://images-na.ssl-images-amazon.com/images/I/61CUgPAW5xL._SS400_.jpg",
        price: "8",
        desc: "Premium Xiaomi protection.",
        brand: "Xiaomi",
    }, {
        title: "Xiaomi Redmi Glass",
        image:
            "https://images-na.ssl-images-amazon.com/images/I/61CUgPAW5xL._SS400_.jpg",
        price: "8",
        desc: "Premium Xiaomi protection.",
        brand: "Xiaomi",
    },
    {
        title: "Xiaomi Redmi Glass",
        image:
            "https://images-na.ssl-images-amazon.com/images/I/61CUgPAW5xL._SS400_.jpg",
        price: "8",
        desc: "Premium Xiaomi protection.",
        brand: "Xiaomi",
    }, {
        title: "Oppo Reno Protector",
        image:
            "https://www.clair.pk/cdn/shop/products/0---3_ef625566-1162-47c9-b7ea-f89eeabd7c3f.jpg?v=1704397850",
        price: "11",
        desc: "Crystal clear tempered glass.",
        brand: "Oppo",
    }, {
        title: "Oppo Reno Protector",
        image:
            "https://www.clair.pk/cdn/shop/products/0---3_ef625566-1162-47c9-b7ea-f89eeabd7c3f.jpg?v=1704397850",
        price: "11",
        desc: "Crystal clear tempered glass.",
        brand: "Oppo",
    },
    {
        title: "Oppo Reno Protector",
        image:
            "https://www.clair.pk/cdn/shop/products/0---3_ef625566-1162-47c9-b7ea-f89eeabd7c3f.jpg?v=1704397850",
        price: "11",
        desc: "Crystal clear tempered glass.",
        brand: "Oppo",
    }, {
        title: "Oppo Reno Protector",
        image:
            "https://www.clair.pk/cdn/shop/products/0---3_ef625566-1162-47c9-b7ea-f89eeabd7c3f.jpg?v=1704397850",
        price: "11",
        desc: "Crystal clear tempered glass.",
        brand: "Oppo",
    },
    {
        title: "Vivo V30 Glass",
        image:
            "https://www.clair.pk/cdn/shop/products/0--1.png?v=1704401907&width=1445",
        price: "9",
        desc: "Shockproof screen protector.",
        brand: "Vivo",
    },
    {
        title: "Infinix Hot 40 Glass",
        image:
            "https://www.clair.pk/cdn/shop/products/0---3_ef625566-1162-47c9-b7ea-f89eeabd7c3f.jpg?v=1704397850",
        price: "7",
        desc: "Affordable tempered protection.",
        brand: "Infinix",
    }, {
        title: "Vivo V30 Glass",
        image:
            "https://www.clair.pk/cdn/shop/products/0--1.png?v=1704401907&width=1445",
        price: "9",
        desc: "Shockproof screen protector.",
        brand: "Vivo",
    },
    {
        title: "Infinix Hot 40 Glass",
        image:
            "https://www.clair.pk/cdn/shop/products/0---3_ef625566-1162-47c9-b7ea-f89eeabd7c3f.jpg?v=1704397850",
        price: "7",
        desc: "Affordable tempered protection.",
        brand: "Infinix",
    }, {
        title: "Vivo V30 Glass",
        image:
            "https://www.clair.pk/cdn/shop/products/0--1.png?v=1704401907&width=1445",
        price: "9",
        desc: "Shockproof screen protector.",
        brand: "Vivo",
    },
    {
        title: "Infinix Hot 40 Glass",
        image:
            "https://www.clair.pk/cdn/shop/products/0---3_ef625566-1162-47c9-b7ea-f89eeabd7c3f.jpg?v=1704397850",
        price: "7",
        desc: "Affordable tempered protection.",
        brand: "Infinix",
    }, {
        title: "Vivo V30 Glass",
        image:
            "https://www.clair.pk/cdn/shop/products/0--1.png?v=1704401907&width=1445",
        price: "9",
        desc: "Shockproof screen protector.",
        brand: "Vivo",
    },
    {
        title: "Infinix Hot 40 Glass",
        image:
            "https://www.clair.pk/cdn/shop/products/0---3_ef625566-1162-47c9-b7ea-f89eeabd7c3f.jpg?v=1704397850",
        price: "7",
        desc: "Affordable tempered protection.",
        brand: "Infinix",
    },
];

export default function Screenprotector() {

    const [isMobile, setIsMobile] = useState(
        window.innerWidth <= 768
    );

    // Cart State

    const [cart, setCart] = useState([]);
    const [showCart, setShowCart] = useState(false);
    const [step, setStep] = useState("cart");

    // Filter State

    const [selectedBrand, setSelectedBrand] =
        useState("All");

    // Checkout Form

    const [form, setForm] = useState({
        name: "",
        email: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // Filter Products

    const filteredProtectors =
        selectedBrand === "All"
            ? protectors
            : protectors.filter(
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

    // ─── CART FUNCTIONS ─────────────────────────────

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

    const updateQty = (title, delta) => {

        setCart((prev) =>
            prev
                .map((x) =>
                    x.title === title
                        ? {
                            ...x,
                            qty: x.qty + delta,
                        }
                        : x
                )
                .filter((x) => x.qty > 0)
        );
    };

    const removeItem = (title) => {

        setCart((prev) =>
            prev.filter(
                (x) => x.title !== title
            )
        );
    };

    const totalItems = cart.reduce(
        (sum, item) => sum + item.qty,
        0
    );

    const cartTotal = cart.reduce(
        (sum, item) =>
            sum +
            parseFloat(item.price) * item.qty,
        0
    );

    // ─── CHECKOUT ──────────────────────────────────

    const goToForm = () => {

        if (cart.length === 0) return;

        setStep("form");
        setError("");
    };

    const handlePlaceOrder = async () => {

        setError("");

        if (!form.name.trim()) {
            setError(
                "Please enter your name."
            );
            return;
        }

        if (!form.email.trim()) {
            setError(
                "Please enter your email."
            );
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
                    "This email is not registered."
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

                const errData =
                    await orderRes.json();

                setError(
                    errData.message ||
                    "Failed to place order."
                );

                setLoading(false);
                return;
            }

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

    // ─── MODAL STYLES ──────────────────────────────

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
                padding: isMobile
                    ? "15px"
                    : "30px",

                background: "#f7f5f2",
                minHeight: "100vh",
                fontFamily: "Segoe UI",
            }}
        >

            {/* TOP BAR */}

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

                    <h1
                        style={{
                            fontSize: isMobile
                                ? "28px"
                                : "38px",

                            marginBottom: "6px",
                        }}
                    >
                        Screen Protectors
                    </h1>

                    <p
                        style={{
                            color: "#666",
                            fontSize: "14px",
                        }}
                    >
                        Premium tempered glass &
                        mobile screen protectors.
                    </p>
                </div>

                {/* CART */}

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
                                background:
                                    "#c9a96e",

                                color: "#000",

                                width: "22px",
                                height: "22px",

                                borderRadius:
                                    "50%",

                                fontSize: "11px",

                                fontWeight: "700",

                                display: "flex",

                                alignItems:
                                    "center",

                                justifyContent:
                                    "center",
                            }}
                        >
                            {totalItems}
                        </span>
                    )}
                </button>
            </div>

            {/* BRAND FILTER */}

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

                        onClick={() =>
                            setSelectedBrand(
                                brand
                            )
                        }

                        style={{
                            padding: "8px 16px",

                            border:
                                selectedBrand === brand
                                    ? "2px solid #111"
                                    : "1px solid #ddd",

                            background:
                                selectedBrand === brand
                                    ? "#111"
                                    : "#fff",

                            color:
                                selectedBrand === brand
                                    ? "#fff"
                                    : "#111",

                            borderRadius: "30px",

                            cursor: "pointer",

                            fontSize: "13px",

                            fontWeight: "600",
                        }}
                    >
                        {brand}
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

                {filteredProtectors.map(
                    (item, index) => (

                        <div
                            key={index}

                            style={{
                                background: "#fff",

                                borderRadius:
                                    "14px",

                                overflow:
                                    "hidden",

                                boxShadow:
                                    "0 4px 12px rgba(0,0,0,0.08)",
                            }}
                        >

                            <img
                                src={item.image}
                                alt={item.title}

                                style={{
                                    width: "100%",
                                    height:
                                        isMobile
                                            ? "190px"
                                            : "280px",

                                    objectFit:
                                        "cover",
                                }}
                            />

                            <div
                                style={{
                                    padding: "14px",
                                }}
                            >

                                <h3
                                    style={{
                                        fontSize:
                                            "16px",

                                        marginBottom:
                                            "6px",
                                    }}
                                >
                                    {item.title}
                                </h3>

                                <p
                                    style={{
                                        color: "#666",

                                        fontSize:
                                            "13px",

                                        marginBottom:
                                            "10px",
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

                                        marginBottom:
                                            "12px",

                                        color:
                                            "#666",

                                        fontSize:
                                            "13px",
                                    }}
                                >
                                    <span>
                                        {item.brand}
                                    </span>
                                </div>

                                <div
                                    style={{
                                        display:
                                            "flex",

                                        justifyContent:
                                            "space-between",

                                        alignItems:
                                            "center",
                                    }}
                                >

                                    <strong
                                        style={{
                                            color:
                                                "#c9a96e",

                                            fontSize:
                                                "17px",
                                        }}
                                    >

                                        {item.price}
                                    </strong>

                                    <button
                                        onClick={() =>
                                            addToCart(
                                                item
                                            )
                                        }

                                        style={{
                                            border:
                                                "none",

                                            background:
                                                "#111",

                                            color:
                                                "#fff",

                                            padding:
                                                "8px 14px",

                                            borderRadius:
                                                "8px",

                                            cursor:
                                                "pointer",

                                            fontSize:
                                                "12px",

                                            fontWeight:
                                                "600",
                                        }}
                                    >
                                        + Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                )}
            </div>

            {/* CART MODAL */}

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

                                top: "14px",
                                right: "16px",

                                border: "none",

                                background:
                                    "none",

                                cursor: "pointer",

                                fontSize: "22px",
                            }}
                        >
                            ✕
                        </button>

                        {/* CART */}

                        {step === "cart" && (

                            <>
                                <h2
                                    style={{
                                        marginBottom:
                                            "20px",
                                    }}
                                >
                                    🛒 Your Cart
                                </h2>

                                {cart.length === 0 ? (

                                    <p
                                        style={{
                                            textAlign:
                                                "center",

                                            color:
                                                "#888",
                                        }}
                                    >
                                        Your cart is
                                        empty.
                                    </p>

                                ) : (

                                    <>
                                        {cart.map(
                                            (
                                                item,
                                                idx
                                            ) => (

                                                <div
                                                    key={
                                                        idx
                                                    }

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
                                                            }
                                                        </p>
                                                    </div>

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

                                            <span>
                                                Total
                                            </span>

                                            <span>

                                                {cartTotal.toFixed(
                                                    2
                                                )}
                                            </span>
                                        </div>

                                        <button
                                            onClick={
                                                goToForm
                                            }

                                            style={
                                                primaryBtn
                                            }
                                        >
                                            Proceed to
                                            Payment →
                                        </button>
                                    </>
                                )}
                            </>
                        )}

                        {/* CHECKOUT */}

                        {step === "form" && (

                            <>
                                <button
                                    onClick={() =>
                                        setStep(
                                            "cart"
                                        )
                                    }

                                    style={{
                                        border:
                                            "none",

                                        background:
                                            "none",

                                        color:
                                            "#c9a96e",

                                        cursor:
                                            "pointer",

                                        marginBottom:
                                            "16px",
                                    }}
                                >
                                    ← Back
                                </button>

                                <h2>
                                    📋 Checkout
                                </h2>

                                <input
                                    type="text"

                                    placeholder="Full Name"

                                    value={form.name}

                                    onChange={(e) =>
                                        setForm({
                                            ...form,

                                            name:
                                                e
                                                    .target
                                                    .value,
                                        })
                                    }

                                    style={
                                        inputStyle
                                    }
                                />

                                <input
                                    type="email"

                                    placeholder="Registered Email"

                                    value={
                                        form.email
                                    }

                                    onChange={(e) =>
                                        setForm({
                                            ...form,

                                            email:
                                                e
                                                    .target
                                                    .value,
                                        })
                                    }

                                    style={
                                        inputStyle
                                    }
                                />

                                {error && (

                                    <p
                                        style={{
                                            color:
                                                "#e74c3c",

                                            fontSize:
                                                "13px",
                                        }}
                                    >
                                        ⚠️ {error}
                                    </p>
                                )}

                                <button
                                    onClick={
                                        handlePlaceOrder
                                    }

                                    disabled={
                                        loading
                                    }

                                    style={
                                        primaryBtn
                                    }
                                >
                                    {loading
                                        ? "Processing..."
                                        : "✅ Place Order"}
                                </button>
                            </>
                        )}

                        {/* SUCCESS */}

                        {step === "success" && (

                            <div
                                style={{
                                    textAlign:
                                        "center",

                                    padding:
                                        "20px 0",
                                }}
                            >

                                <div
                                    style={{
                                        fontSize:
                                            "60px",

                                        marginBottom:
                                            "12px",
                                    }}
                                >
                                    🎉
                                </div>

                                <h2
                                    style={{
                                        color:
                                            "#27ae60",
                                    }}
                                >
                                    Order Placed!
                                </h2>

                                <p
                                    style={{
                                        color:
                                            "#666",

                                        marginTop:
                                            "10px",
                                    }}
                                >
                                    Your order has
                                    been placed
                                    successfully.
                                </p>

                                <button
                                    onClick={
                                        closeModal
                                    }

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

// ─── SHARED STYLES ─────────────────────────────────

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