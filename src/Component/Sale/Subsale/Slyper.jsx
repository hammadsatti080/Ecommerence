import React, { useState, useEffect } from "react";

const slippers = {
  Nike: {
    title: "Nike Comfort Slippers",
    image: "/Homescreen/Sale/slper.webp",
    price: "450",
    oldPrice: "600",
    save: "Save 25%",
    description: "Premium Nike slippers designed for daily comfort, lightweight feel, and soft cushioning.",
    reviews: [
      { text: "Very comfortable and soft.", avatar: "AK" },
      { text: "Perfect for daily use.", avatar: "RS" },
      { text: "Great quality build.", avatar: "MN" },
    ],
  },
  Adidas: {
    title: "Adidas Cloud Slippers",
    image: "/Homescreen/Sale/slper1.webp",
    price: "400",
    oldPrice: "550",
    save: "Save 27%",
    description: "Adidas ultra-soft slippers with modern design and anti-slip sole.",
    reviews: [
      { text: "Super light and comfy.", avatar: "AB" },
      { text: "Good grip and design.", avatar: "KD" },
      { text: "Worth the price.", avatar: "LM" },
    ],
  },
  Gucci: {
    title: "Gucci Luxury Slippers",
    image: "/Homescreen/Sale/gucc.jpg",
    price: "1200",
    oldPrice: "1500",
    save: "Save 20%",
    description: "Luxury Gucci slippers with premium leather finish and stylish designer look.",
    reviews: [
      { text: "Very premium feel.", avatar: "GT" },
      { text: "Luxury design is amazing.", avatar: "PR" },
      { text: "Super stylish.", avatar: "JK" },
    ],
  },
  Puma: {
    title: "Puma Sport Slippers",
    image: "/Homescreen/Sale/puma.avif",
    price: "3500",
    oldPrice: "5000",
    save: "Save 30%",
    description: "Sporty Puma slippers designed for gym, home, and outdoor comfort.",
    reviews: [
      { text: "Best for gym use.", avatar: "PM" },
      { text: "Very comfortable.", avatar: "RT" },
      { text: "Nice grip.", avatar: "SN" },
    ],
  },
  Bata: {
    title: "Bata Everyday Slippers",
    image: "/Homescreen/Sale/bata.webp",
    price: "2000",
    oldPrice: "2800",
    save: "Save 28%",
    description: "Affordable Bata slippers for everyday use with soft sole and durable build.",
    reviews: [
      { text: "Budget friendly.", avatar: "BT" },
      { text: "Very durable.", avatar: "HN" },
      { text: "Good for daily wear.", avatar: "AL" },
    ],
  },
};

const CartIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 001.98 1.61h9.72a2 2 0 001.98-1.61L23 6H6" />
  </svg>
);

export default function Slyper() {
  const [selected, setSelected] = useState("Nike");
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

  const item = slippers[selected];

  // ─── Cart helpers ────────────────────────────────────────────────────────────

  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((x) => x.title === product.title);
      if (exists)
        return prev.map((x) =>
          x.title === product.title ? { ...x, qty: x.qty + 1 } : x
        );
      return [...prev, { ...product, qty: 1 }];
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
    (sum, i) => sum + parseFloat(i.price.replace("$", "")) * i.qty,
    0
  );

  const totalItems = cart.reduce((sum, i) => sum + i.qty, 0);

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
          cart: cart.map((i) => ({
            name: i.title,
            price: parseFloat(i.price.replace("$", "")),
            qty: i.qty,
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
        background: "#f5f5f5",
        fontFamily: "Segoe UI",
      }}
    >
      {/* ── SIDEBAR ── */}
      <aside style={{ width: isMobile ? "100%" : "15%", background: "#111", padding: "20px" }}>
        <h2 style={{ color: "#d4af37", textAlign: "center", marginBottom: "20px" }}>SLIPPERS</h2>

        <div style={{ display: "flex", flexDirection: isMobile ? "row" : "column", gap: "10px", overflowX: "auto" }}>
          {Object.keys(slippers).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelected(cat)}
              style={{
                background: selected === cat ? "#d4af37" : "#222",
                color: selected === cat ? "#111" : "#fff",
                border: "none",
                padding: "12px",
                borderRadius: "10px",
                minWidth: "100px",
                cursor: "pointer",
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </aside>

      {/* ── MAIN ── */}
      <main style={{ flex: 1, padding: isMobile ? "15px" : "30px" }}>

        {/* Cart button top-right */}
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "16px" }}>
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
                  background: "#d4af37",
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

        {/* Product detail card */}
        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: "25px",
            background: "#fff",
            borderRadius: "20px",
            padding: "20px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          }}
        >
          {/* IMAGE */}
          <div style={{ width: isMobile ? "100%" : "40%" }}>
            <img
              src={item.image}
              alt={item.title}
              style={{ width: "100%", borderRadius: "16px", objectFit: "cover" }}
            />
          </div>

          {/* INFO */}
          <div style={{ width: isMobile ? "100%" : "60%" }}>
            <h1 style={{ fontSize: "30px", marginBottom: "10px" }}>{item.title}</h1>

            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <span style={{ fontSize: "28px" }}>{item.price}</span>
              <span style={{ textDecoration: "line-through", color: "#888" }}>{item.oldPrice}</span>
              <span style={{ color: "green" }}>{item.save}</span>
            </div>

            <p style={{ margin: "15px 0", color: "#444" }}>{item.description}</p>

            {/* Reviews */}
            <div>
              {item.reviews.map((r, i) => (
                <div key={i} style={{ marginBottom: "10px" }}>
                  <strong>{r.avatar}</strong> {r.text}
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
              {/* Buy Now — adds 1 and opens cart */}
              <button
                onClick={() => addToCart(item)}
                style={{
                  background: "#111",
                  color: "#fff",
                  padding: "12px",
                  flex: 1,
                  borderRadius: "10px",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >
                <CartIcon /> Buy Now
              </button>

              {/* Add to Cart — adds silently */}
              <button
                onClick={() => {
                  setCart((prev) => {
                    const exists = prev.find((x) => x.title === item.title);
                    if (exists)
                      return prev.map((x) =>
                        x.title === item.title ? { ...x, qty: x.qty + 1 } : x
                      );
                    return [...prev, { ...item, qty: 1 }];
                  });
                }}
                style={{
                  border: "2px solid #111",
                  background: "#fff",
                  padding: "12px",
                  flex: 1,
                  borderRadius: "10px",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >
                + Add To Cart
              </button>
            </div>
          </div>
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
                          ${(parseFloat(cartItem.price.replace("$", "")) * cartItem.qty).toFixed(0)}
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
                  style={{ background: "none", border: "none", color: "#d4af37", cursor: "pointer", fontSize: "13px", marginBottom: "12px", padding: 0 }}
                >
                  ← Back to Cart
                </button>

                <h2 style={{ marginBottom: "6px", fontSize: "20px" }}>📋 Checkout</h2>
                <p style={{ color: "#888", fontSize: "13px", marginBottom: "20px" }}>Enter your details to place the order.</p>

                {/* Order summary */}
                <div style={{ background: "#f5f5f5", borderRadius: "10px", padding: "12px", marginBottom: "20px", fontSize: "13px" }}>
                  {cart.map((cartItem, i) => (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                      <span>{cartItem.title} × {cartItem.qty}</span>
                      <span>${(parseFloat(cartItem.price.replace("$", "")) * cartItem.qty).toFixed(0)}</span>
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