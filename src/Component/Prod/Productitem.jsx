/*
Backup data are in Backupproduct.jsx file
*/



import React, { useEffect, useState } from "react";

export default function Productitem() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [showCart, setShowCart] = useState(false);
  const [cart, setCart] = useState([]);



  const [showUserForm, setShowUserForm] = useState(false);

  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    address: "",
    phone: ""
  });

  const API = "https://ecommerence-backend-jade.vercel.app/api/products";
  const CAT_API = "https://ecommerence-backend-jade.vercel.app/api/categories";

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    const res = await fetch(API);
    const data = await res.json();
    setProducts(data);
  };

  const fetchCategories = async () => {
    const res = await fetch(CAT_API);
    const data = await res.json();
    setCategories(data);
  };

  const getFinalPrice = (price, discount) => {
    const p = Number(price);
    const d = Number(discount || 0);
    return (p - (p * d) / 100).toFixed(2);
  };

  // ================= CART =================
  const addToCart = (product) => {
    if (product.stock <= 0) return alert("Out of stock!");

    setCart((prev) => {
      const exist = prev.find((p) => p._id === product._id);

      if (exist) {
        if (exist.qty >= product.stock) {
          alert("Stock limit reached!");
          return prev;
        }

        return prev.map((p) =>
          p._id === product._id ? { ...p, qty: p.qty + 1 } : p
        );
      }

      return [...prev, { ...product, qty: 1 }];
    });
  };

  const increaseQty = (item) => {
    setCart((prev) =>
      prev.map((p) => {
        if (p._id === item._id) {
          if (p.qty >= item.stock) {
            alert("Stock limit reached!");
            return p;
          }
          return { ...p, qty: p.qty + 1 };
        }
        return p;
      })
    );
  };

  const decreaseQty = (item) => {
    setCart((prev) =>
      prev
        .map((p) =>
          p._id === item._id ? { ...p, qty: p.qty - 1 } : p
        )
        .filter((p) => p.qty > 0)
    );
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((p) => p._id !== id));
  };

  const grandTotal = cart
    .reduce((sum, item) => {
      const price =
        item.price - (item.price * (item.discount || 0)) / 100;
      return sum + price * item.qty;
    }, 0)
    .toFixed(2);

  const visibleCategories =
    activeCategory === "All"
      ? categories
      : categories.filter((c) => c.name === activeCategory);

  // ================= PAYMENT FLOW =================

  const handleUserChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };



  const handleFinalPayment = async () => {
    try {
      // Step 1: Verify email is registered
      const resCheck = await fetch("https://ecommerence-backend-jade.vercel.app/api/auth/check-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: userInfo.email }),
      });
      const dataCheck = await resCheck.json();
      if (!dataCheck.exists) {
        alert("Email not registered! Please sign up first.");
        return;
      }

      // Step 2: Send order to backend
      const resOrder = await fetch("https://ecommerence-backend-jade.vercel.app/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user: userInfo, cart }),
      });

      const dataOrder = await resOrder.json();
      if (!resOrder.ok) {
        alert(dataOrder.message || "Failed to create order");
        return;
      }

      alert("Payment Successful! Order placed.");
      setCart([]);
      setShowUserForm(false);
      setShowCart(false);
    } catch (err) {
      console.error(err);
      alert("Something went wrong, try again!");
    }
  };

  return (
    <div className="app">

      {/* ================= STYLES ================= */}
      <style>{`
        * {
          box-sizing: border-box;
          font-family: Arial;
        }

        .app {
          max-width: 1200px;
          margin: auto;
          padding: 15px;
        }

        /* TOP BAR RESPONSIVE */
        .top-bar {
          display: flex;
          gap: 10px;
          margin-bottom: 15px;
          flex-wrap: wrap;
        }

        .search-input, .category-dropdown {
          flex: 1;
          min-width: 120px;
          padding: 10px;
          border-radius: 8px;
          border: 1px solid #ddd;
        }

        .cart-btn {
          background: #111;
          color: white;
          padding: 10px 14px;
          border-radius: 8px;
          border: none;
        }

        /* PRODUCT GRID RESPONSIVE */
        .card-grid {
          display: flex;
          gap: 12px;
          overflow-x: auto;
          padding-bottom: 10px;
        }

        .product-card {
          min-width: 160px;
          max-width: 200px;
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
        }

        .product-card img {
          width: 100%;
          height: 120px;
          object-fit: cover;
        }

        .product-card div {
          padding: 10px;
        }

        .add-cart-btn {
          width: 100%;
          padding: 8px;
          background: green;
          color: white;
          border: none;
          border-radius: 8px;
        }

        /* MODAL RESPONSIVE */
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.5);
          display: flex;
          align-items: flex-end;
          justify-content: center;
        }

        .modal-box {
          width: 100%;
          max-width: 500px;
          background: white;
          border-radius: 16px 16px 0 0;
          padding: 15px;
        }

        /* CART ITEM */
        .cart-item {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          border-bottom: 1px solid #eee;
        }

        .qty-btn {
          padding: 4px 10px;
          border: none;
          border-radius: 6px;
          background: #ddd;
        }

        .del-btn {
          background: red;
          color: white;
          border: none;
          padding: 5px 8px;
          border-radius: 6px;
        }

        .modal-actions {
          display: flex;
          gap: 10px;
          margin-top: 12px;
        }

        .pay-btn {
          flex: 1;
          background: blue;
          color: white;
          border: none;
          padding: 10px;
          border-radius: 8px;
        }

        .close-btn {
          flex: 1;
          background: #eee;
          border: none;
          padding: 10px;
          border-radius: 8px;
        }

        /* ============ MOBILE RESPONSIVE ============ */
        @media (max-width: 600px) {
          .product-card {
            min-width: 140px;
          }

          .search-input, .category-dropdown {
            font-size: 14px;
          }

          .modal-box {
            padding: 12px;
          }

          h2 {
            font-size: 16px;
          }
        }
      `}</style>

      {/* ================= TOP BAR ================= */}
      <div className="top-bar">
        <input
          className="search-input"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="category-dropdown"
          value={activeCategory}
          onChange={(e) => setActiveCategory(e.target.value)}
        >
          <option value="All">All</option>
          {categories.map((c) => (
            <option key={c._id}>{c.name}</option>
          ))}
        </select>

        <button className="cart-btn" onClick={() => setShowCart(true)}>
          🛒 {cart.length}
        </button>
      </div>

      {/* ================= PRODUCTS ================= */}
      {visibleCategories.map((cat) => {
        const filtered = products.filter(
          (p) =>
            p.category === cat.name &&
            p.name.toLowerCase().includes(search.toLowerCase())
        );

        if (!filtered.length) return null;

        return (
          <div key={cat._id}>
            <h2>📂 {cat.name}</h2>

            <div className="card-grid">
              {filtered.map((p) => (
                <div key={p._id} className="product-card">
                  <img src={p.image} alt={p.name} />

                  <div>
                    <h4>{p.name}</h4>

                    <p style={{ textDecoration: p.discount ? "line-through" : "none", color: "#888" }}>
                      {p.price}
                    </p>

                    {p.discount > 0 && (
                      <p style={{ color: "#16a34a", fontWeight: "bold" }}>
                        {getFinalPrice(p.price, p.discount)} (-{p.discount}%)
                      </p>
                    )}
                    {/* STOCK */}
                    <p style={{ color: p.stock ? "green" : "red" }}>
                      Stock: {p.stock}
                    </p>

                    <button
                      className="add-cart-btn"
                      onClick={() => addToCart(p)}
                      disabled={!p.stock}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {/* ================= CART ================= */}
      {showCart && (
        <div className="modal-overlay">
          <div className="modal-box">

            <h2>Cart</h2>

            {cart.map((item) => (
              <div key={item._id} className="cart-item">
                <div>
                  <b>{item.name}</b>
                  <p>Qty: {item.qty} / {item.stock}</p>

                  <button className="qty-btn" onClick={() => decreaseQty(item)}>-</button>
                  <span style={{ margin: "0 10px" }}>{item.qty}</span>
                  <button className="qty-btn" onClick={() => increaseQty(item)}>+</button>
                </div>

                <button className="del-btn" onClick={() => removeFromCart(item._id)}>
                  ✕
                </button>
              </div>
            ))}

            <h3>Total: {grandTotal}</h3>

            <div className="modal-actions">
              <button className="pay-btn" onClick={() => setShowUserForm(true)}>Pay</button>
              <button className="close-btn" onClick={() => setShowCart(false)}>Close</button>
            </div>

          </div>
        </div>
      )}


      {/* ================= USER FORM ================= */}
      {showUserForm && (
        <div className="modal-overlay">
          <div className="modal-box">

            <h2>User Info</h2>
            <div className="modal-actions">
              <input name="name" placeholder="Name" className="search-input" onChange={handleUserChange} />
              <input name="email" placeholder="Email" className="search-input" onChange={handleUserChange} />
            </div>
            <div className="modal-actions">
              <input name="address" placeholder="Address" className="search-input" onChange={handleUserChange} />
              <input name="phone" placeholder="Phone" className="search-input" onChange={handleUserChange} />
            </div>
            <div className="modal-actions">
              <button className="pay-btn" onClick={handleFinalPayment}>
                Pay Now
              </button>
              <button className="close-btn" onClick={() => setShowUserForm(false)}>Cancel</button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}