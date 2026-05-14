/*import React, { useEffect, useState } from "react";

export default function Product() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    const [search, setSearch] = useState("");
    const [filterCategory, setFilterCategory] = useState("");

    const [showModal, setShowModal] = useState(false);
    const [showCart, setShowCart] = useState(false);
    const [editId, setEditId] = useState(null);

    const [cart, setCart] = useState([]);

    const API = "http://localhost:5000/api/products";
    const CAT_API = "http://localhost:5000/api/categories";

    const [form, setForm] = useState({
        name: "",
        image: "",
        category: "",
        price: "",
        discount: "",
        
    });

   
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

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

 
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        const url = editId ? `${API}/${editId}` : API;
        const method = editId ? "PUT" : "POST";

        await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });

        setForm({
            name: "",
            image: "",
            category: "",
            price: "",
            discount: "",
        });

        setEditId(null);
        setShowModal(false);
        fetchProducts();
    };

  
    const handleDelete = async (id) => {
        await fetch(`${API}/${id}`, { method: "DELETE" });
        fetchProducts();
    };

    const handleEdit = (p) => {
        setForm(p);
        setEditId(p._id);
        setShowModal(true);
    };


    const getFinalPrice = (price, discount) => {
        const p = Number(price);
        const d = Number(discount || 0);
        return (p - (p * d) / 100).toFixed(2);
    };

    const addToCart = (product) => {
        setCart((prev) => {
            const exist = prev.find((p) => p._id === product._id);
            if (exist) {
                return prev.map((p) =>
                    p._id === product._id ? { ...p, qty: p.qty + 1 } : p
                );
            }
            return [...prev, { ...product, qty: 1 }];
        });
    };

    const removeFromCart = (id) => {
        setCart(cart.filter((p) => p._id !== id));
    };

  
    const filteredProducts = products.filter((p) => {
        return (
            p.name.toLowerCase().includes(search.toLowerCase()) &&
            (filterCategory ? p.category === filterCategory : true)
        );
    });

   
    const grandTotal = cart
        .reduce((sum, item) => {
            const price =
                item.price - (item.price * (item.discount || 0)) / 100;
            return sum + price * item.qty;
        }, 0)
        .toFixed(2);

    return (
        <div style={{ padding: "20px" }}>

         
            <div style={topBar}>
                <input
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={input}
                />

                <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    style={input}
                >
                    <option value="">All Categories</option>
                    {categories.map((c) => (
                        <option key={c._id} value={c.name}>{c.name}</option>
                    ))}
                </select>

                <button onClick={() => setShowModal(true)} style={addBtn}>
                    + Add Product
                </button>

                <button onClick={() => setShowCart(true)} style={cartBtn}>
                    🛒 ({cart.length})
                </button>
            </div>

            <div style={grid}>
                {filteredProducts.map((p) => (
                    <div key={p._id} style={card}>

                        <img src={p.image} alt="" style={img} />

                        <div style={{ padding: "10px" }}>
                            <h4>{p.name}</h4>

                            <p>Price: ${p.price}</p>
                            <p>Final: ${getFinalPrice(p.price, p.discount)}</p>
                            <p>{p.category}</p>

                            {p.discount && (
                                <p style={{ color: "red" }}>{p.discount}% OFF</p>
                            )}

                            <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
                                <button onClick={() => addToCart(p)} style={addCartBtn}>
                                    Add Cart
                                </button>

                                <button onClick={() => handleEdit(p)} style={editBtn}>
                                    Edit
                                </button>

                                <button onClick={() => handleDelete(p._id)} style={delBtn}>
                                    Delete
                                </button>
                            </div>
                        </div>

                    </div>
                ))}
            </div>

         
            {showCart && (
                <div style={modal}>
                    <div style={modalBox}>

                        <h2>🛒 Cart</h2>

                        {cart.length === 0 ? (
                            <p>No items</p>
                        ) : (
                            <>
                                {cart.map((item) => {
                                    const price =
                                        item.price - (item.price * (item.discount || 0)) / 100;

                                    return (
                                        <div key={item._id} style={cartItem}>

                                            <div>
                                                <b>{item.name}</b>

                                                <p>${price.toFixed(2)}</p>
                                                <p>Total: ${(price * item.qty).toFixed(2)}</p>

                                                <div style={{ display: "flex", gap: "10px" }}>
                                                    <button
                                                        onClick={() =>
                                                            setCart((prev) =>
                                                                prev.map((p) =>
                                                                    p._id === item._id && p.qty > 1
                                                                        ? { ...p, qty: p.qty - 1 }
                                                                        : p
                                                                )
                                                            )
                                                        }
                                                    >-</button>

                                                    <span>{item.qty}</span>

                                                    <button
                                                        onClick={() =>
                                                            setCart((prev) =>
                                                                prev.map((p) =>
                                                                    p._id === item._id
                                                                        ? { ...p, qty: p.qty + 1 }
                                                                        : p
                                                                )
                                                            )
                                                        }
                                                    >+</button>
                                                </div>
                                            </div>

                                            <button onClick={() => removeFromCart(item._id)} style={delBtn}>
                                                X
                                            </button>

                                        </div>
                                    );
                                })}

                                <h3>Total: ${grandTotal}</h3>
                            </>
                        )}

                        <div style={{ display: "flex", gap: "10px", marginTop: "10px", flexWrap: "wrap" }}>
                            <button style={addBtn}>Go to payment</button>
                            <button onClick={() => setShowCart(false)} style={delBtn}>
                                Close
                            </button>
                        </div>

                    </div>
                </div>
            )}

          
            {showModal && (
                <div style={modal}>
                    <div style={modalBox}>
                        <h2>{editId ? "Edit" : "Add"} Product</h2>

                        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} style={input} />
                        <input name="image" placeholder="Image" value={form.image} onChange={handleChange} style={input} />

                        <select name="category" value={form.category} onChange={handleChange} style={input}>
                            <option>Select</option>
                            {categories.map((c) => (
                                <option key={c._id}>{c.name}</option>
                            ))}
                        </select>

                        <input name="price" placeholder="Price" value={form.price} onChange={handleChange} style={input} />
                        <input name="discount" placeholder="Discount %" value={form.discount} onChange={handleChange} style={input} />

                        <div style={{ display: "flex", gap: "10px", marginTop: "10px", flexWrap: "wrap" }}>
                            <button onClick={handleSubmit} style={addBtn}>Save</button>
                            <button onClick={() => setShowModal(false)} style={delBtn}>Close</button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}



const topBar = {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
    flexWrap: "wrap",
};

const input = {
    padding: "10px",
    flex: "1 1 200px",
    borderRadius: "6px",
    border: "1px solid #ddd",
};

const addBtn = {
    padding: "10px 15px",
    background: "#0d6efd",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
};

const cartBtn = {
    padding: "10px 15px",
    background: "#000",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
};

const addCartBtn = {
    background: "green",
    color: "#fff",
    border: "none",
    padding: "6px 10px",
    borderRadius: "5px",
};

const editBtn = {
    background: "#ffc107",
    border: "none",
    padding: "6px 10px",
    borderRadius: "5px",
};

const delBtn = {
    background: "#dc3545",
    color: "#fff",
    border: "none",
    padding: "6px 10px",
    borderRadius: "5px",
};

const grid = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "15px",
    maxHeight: "70vh",   // 👈 limit height
    overflowY: "auto",   // 👈 enable vertical scroll
    paddingRight: "5px", // 👈 prevent scrollbar overlap
};

const card = {
    background: "#fff",
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
};

const img = {
    width: "100%",
    height: "150px",
    objectFit: "cover",
};

const modal = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
};

const modalBox = {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    width: "90%",
    maxWidth: "400px",
    maxHeight: "90vh",
    overflowY: "auto",
};

const cartItem = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "10px",
    borderBottom: "1px solid #eee",
    paddingBottom: "10px",
    marginBottom: "10px",
};
*/

