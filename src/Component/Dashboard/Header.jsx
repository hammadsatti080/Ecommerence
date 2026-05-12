import React, { useState } from "react";
import Categorys from "../Catagory/Catagories";
import Product from "./Product/Product";
import AdminOrders from "./Adminorderhandle/AdminOrders";
import Adminrating from "./Ratingcontrol/Adminrating";
import { useNavigate } from "react-router-dom";
import Expenserecord from "./Expense/Expenserecord";
import { FaFileInvoiceDollar } from "react-icons/fa";
export default function Header() {

  const [page, setPage] = useState("expenserecord");
  const [selectedCategory, setSelectedCategory] = useState("");

  const navigate = useNavigate();

  /* ================= MODERN CATEGORY STRUCTURE ================= */
  const categories = [
    { label: "Add Category", path: "/catagory" },
    { label: "Expense Record", path: "/expenserecord" },
    { label: "View List", path: "/view-list" },
  ];

  /* ================= DROPDOWN NAVIGATION ================= */
  const handleChange = (e) => {
    const path = e.target.value;

    if (path) {
      navigate(path);
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>

      {/* ================= SIDEBAR ================= */}
      <div style={sidebar}>

        <h3 style={heading}>⚙️ Admin Panel</h3>
        <button
          style={{
            ...btn,
            ...(page === "sale" ? activeBtn : {})
          }}
          onClick={() => {
            setPage("expenserecord");
            setSelectedCategory("");
          }}
        >
          <FaFileInvoiceDollar /> Expense Record
        </button>
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

        {/* REVIEWS */}
        <button
          style={{
            ...btn,
            ...(page === "review" ? activeBtn : {})
          }}
          onClick={() => {
            setPage("review");
            setSelectedCategory("");
          }}
        >
          🔐 Reviews
        </button>

        {/* ================= DROPDOWN ================= */}
        <div style={{ marginTop: "25px" }}>
          <label style={label}>Pages</label>

          <select
            style={dropdown}
            onChange={handleChange}
          >
            <option value="">Select Page</option>

            {categories.map((cat, i) => (
              <option key={i} value={cat.path}>
                {cat.label}
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

        {/* MAIN PAGES */}
        {!selectedCategory && (
          <>
            {page === "product" && <Product />}
            {page === "sale" && <AdminOrders />}
            {page === "review" && <Adminrating />}
            {page === "expenserecord" && <Expenserecord />}

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