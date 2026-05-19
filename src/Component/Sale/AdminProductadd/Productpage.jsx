/*
import React, { useEffect, useState } from "react";

export default function ProductsPage() {

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    const [showCatForm, setShowCatForm] = useState(false);
    const [catForm, setCatForm] = useState({ name: "" });

    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({
        title: "",
        image: "",
        price: "",
        desc: "",
        color: "",
        category: ""
    });

    const [cart, setCart] = useState([]);
    const [showCart, setShowCart] = useState(false);
    const [step, setStep] = useState("cart");

    const [checkout, setCheckout] = useState({
        name: "",
        email: ""
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const [selectedCategory, setSelectedCategory] = useState("All");

    useEffect(() => {
        fetchCategories();
        fetchProducts();
    }, []);

    const fetchCategories = async () => {
        const res = await fetch("http://localhost:5000/api/categoriess");
        const data = await res.json();
        setCategories(data);
    };

    const fetchProducts = async () => {
        const res = await fetch("http://localhost:5000/api/Saleprod");
        const data = await res.json();
        setProducts(data);
    };

    const handleAddCategory = async () => {
        if (!catForm.name) return alert("Enter category name");

        const res = await fetch("http://localhost:5000/api/categoriess", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(catForm),
        });

        if (res.ok) {
            setCatForm({ name: "" });
            setShowCatForm(false);
            fetchCategories();
        }
    };

    const handleAddProduct = async () => {
        if (!form.title || !form.price || !form.category) {
            alert("Fill required fields");
            return;
        }

        const res = await fetch("http://localhost:5000/api/Saleprod", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });

        if (res.ok) {
            setShowForm(false);
            setForm({ title: "", image: "", price: "", desc: "", color: "", category: "" });
            fetchProducts();
        }
    };

    const filtered =
        selectedCategory === "All"
            ? products
            : products.filter((p) => p.category === selectedCategory);

    const addToCart = (item) => {
        setCart((prev) => {
            const exists = prev.find((x) => x._id === item._id);
            if (exists) {
                return prev.map((x) =>
                    x._id === item._id ? { ...x, qty: x.qty + 1 } : x
                );
            }
            return [...prev, { ...item, qty: 1 }];
        });

        setShowCart(true);
        setStep("cart");
    };

    const updateQty = (id, delta) => {
        setCart((prev) =>
            prev.map((x) =>
                x._id === id ? { ...x, qty: x.qty + delta } : x
            ).filter((x) => x.qty > 0)
        );
    };

    const removeItem = (id) => {
        setCart((prev) => prev.filter((x) => x._id !== id));
    };

    const totalItems = cart.reduce((s, i) => s + i.qty, 0);

    const cartTotal = cart.reduce((s, i) => s + Number(i.price) * i.qty, 0);

    const handleOrder = async () => {
        setError("");

        if (!checkout.name) return setError("Enter name");
        if (!checkout.email) return setError("Enter email");

        setLoading(true);

        try {
            const check = await fetch("http://localhost:5000/api/auth/check-email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: checkout.email })
            });

            const data = await check.json();

            if (!data.exists) {
                setError("Email not registered");
                setLoading(false);
                return;
            }

            const order = await fetch("http://localhost:5000/api/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    user: checkout,
                    cart: cart.map((i) => ({
                        name: i.title,
                        price: i.price,
                        qty: i.qty
                    }))
                })
            });

            if (order.ok) {
                setCart([]);
                setStep("success");
            }

        } catch {
            setError("Network error");
        }

        setLoading(false);
    };



    
    return (
        <div style={styles.page}>

          
            <div style={styles.header}>
                <h2 style={styles.logo}>🛍️ Products System</h2>

                <div style={styles.headerBtns}>
                    <button style={styles.btnPrimary} onClick={() => setShowCatForm(true)}>+ Category</button>
                    <button style={styles.btnPrimary} onClick={() => setShowForm(true)}>+ Product</button>
                    <button style={styles.cartBtn} onClick={() => { setShowCart(true); setStep("cart"); }}>
                        🛒 {totalItems}
                    </button>
                </div>
            </div>

         
            <div style={styles.filterWrap}>
                <button style={styles.filterBtn(selectedCategory === "All")} onClick={() => setSelectedCategory("All")}>All</button>

                {categories.map((c) => (
                    <button
                        key={c._id}
                        style={styles.filterBtn(selectedCategory === c.name)}
                        onClick={() => setSelectedCategory(c.name)}
                    >
                        {c.name}
                    </button>
                ))}
            </div>

        
            <div style={styles.grid}>
                {filtered.map((p) => (
                    <div key={p._id} style={styles.card}>
                        <img src={p.image}
                            alt="m"
                            style={styles.img}
                        />
                        <h3 style={styles.title}>{p.title}</h3>
                        <p style={styles.desc}>{p.desc}</p>

                        <div style={styles.row}>
                            <strong style={styles.price}>${p.price}</strong>
                            <button style={styles.addBtn} onClick={() => addToCart(p)}>Add</button>
                        </div>

                        <small style={{ color: "#777" }}>{p.category} • {p.color}</small>
                    </div>
                ))}
            </div>

           
            {showCatForm && (
                <div style={styles.overlay}>
                    <div style={styles.modal}>
                        <h3>Add Category</h3>
                        <input style={styles.input} placeholder="Category Name"
                            onChange={(e) => setCatForm({ name: e.target.value })} />
                        <button style={styles.btnPrimary} onClick={handleAddCategory}>Save</button>
                        <button style={styles.btnGhost} onClick={() => setShowCatForm(false)}>Close</button>
                    </div>
                </div>
            )}

            
            {showForm && (
                <div style={styles.overlay}>
                    <div style={styles.modal}>
                        <h3>Add Product</h3>

                        <input style={styles.input} placeholder="Title" onChange={(e) => setForm({ ...form, title: e.target.value })} />
                        <input style={styles.input} placeholder="Image" onChange={(e) => setForm({ ...form, image: e.target.value })} />
                        <input style={styles.input} placeholder="Price" onChange={(e) => setForm({ ...form, price: e.target.value })} />
                        <input style={styles.input} placeholder="Desc" onChange={(e) => setForm({ ...form, desc: e.target.value })} />
                        <input style={styles.input} placeholder="Color" onChange={(e) => setForm({ ...form, color: e.target.value })} />

                        <select style={styles.input} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                            <option>Select Category</option>
                            {categories.map((c) => (
                                <option key={c._id}>{c.name}</option>
                            ))}
                        </select>

                        <button style={styles.btnPrimary} onClick={handleAddProduct}>Save Product</button>
                        <button style={styles.btnGhost} onClick={() => setShowForm(false)}>Close</button>
                    </div>
                </div>
            )}

            {showCart && (
                <div style={styles.overlay}>
                    <div style={styles.modal}>
                        {step === "cart" && (
                            <>
                                {cart.map((i) => (
                                    <div key={i._id} style={styles.cartItem}>
                                        <span>{i.title}</span>

                                        <div>
                                            <button onClick={() => updateQty(i._id, -1)}>-</button>
                                            {i.qty}
                                            <button onClick={() => updateQty(i._id, 1)}>+</button>
                                        </div>

                                        <button onClick={() => removeItem(i._id)}>🗑</button>
                                    </div>
                                ))}

                                <h3>Total: ${cartTotal}</h3>
                                <button style={styles.btnPrimary} onClick={() => setStep("form")}>Checkout</button>
                            </>
                        )}

                        {step === "form" && (
                            <>
                                <input style={styles.input} placeholder="Name" onChange={(e) => setCheckout({ ...checkout, name: e.target.value })} />
                                <input style={styles.input} placeholder="Email" onChange={(e) => setCheckout({ ...checkout, email: e.target.value })} />

                                {error && <p style={{ color: "red" }}>{error}</p>}

                                <button style={styles.btnPrimary} onClick={handleOrder}>
                                    {loading ? "Processing..." : "Place Order"}
                                </button>
                            </>
                        )}

                        {step === "success" && (
                            <div style={{ textAlign: "center" }}>
                                <h2>🎉 Order Placed</h2>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}



const styles = {
    page: {
        padding: 20,
        background: "#f4f6f8",
        minHeight: "100vh",
        fontFamily: "Arial",
    },

    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
        flexWrap: "wrap",
        gap: 10
    },

    logo: { fontSize: 22, fontWeight: "bold" },

    headerBtns: { display: "flex", gap: 10, flexWrap: "wrap" },

    btnPrimary: {
        padding: "8px 12px",
        background: "#111",
        color: "#fff",
        border: "none",
        borderRadius: 8,
        cursor: "pointer"
    },

    btnGhost: {
        padding: "8px 12px",
        background: "#eee",
        border: "none",
        borderRadius: 8,
        marginTop: 10
    },

    cartBtn: {
        padding: "8px 12px",
        background: "#c9a96e",
        border: "none",
        borderRadius: 8,
        cursor: "pointer"
    },

    filterWrap: {
        display: "flex",
        gap: 8,
        flexWrap: "wrap",
        marginBottom: 20
    },

    filterBtn: (active) => ({
        padding: "6px 12px",
        borderRadius: 20,
        border: "1px solid #ddd",
        background: active ? "#111" : "#fff",
        color: active ? "#fff" : "#000",
        cursor: "pointer"
    }),

    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
        gap: 15
    },

    card: {
        background: "#fff",
        borderRadius: 12,
        padding: 12,
        boxShadow: "0 4px 10px rgba(0,0,0,0.06)"
    },

    img: {
        width: "100%",
        height: 200,
        objectFit: "cover",
        borderRadius: 10
    },

    title: { fontSize: 16, marginTop: 10 },

    desc: { fontSize: 13, color: "#666" },

    row: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    },

    price: { color: "#c9a96e" },

    addBtn: {
        background: "#111",
        color: "#fff",
        border: "none",
        padding: "6px 10px",
        borderRadius: 6,
        cursor: "pointer"
    },

    overlay: {
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },

    modal: {
        background: "#fff",
        width: "95%",
        maxWidth: 450,
        padding: 20,
        borderRadius: 12
    },

    input: {
        width: "100%",
        padding: 10,
        marginTop: 10,
        border: "1px solid #ddd",
        borderRadius: 8
    },

    cartItem: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: 10,
        alignItems: "center"
    }
};
*/

