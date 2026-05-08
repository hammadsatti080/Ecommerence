import React, { useState } from "react";
import Categorys from "../Catagory/Catagories";
import Product from "./Product/Product";
import AdminOrders from "./Adminorderhandle/AdminOrders";
import UserOrders from "./Adminorderhandle/UserOrders";

export default function App() {
  const [page, setPage] = useState("product");
  const [selectedCategory, setSelectedCategory] = useState("");

  const [categories] = useState([
    "Add catagory",
    "Add price",
    "View list",
  ]);

  return (
    <div style={{ display: "flex", height: "100vh" }}>

      {/* ================= SIDEBAR ================= */}
      <div style={sidebar}>

        <h3 style={heading}>⚙️ Admin Panel</h3>

        {/* PRODUCT */}
        <button
          style={{
            ...btn,
            ...(page === "product" ? activeBtn : {})
          }}
          onClick={() => {
            setPage("product");
            setSelectedCategory("");
          }}
        >
          📦 Product
        </button>

        {/* SALE */}
        <button
          style={{
            ...btn,
            ...(page === "sale" ? activeBtn : {})
          }}
          onClick={() => {
            setPage("sale");
            setSelectedCategory("");
          }}
        >
          💰 Sale
        </button>

        {/* LOGIN */}
        <button
          style={{
            ...btn,
            ...(page === "login" ? activeBtn : {})
          }}
          onClick={() => {
            setPage("login");
            setSelectedCategory("");
          }}
        >
          🔐 Login
        </button>

        {/* CATEGORY */}
        <div style={{ marginTop: "25px" }}>
          <label style={label}>Categories</label>

          <select
            style={dropdown}
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setPage("");
            }}
          >
            <option value="">Select Category</option>
            {categories.map((cat, i) => (
              <option key={i} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

      </div>

      {/* ================= CONTENT ================= */}
      <div style={content}>

        {/* CATEGORY VIEW */}
        {selectedCategory && (
          <div style={card}>
            <h2>📦 {selectedCategory}</h2>

            <Categorys />
          </div>
        )}

        {/* PAGES */}
        {!selectedCategory && (
          <>
            {page === "product" && <Product />}
            {page === "sale" && <AdminOrders />}
            {page === "login" && <UserOrders />}
          </>
        )}

      </div>

    </div>
  );
}

/* ================= STYLES ================= */

const sidebar = {
  width: "250px",
  background: "linear-gradient(180deg, #0f172a, #1e293b)",
  color: "#fff",
  padding: "20px 15px",
  display: "flex",
  flexDirection: "column",
};

const heading = {
  marginBottom: "30px",
  fontSize: "18px",
  fontWeight: "600",
  color: "#f1f5f9",
};

const btn = {
  width: "100%",
  marginBottom: "10px",
  padding: "12px 14px",
  background: "transparent",
  color: "#cbd5e1",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "14px",
  transition: "0.3s",
  textAlign: "left",
};

const activeBtn = {
  background: "#334155",
  color: "#fff",
};

const label = {
  fontSize: "12px",
  color: "#94a3b8",
};

const dropdown = {
  width: "100%",
  marginTop: "10px",
  padding: "10px",
  borderRadius: "8px",
  border: "none",
  background: "#1e293b",
  color: "#fff",
};

const content = {
  flex: 1,
  padding: "20px",
  background: "#f4f6fb",
};

const card = {
  background: "#fff",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
};