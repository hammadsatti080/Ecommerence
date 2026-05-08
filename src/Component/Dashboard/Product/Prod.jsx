
    /* ================= FETCH ================= 
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

    const API = "http://localhost:5000/api/products";
    const CAT_API = "http://localhost:5000/api/categories";

    const [form, setForm] = useState({
        name: "",
        image: "",
        category: "",
        price: "",
        startDate: "",
        endDate: "",
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
            startDate: "",
            endDate: "",
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
        if (!discount) return price;
        return (price - (price * discount) / 100).toFixed(2);
    };


    const addToCart = (product) => {
        setCart((prev) => {
            const exist = prev.find((p) => p._id === product._id);
            if (exist) {
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

    const filteredProducts = products.filter((p) => {
        return (
            p.name.toLowerCase().includes(search.toLowerCase()) &&
            (filterCategory ? p.category === filterCategory : true)
        );
    });

    return (
        <div style={{ padding: "20px" }}>

         
            <div style={topBar}>

                <input
                    placeholder="Search product..."
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
                        <option key={c._id} value={c.name}>
                            {c.name}
                        </option>
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

                            <p>💰 Price: ${p.price}</p>
                            <p>📉 Final: ${getFinalPrice(p.price, p.discount)}</p>
                            <p>📂 {p.category}</p>

                            {p.discount && <p style={{ color: "red" }}>🔥 {p.discount}% OFF</p>}

                            <div style={{ display: "flex", gap: "5px" }}>

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

                        <h2>🛒 Cart Items</h2>

                        {cart.length === 0 ? (
                            <p>No items in cart</p>
                        ) : (
                            cart.map((item) => (
                                <div key={item._id} style={cartItem}>

                                    <div>
                                        <b>{item.name}</b>
                                        <p>Qty: {item.qty}</p>
                                        <p>Price: ${getFinalPrice(item.price, item.discount)}</p>
                                    </div>

                                    <button
                                        onClick={() => removeFromCart(item._id)}
                                        style={delBtn}
                                    >
                                        Remove
                                    </button>

                                </div>
                            ))
                        )}
                        <div style={{ display: "flex", flexDirection: "row", gap: "10px", marginTop: "10px" }}>
                            <button onClick={() => setShowCart(false)} style={addBtn}>
                                Go to payment
                            </button>
                            <button onClick={() => setShowCart(false)} style={addBtn}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
 
            {showModal && (
                <div style={modal}>
                    <div style={modalBox}>

                        <h2>{editId ? "Edit Product" : "Add Product"}</h2>

                        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} style={input} />
                        <input name="image" placeholder="Image URL" value={form.image} onChange={handleChange} style={input} />

                        <select name="category" value={form.category} onChange={handleChange} style={input}>
                            <option>Select Category</option>
                            {categories.map((c) => (
                                <option key={c._id} value={c.name}>{c.name}</option>
                            ))}
                        </select>

                        <input name="price" placeholder="Price" value={form.price} onChange={handleChange} style={input} />
                        <input name="discount" placeholder="Discount %" value={form.discount} onChange={handleChange} style={input} />
                        <div style={{ display: "flex", flexDirection: "row", gap: "10px", marginTop: "10px" }}>
                            <button onClick={handleSubmit} style={addBtn}>Save</button>
                            <button onClick={() => setShowModal(false)} style={delBtn}>Close</button>
                        </div>
                    </div>
                </div>
            )}

            <style>
                {`
          .grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 12px;
          }

          @media (max-width: 900px) {
            .grid {
              grid-template-columns: repeat(2, 1fr);
            }
          }

          @media (max-width: 600px) {
            .grid {
              grid-template-columns: repeat(1, 1fr);
            }
          }
        `}
            </style>

        </div>
    );
}



const topBar = {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
    alignItems: "center",
};

const input = {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ddd",
    flex: 1,
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
    background: "black",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
};

const addCartBtn = {
    padding: "5px 10px",
    background: "green",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
};

const grid = {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "12px",
};

const card = {
    background: "#fff",
    borderRadius: "12px",
    overflow: "hidden",
};

const img = {
    width: "100%",
    height: "140px",
    objectFit: "cover",
};

const editBtn = {
    padding: "5px 10px",
    background: "#ffc107",
    border: "none",
    height: "50px",
    borderRadius: "10px"
};

const delBtn = {
    padding: "5px 10px",
    background: "#dc3545",
    color: "#fff",
    border: "none",
    height: "50px",
    borderRadius: "10px"
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
    width: "400px",
};

const cartItem = {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px",
    borderBottom: "1px solid #ddd",
};

*/
