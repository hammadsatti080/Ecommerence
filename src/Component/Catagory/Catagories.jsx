import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Catagories() {
    const [category, setCategory] = useState("");
    const [categories, setCategories] = useState([]);
    const [editId, setEditId] = useState(null);

    const API = "https://ecommerence-backend-jade.vercel.app/api/categories";

    // GET ALL
    const fetchCategories = async () => {
        try {
            const res = await fetch(API);
            const data = await res.json();
            setCategories(data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    // ADD / UPDATE
    const handleAddOrUpdate = async () => {
        if (!category.trim()) return;

        try {
            if (editId) {
                await fetch(`${API}/${editId}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name: category }),
                });
            } else {
                await fetch(API, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name: category }),
                });
            }

            setCategory("");
            setEditId(null);
            fetchCategories();
        } catch (err) {
            console.log(err);
        }
    };

    // DELETE
    const handleDelete = async (id) => {
        try {
            await fetch(`${API}/${id}`, {
                method: "DELETE",
            });
            fetchCategories();
        } catch (err) {
            console.log(err);
        }
    };

    // EDIT
    const handleEdit = (cat) => {
        setCategory(cat.name);
        setEditId(cat._id);
    };

    const navigate = useNavigate();
    const handlego = () => {
        navigate("/dashboards")
    }
    return (
        <div style={page}>

            {/* FORM CARD */}
            <div style={card}>
                <h2>📦 Category Manager</h2>

                <div style={formRow}>
                    <input
                        type="text"
                        placeholder="Enter category (e.g. Beauty)"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        style={input}
                    />

                    <button onClick={handleAddOrUpdate} style={button}>
                        {editId ? "Update" : "Add"}
                    </button>
                    <button onClick={handlego} style={button}>
                        Go back
                    </button>
                </div>
            </div>

            {/* CATEGORY CARDS */}
            <div style={card}>
                <h4>Available Categories</h4>

                <div style={grid}>
                    {categories.map((cat) => (
                        <div key={cat._id} style={categoryCard}>

                            <h3 style={{ marginBottom: "10px" }}>{cat.name}</h3>

                            <div style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
                                <button onClick={() => handleEdit(cat)} style={editBtn}>
                                    Edit
                                </button>

                                <button onClick={() => handleDelete(cat._id)} style={deleteBtn}>
                                    Delete
                                </button>
                            </div>

                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}

/* ================= STYLES ================= */

const page = {
    padding: "20px",
    maxWidth: "900px",
    margin: "auto",
    background: "white",
    minHeight: "100vh",
};

const card = {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
    marginBottom: "15px",
};

const formRow = {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
};

const input = {
    flex: 1,
    minWidth: "200px",
    padding: "12px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    outline: "none",
};

const button = {
    padding: "12px 18px",
    background: "#0d6efd",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
};

/* GRID LAYOUT */
const grid = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "15px",
    marginTop: "15px",
};

/* CATEGORY CARD */
const categoryCard = {
    background: "#ffffff",
    padding: "15px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    textAlign: "center",
    transition: "0.3s",
};

/* BUTTONS */
const editBtn = {
    padding: "6px 10px",
    background: "#ffc107",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
};

const deleteBtn = {
    padding: "6px 10px",
    background: "#dc3545",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
};