import React, { useEffect, useState } from "react";

export default function Product() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    const [search, setSearch] = useState("");
    const [filterCategory, setFilterCategory] = useState("");

    const [showModal, setShowModal] = useState(false);
    const [showCart, setShowCart] = useState(false);
    const [editId, setEditId] = useState(null);

    const [cart, setCart] = useState([]);

    const API = "https://ecommerence-backend-jade.vercel.app0/api/products";
    const CAT_API = "https://ecommerence-backend-jade.vercel.app/api/categories";

    const [form, setForm] = useState({
        name: "",
        image: "",
        category: "",
        price: "",
        discount: "",
        stock: "", // ✅ added
    });

    /* ================= FETCH ================= */
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

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    /* ================= FORM ================= */
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        const url = editId ? `${API}/${editId}` : API;
        const method = editId ? "PUT" : "POST";

        await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ...form,
                price: Number(form.price),
                discount: Number(form.discount),
                stock: Number(form.stock), // ✅ ensure number
            }),
        });

        setForm({
            name: "",
            image: "",
            category: "",
            price: "",
            discount: "",
            stock: "",
        });

        setEditId(null);
        setShowModal(false);
        fetchProducts();
    };

    /* ================= DELETE ================= */
    const handleDelete = async (id) => {
        await fetch(`${API}/${id}`, { method: "DELETE" });
        fetchProducts();
    };

    /* ================= EDIT ================= */
    const handleEdit = (p) => {
        setForm({
            name: p.name || "",
            image: p.image || "",
            category: p.category || "",
            price: p.price || "",
            discount: p.discount || "",
            stock: p.stock || "",
        });
        setEditId(p._id);
        setShowModal(true);
    };

    /* ================= DISCOUNT ================= */
    const getFinalPrice = (price, discount) => {
        const p = Number(price);
        const d = Number(discount || 0);
        return (p - (p * d) / 100).toFixed(2);
    };

    /* ================= CART ================= */
    const addToCart = (product) => {
        if (product.stock <= 0) {
            alert("Out of stock!");
            return;
        }

        setCart((prev) => {
            const exist = prev.find((p) => p._id === product._id);

            if (exist) {
                if (exist.qty >= product.stock) {
                    alert("Stock limit reached!");
                    return prev;
                }

                return prev.map((p) =>
                    p._id === product._id
                        ? { ...p, qty: p.qty + 1 }
                        : p
                );
            }

            return [...prev, { ...product, qty: 1 }];
        });
    };

    const removeFromCart = (id) => {
        setCart(cart.filter((p) => p._id !== id));
    };

    /* ================= FILTER ================= */
    const filteredProducts = products.filter((p) => {
        return (
            p.name.toLowerCase().includes(search.toLowerCase()) &&
            (filterCategory ? p.category === filterCategory : true)
        );
    });

    /* ================= TOTAL ================= */
    const grandTotal = cart
        .reduce((sum, item) => {
            const price =
                item.price - (item.price * (item.discount || 0)) / 100;
            return sum + price * item.qty;
        }, 0)
        .toFixed(2);

    /* ================= CHECKOUT ================= */
    const handleCheckout = async () => {
        for (let item of cart) {
            await fetch(`${API}/${item._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...item,
                    stock: item.stock - item.qty,
                }),
            });
        }

        setCart([]);
        setShowCart(false);
        fetchProducts();
    };

    return (
        <div style={{ padding: "20px" }}>

            {/* TOP BAR */}
            <div style={topBar}>
                <input
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={input}
                />

                <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    style={input}
                >
                    <option value="">All Categories</option>
                    {categories.map((c) => (
                        <option key={c._id} value={c.name}>{c.name}</option>
                    ))}
                </select>

                <button onClick={() => setShowModal(true)} style={addBtn}>
                    + Add Product
                </button>

                <button onClick={() => setShowCart(true)} style={cartBtn}>
                    🛒 ({cart.length})
                </button>
            </div>

            {/* PRODUCTS */}
            <div style={grid}>
                {filteredProducts.map((p) => (
                    <div key={p._id} style={card}>
                        <img src={p.image} alt="" style={img} />

                        <div style={{ padding: "10px" }}>
                            <h4>{p.name}</h4>

                            <p>Price: {p.price}</p>
                            <p>Final: {getFinalPrice(p.price, p.discount)}</p>
                            <p>{p.category}</p>

                            {/* ✅ STOCK DISPLAY */}
                            <p style={{ color: p.stock <= 0 ? "red" : "green" }}>
                                Stock: {p.stock}
                            </p>

                            {p.discount && (
                                <p style={{ color: "red" }}>{p.discount}% OFF</p>
                            )}

                            <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
                                <button
                                    onClick={() => addToCart(p)}
                                    style={addCartBtn}
                                    disabled={p.stock <= 0}
                                >
                                    {p.stock <= 0 ? "Out of Stock" : "Add Cart"}
                                </button>

                                <button onClick={() => handleEdit(p)} style={editBtn}>
                                    Edit
                                </button>

                                <button onClick={() => handleDelete(p._id)} style={delBtn}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* CART MODAL */}
            {showCart && (
                <div style={modal}>
                    <div style={modalBox}>
                        <h2>🛒 Cart</h2>

                        {cart.length === 0 ? (
                            <p>No items</p>
                        ) : (
                            <>
                                {cart.map((item) => {
                                    const price =
                                        item.price - (item.price * (item.discount || 0)) / 100;

                                    return (
                                        <div key={item._id} style={cartItem}>
                                            <div>
                                                <b>{item.name}</b>
                                                <p>{price.toFixed(2)}</p>
                                                <p>Total: {(price * item.qty).toFixed(2)}</p>

                                                <div style={{ display: "flex", gap: "10px" }}>
                                                    <button
                                                        onClick={() =>
                                                            setCart((prev) =>
                                                                prev.map((p) =>
                                                                    p._id === item._id && p.qty > 1
                                                                        ? { ...p, qty: p.qty - 1 }
                                                                        : p
                                                                )
                                                            )
                                                        }
                                                    >-</button>

                                                    <span>{item.qty}</span>

                                                    <button
                                                        onClick={() =>
                                                            setCart((prev) =>
                                                                prev.map((p) =>
                                                                    p._id === item._id &&
                                                                        p.qty < item.stock
                                                                        ? { ...p, qty: p.qty + 1 }
                                                                        : p
                                                                )
                                                            )
                                                        }
                                                    >+</button>
                                                </div>
                                            </div>

                                            <button onClick={() => removeFromCart(item._id)} style={delBtn}>
                                                X
                                            </button>
                                        </div>
                                    );
                                })}

                                <h3>Total: {grandTotal}</h3>
                            </>
                        )}

                        <div style={{ display: "flex", gap: "10px", marginTop: "10px", flexWrap: "wrap" }}>
                            <button onClick={handleCheckout} style={addBtn}>
                                Go to payment
                            </button>
                            <button onClick={() => setShowCart(false)} style={delBtn}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ADD PRODUCT MODAL */}
            {showModal && (
                <div style={modal}>
                    <div style={modalBox}>
                        <h2>{editId ? "Edit" : "Add"} Product</h2>

                        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} style={input} />
                        <input name="image" placeholder="Image" value={form.image} onChange={handleChange} style={input} />

                        <select name="category" value={form.category} onChange={handleChange} style={input}>
                            <option>Select</option>
                            {categories.map((c) => (
                                <option key={c._id}>{c.name}</option>
                            ))}
                        </select>

                        <input name="price" placeholder="Price" value={form.price} onChange={handleChange} style={input} />
                        <input name="discount" placeholder="Discount %" value={form.discount} onChange={handleChange} style={input} />

                        {/* ✅ STOCK INPUT */}
                        <input name="stock" placeholder="Stock Quantity" value={form.stock} onChange={handleChange} style={input} />

                        <div style={{ display: "flex", gap: "10px", marginTop: "10px", flexWrap: "wrap" }}>
                            <button onClick={handleSubmit} style={addBtn}>Save</button>
                            <button onClick={() => setShowModal(false)} style={delBtn}>Close</button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}


const topBar = {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
    flexWrap: "wrap",
};

const input = {
    padding: "10px",
    flex: "1 1 200px",
    borderRadius: "6px",
    border: "1px solid #ddd",
};

const addBtn = {
    padding: "10px 15px",
    background: "#0d6efd",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
};

const cartBtn = {
    padding: "10px 15px",
    background: "#000",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
};

const addCartBtn = {
    background: "green",
    color: "#fff",
    border: "none",
    padding: "6px 10px",
    borderRadius: "5px",
};

const editBtn = {
    background: "#ffc107",
    border: "none",
    padding: "6px 10px",
    borderRadius: "5px",
};

const delBtn = {
    background: "#dc3545",
    color: "#fff",
    border: "none",
    padding: "6px 10px",
    borderRadius: "5px",
};

const grid = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "15px",
    maxHeight: "70vh",   // 👈 limit height
    overflowY: "auto",   // 👈 enable vertical scroll
    paddingRight: "5px", // 👈 prevent scrollbar overlap
};

const card = {
    background: "#fff",
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
};

const img = {
    width: "100%",
    height: "150px",
    objectFit: "cover",
};

const modal = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
};

const modalBox = {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    width: "90%",
    maxWidth: "400px",
    maxHeight: "90vh",
    overflowY: "auto",
};

const cartItem = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "10px",
    borderBottom: "1px solid #eee",
    paddingBottom: "10px",
    marginBottom: "10px",
};