import React, { useEffect, useState } from "react";

export default function ProductsPage() {

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    const [showCatForm, setShowCatForm] = useState(false);
    const [catForm, setCatForm] = useState({ name: "" });

    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({
        title: "",
        image: "",
        price: "",
        desc: "",
        color: "",
        category: ""
    });

    const [cart, setCart] = useState([]);
    const [showCart, setShowCart] = useState(false);
    const [step, setStep] = useState("cart");

    const [checkout, setCheckout] = useState({
        name: "",
        email: ""
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const [selectedCategory, setSelectedCategory] = useState("All");

    useEffect(() => {
        fetchCategories();
        fetchProducts();
    }, []);

    const fetchCategories = async () => {
        const res = await fetch("https://ecommerence-backend-jade.vercel.app/api/categoriess");
        const data = await res.json();
        setCategories(data);
    };

    const fetchProducts = async () => {
        const res = await fetch("https://ecommerence-backend-jade.vercel.app/api/Saleprod");
        const data = await res.json();
        setProducts(data);
    };

    const handleAddCategory = async () => {
        if (!catForm.name) return alert("Enter category name");

        const res = await fetch("https://ecommerence-backend-jade.vercel.app/api/categoriess", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(catForm),
        });

        if (res.ok) {
            setCatForm({ name: "" });
            setShowCatForm(false);
            fetchCategories();
        }
    };

    const handleAddProduct = async () => {
        if (!form.title || !form.price || !form.category) {
            alert("Fill required fields");
            return;
        }

        const url = editingId
            ? `https://ecommerence-backend-jade.vercel.app/api/Saleprod/${editingId}`
            : `https://ecommerence-backend-jade.vercel.app/api/Saleprod`;

        const method = editingId ? "PUT" : "POST";

        const res = await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });

        if (res.ok) {
            setShowForm(false);
            setEditingId(null); // reset edit mode
            setForm({ title: "", image: "", price: "", desc: "", color: "", category: "" });
            fetchProducts();
        }
    };
    const filtered =
        selectedCategory === "All"
            ? products
            : products.filter((p) => p.category === selectedCategory);

    const addToCart = (item) => {
        setCart((prev) => {
            const exists = prev.find((x) => x._id === item._id);
            if (exists) {
                return prev.map((x) =>
                    x._id === item._id ? { ...x, qty: x.qty + 1 } : x
                );
            }
            return [...prev, { ...item, qty: 1 }];
        });

        setShowCart(true);
        setStep("cart");
    };

    const updateQty = (id, delta) => {
        setCart((prev) =>
            prev.map((x) =>
                x._id === id ? { ...x, qty: x.qty + delta } : x
            ).filter((x) => x.qty > 0)
        );
    };

    const removeItem = (id) => {
        setCart((prev) => prev.filter((x) => x._id !== id));
    };

    const totalItems = cart.reduce((s, i) => s + i.qty, 0);

    const cartTotal = cart.reduce((s, i) => s + Number(i.price) * i.qty, 0);

    const handleOrder = async () => {
        setError("");

        if (!checkout.name) return setError("Enter name");
        if (!checkout.email) return setError("Enter email");

        setLoading(true);

        try {
            const check = await fetch("https://ecommerence-backend-jade.vercel.app/api/auth/check-email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: checkout.email })
            });

            const data = await check.json();

            if (!data.exists) {
                setError("Email not registered");
                setLoading(false);
                return;
            }

            const order = await fetch("https://ecommerence-backend-jade.vercel.app/api/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    user: checkout,
                    cart: cart.map((i) => ({
                        name: i.title,
                        price: i.price,
                        qty: i.qty
                    }))
                })
            });

            if (order.ok) {
                setCart([]);
                setStep("success");
            }

        } catch {
            setError("Network error");
        }

        setLoading(false);
    };

    const [editingId, setEditingId] = useState(null);
    const handleEditClick = (product) => {
        setForm({
            title: product.title,
            image: product.image,
            price: product.price,
            desc: product.desc,
            color: product.color,
            category: product.category
        });

        setEditingId(product._id);
        setShowForm(true);
    };


    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this product?");
        if (!confirmDelete) return;

        try {
            const res = await fetch(`https://ecommerence-backend-jade.vercel.app/api/Saleprod/${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                fetchProducts(); // refresh list
            } else {
                alert("Failed to delete product");
            }
        } catch (err) {
            console.log(err);
            alert("Network error");
        }
    };
    return (
        <div style={styles.page}>

            {/* HEADER */}
            <div style={styles.header}>
                <h2 style={styles.logo}>🛍️ Products System</h2>

                <div style={styles.headerBtns}>
                    <button style={styles.btnPrimary} onClick={() => setShowCatForm(true)}>+ Category</button>
                    <button style={styles.btnPrimary} onClick={() => setShowForm(true)}>+ Product</button>
                    <button style={styles.cartBtn} onClick={() => { setShowCart(true); setStep("cart"); }}>
                        🛒 {totalItems}
                    </button>
                </div>
            </div>

            {/* CATEGORY FILTER */}
            <div style={styles.filterWrap}>
                <button style={styles.filterBtn(selectedCategory === "All")} onClick={() => setSelectedCategory("All")}>All</button>

                {categories.map((c) => (
                    <button
                        key={c._id}
                        style={styles.filterBtn(selectedCategory === c.name)}
                        onClick={() => setSelectedCategory(c.name)}
                    >
                        {c.name}
                    </button>
                ))}
            </div>

            {/* PRODUCTS */}
            <div style={styles.grid}>
                {filtered.map((p) => (
                    <div key={p._id} style={styles.card}>
                        <img src={p.image}
                            alt="m"
                            style={styles.img}
                        />
                        <h3 style={styles.title}>{p.title}</h3>
                        <p style={styles.desc}>{p.desc}</p>
                        <p style={styles.desc}>{p.price}</p>
                        <div style={{ display: "flex", gap: 5 }}>
                            <button style={styles.addBtn} onClick={() => addToCart(p)}>
                                Add
                            </button>

                            <button
                                style={{ ...styles.addBtn, background: "#555" }}
                                onClick={() => handleEditClick(p)}
                            >
                                Edit
                            </button>
                            <button
                                style={{ ...styles.addBtn, background: "red" }}
                                onClick={() => handleDelete(p._id)}
                            >
                                Delete
                            </button>
                        </div>

                        <small style={{ color: "#777" }}>{p.category} • {p.color}</small>
                    </div>
                ))}
            </div>

            {/* CATEGORY MODAL */}
            {showCatForm && (
                <div style={styles.overlay}>
                    <div style={styles.modal}>
                        <h3>Add Category</h3>
                        <input style={styles.input} placeholder="Category Name"
                            onChange={(e) => setCatForm({ name: e.target.value })} />
                        <button style={styles.btnPrimary} onClick={handleAddCategory}>Save</button>
                        <button style={styles.btnGhost} onClick={() => setShowCatForm(false)}>Close</button>
                    </div>
                </div>
            )}

            {/* PRODUCT MODAL */}
            {showForm && (
                <div style={styles.overlay}>
                    <div style={styles.modal}>
                        <h3>{editingId ? "Edit Product" : "Add Product"}</h3>

                        <input style={styles.input} value={form.title} placeholder="Title" onChange={(e) => setForm({ ...form, title: e.target.value })} />
                        <input style={styles.input} value={form.image} placeholder="Image" onChange={(e) => setForm({ ...form, image: e.target.value })} />
                        <input style={styles.input} value={form.price} placeholder="Price" onChange={(e) => setForm({ ...form, price: e.target.value })} />
                        <input style={styles.input} value={form.desc} placeholder="Desc" onChange={(e) => setForm({ ...form, desc: e.target.value })} />
                        <input style={styles.input} value={form.color} placeholder="Color" onChange={(e) => setForm({ ...form, color: e.target.value })} />

                        <select style={styles.input} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                            <option>Select Category</option>
                            {categories.map((c) => (
                                <option key={c._id}>{c.name}</option>
                            ))}
                        </select>

                        <button style={styles.btnPrimary} onClick={handleAddProduct}>Save Product</button>
                        <button style={styles.btnGhost} onClick={() => setShowForm(false)}>Close</button>
                    </div>
                </div>
            )}

            {/* CART */}
            {showCart && (
                <div style={styles.overlay}>
                    <div style={styles.modal}>
                        {step === "cart" && (
                            <>
                                {cart.map((i) => (
                                    <div key={i._id} style={styles.cartItem}>
                                        <span>{i.title}</span>

                                        <div>
                                            <button onClick={() => updateQty(i._id, -1)}>-</button>
                                            {i.qty}
                                            <button onClick={() => updateQty(i._id, 1)}>+</button>
                                        </div>

                                        <button onClick={() => removeItem(i._id)}>🗑</button>
                                    </div>
                                ))}

                                <h3>Total: {cartTotal}</h3>
                                <button style={styles.btnPrimary} onClick={() => setStep("form")}>Checkout</button>
                            </>
                        )}

                        {step === "form" && (
                            <>
                                <input style={styles.input} placeholder="Name" onChange={(e) => setCheckout({ ...checkout, name: e.target.value })} />
                                <input style={styles.input} placeholder="Email" onChange={(e) => setCheckout({ ...checkout, email: e.target.value })} />

                                {error && <p style={{ color: "red" }}>{error}</p>}

                                <button style={styles.btnPrimary} onClick={handleOrder}>
                                    {loading ? "Processing..." : "Place Order"}
                                </button>
                            </>
                        )}

                        {step === "success" && (
                            <div style={{ textAlign: "center" }}>
                                <h2>🎉 Order Placed</h2>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

/* ================= UI STYLES ================= */

const styles = {
    page: {
        padding: 20,
        background: "#f4f6f8",
        minHeight: "100vh",
        fontFamily: "Arial",
    },

    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
        flexWrap: "wrap",
        gap: 10
    },

    logo: { fontSize: 22, fontWeight: "bold" },

    headerBtns: { display: "flex", gap: 10, flexWrap: "wrap" },

    btnPrimary: {
        padding: "8px 12px",
        background: "#111",
        color: "#fff",
        border: "none",
        borderRadius: 8,
        cursor: "pointer"
    },

    btnGhost: {
        padding: "8px 12px",
        background: "#eee",
        border: "none",
        borderRadius: 8,
        marginTop: 10
    },

    cartBtn: {
        padding: "8px 12px",
        background: "#c9a96e",
        border: "none",
        borderRadius: 8,
        cursor: "pointer"
    },

    filterWrap: {
        display: "flex",
        gap: 8,
        flexWrap: "wrap",
        marginBottom: 20
    },

    filterBtn: (active) => ({
        padding: "6px 12px",
        borderRadius: 20,
        border: "1px solid #ddd",
        background: active ? "#111" : "#fff",
        color: active ? "#fff" : "#000",
        cursor: "pointer"
    }),

    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
        gap: 15
    },

    card: {
        background: "#fff",
        borderRadius: 12,
        padding: 12,
        boxShadow: "0 4px 10px rgba(0,0,0,0.06)"
    },

    img: {
        width: "100%",
        height: 200,
        objectFit: "cover",
        borderRadius: 10
    },

    title: { fontSize: 16, marginTop: 10 },

    desc: { fontSize: 13, color: "#666" },

    row: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    },

    price: { color: "#c9a96e" },

    addBtn: {
        background: "#111",
        color: "#fff",
        border: "none",
        padding: "6px 10px",
        borderRadius: 6,
        cursor: "pointer"
    },

    overlay: {
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },

    modal: {
        background: "#fff",
        width: "95%",
        maxWidth: 450,
        padding: 20,
        borderRadius: 12
    },

    input: {
        width: "100%",
        padding: 10,
        marginTop: 10,
        border: "1px solid #ddd",
        borderRadius: 8
    },

    cartItem: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: 10,
        alignItems: "center"
    }
};