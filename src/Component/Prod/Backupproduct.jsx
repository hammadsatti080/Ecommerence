/*
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

    const filtered = data.filter(
      (p) =>
        (p.category || "").toLowerCase() !== "future product"
    );

    setProducts(filtered);
  };

  const fetchCategories = async () => {
    const res = await fetch(CAT_API);
    const data = await res.json();
    const filtered = data.filter(
      (c) =>
        (c.name || "").toLowerCase() !== "future product"
    );

    setCategories(filtered);
  };
  const getFinalPrice = (price, discount) => {
    const p = Number(price);
    const d = Number(discount || 0);
    return (p - (p * d) / 100).toFixed(2);
  };


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


  const handleUserChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };



  const handleFinalPayment = async () => {
    try {

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




  const handleSave = async (product) => {
    const email = prompt("Enter your email to save product:");

    if (!email) return;


    const res = await fetch(
      "https://ecommerence-backend-jade.vercel.app/api/auth/check-email",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      }
    );

    const data = await res.json();

    if (!data.exists) {
      alert("User not registered!");
      return;
    }

    await fetch("https://ecommerence-backend-jade.vercel.app/api/saved/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userEmail: email,
        product,
      }),
    });

    alert("Saved successfully ❤️");
  };
  return (
    <div className="app">


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

       
.cart-sheet {
  width: 100%;
  max-width: 520px;
  background: white;
  border-radius: 18px 18px 0 0;
  display: flex;
  flex-direction: column;
  max-height: 85vh;
  animation: slideUp 0.25s ease;
}


.cart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 16px;
  border-bottom: 1px solid #eee;
}

.close-x {
  background: transparent;
  border: none;
  font-size: 18px;
  cursor: pointer;
}


.cart-body {
  flex: 1;
  overflow-y: auto;
  padding: 10px 14px;
}


.empty-cart {
  text-align: center;
  color: #888;
  margin-top: 30px;
}

.cart-item {
  display: flex;
  justify-content: space-between;
  background: #f9f9f9;
  padding: 12px;
  border-radius: 12px;
  margin-bottom: 10px;
}

.cart-left h4 {
  margin: 0;
  font-size: 14px;
}

.price {
  color: #16a34a;
  font-weight: bold;
  margin: 4px 0;
}


.qty-box {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 6px;
}

.qty-box button {
  width: 26px;
  height: 26px;
  border: none;
  border-radius: 6px;
  background: #ddd;
  cursor: pointer;
}


.remove-btn {
  background: red;
  color: white;
  border: none;
  height: 28px;
  width: 28px;
  border-radius: 6px;
  cursor: pointer;
}


.cart-footer {
  border-top: 1px solid #eee;
  padding: 12px 14px;
  background: white;
}

.total {
  margin-bottom: 10px;
  font-size: 16px;
}

.cart-actions {
  display: flex;
  gap: 10px;
}

@keyframes slideUp {
  from {
    transform: translateY(40px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

       .checkout-box {
  width: 100%;
  max-width: 500px;
  background: white;
  border-radius: 18px 18px 0 0;
  display: flex;
  flex-direction: column;
  max-height: 85vh;
  animation: slideUp 0.25s ease;
}

.checkout-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 16px;
  border-bottom: 1px solid #eee;
}

.checkout-body {
  padding: 14px;
  overflow-y: auto;
  flex: 1;
}

.input-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
}

.input-group label {
  font-size: 12px;
  color: #666;
  margin-bottom: 4px;
}

.input-group input {
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #ddd;
  outline: none;
}

.input-group input:focus {
  border-color: #16a34a;
}


.checkout-footer {
  border-top: 1px solid #eee;
  padding: 12px;
  display: flex;
  gap: 10px;
  background: white;
}


.pay-btn {
  flex: 1;
  background: #2563eb;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 10px;
  cursor: pointer;
  font-weight: bold;
}

.close-btn {
  flex: 1;
  background: #eee;
  border: none;
  padding: 12px;
  border-radius: 10px;
  cursor: pointer;
}
@keyframes slideUp {
  from {
    transform: translateY(40px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
        }
      `}</style>

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

                    <p style={{ color: p.stock ? "green" : "red" }}>
                      Stock: {p.stock}
                    </p>
                    <button
                      onClick={() => handleSave(p)}
                      style={{ background: "transparent", border: "none", cursor: "pointer" }}
                    >
                      🤍 Save
                    </button>
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

      {showCart && (
        <div className="modal-overlay">
          <div className="cart-sheet">

           
            <div className="cart-header">
              <h2>🛒 Your Cart</h2>
              <button className="close-x" onClick={() => setShowCart(false)}>✕</button>
            </div>

            <div className="cart-body">
              {cart.length === 0 ? (
                <p className="empty-cart">Your cart is empty</p>
              ) : (
                cart.map((item) => (
                  <div key={item._id} className="cart-item">

                    <div className="cart-left">
                      <h4>{item.name}</h4>
                      <p className="price">
                        Rs {(item.price - (item.price * (item.discount || 0)) / 100).toFixed(2)}
                      </p>

                      <div className="qty-box">
                        <button onClick={() => decreaseQty(item)}>-</button>
                        <span>{item.qty}</span>
                        <button onClick={() => increaseQty(item)}>+</button>
                      </div>
                    </div>

                    <button
                      className="remove-btn"
                      onClick={() => removeFromCart(item._id)}
                    >
                      ✕
                    </button>

                  </div>
                ))
              )}
            </div>

          
            <div className="cart-footer">
              <div className="total">
                Total: <b>Rs {grandTotal}</b>
              </div>

              <div className="cart-actions">
                <button className="pay-btn" onClick={() => setShowUserForm(true)}>
                  Checkout
                </button>
                <button className="close-btn" onClick={() => setShowCart(false)}>
                  Continue Shopping
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {showUserForm && (
        <div className="modal-overlay">
          <div className="checkout-box">

          
            <div className="checkout-header">
              <h2>🧾 Checkout</h2>
              <button
                className="close-x"
                onClick={() => setShowUserForm(false)}
              >
                ✕
              </button>
            </div>

            
            <div className="checkout-body">

              <div className="input-group">
                <label>Name</label>
                <input
                  name="name"
                  placeholder="Enter your full name"
                  onChange={handleUserChange}
                />
              </div>

              <div className="input-group">
                <label>Email</label>
                <input
                  name="email"
                  placeholder="Enter your email"
                  onChange={handleUserChange}
                />
              </div>

              <div className="input-group">
                <label>Address</label>
                <input
                  name="address"
                  placeholder="Enter your address"
                  onChange={handleUserChange}
                />
              </div>

              <div className="input-group">
                <label>Phone</label>
                <input
                  name="phone"
                  placeholder="03XX-XXXXXXX"
                  onChange={handleUserChange}
                />
              </div>

            </div>

            <div className="checkout-footer">
              <button className="pay-btn" onClick={handleFinalPayment}>
                Pay Now
              </button>
              <button
                className="close-btn"
                onClick={() => setShowUserForm(false)}
              >
                Cancel
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
*/
