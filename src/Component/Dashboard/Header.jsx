import React, { useState } from "react";
import Categorys from "../Catagory/Catagories";
import Product from "./Product/Product";
import AdminOrders from "./Adminorderhandle/AdminOrders";
import Adminrating from "./Ratingcontrol/Adminrating";
import { useNavigate } from "react-router-dom";
import Expenserecord from "./Expense/Expenserecord";

import {
  FaFileInvoiceDollar,
  FaBars,
  FaTimes
} from "react-icons/fa";

export default function Header() {

  const [page, setPage] = useState("expenserecord");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showMenu, setShowMenu] = useState(false);

  const navigate = useNavigate();

  /* ================= DROPDOWN PAGES ================= */

  const categories = [
    { label: "Add Category", path: "/catagory" },
    { label: "Expense Record", path: "/expenserecord" },
    { label: "Product catagory", path: "/productpage" },
  ];

  /* ================= DROPDOWN NAVIGATION ================= */

  const handleChange = (e) => {

    const path = e.target.value;

    if (path) {
      navigate(path);
      setShowMenu(false);
    }
  };

  return (

    <div className="main-container">

      {/* ================= MOBILE TOP BAR ================= */}

      <div className="mobile-top">

        <button
          className="toggle-btn"
          onClick={() => setShowMenu(!showMenu)}
        >

          {showMenu ? <FaTimes /> : <FaBars />}

        </button>

        <h3 className="mobile-title">
          ⚙️ Admin Panel
        </h3>

      </div>

      {/* ================= SIDEBAR ================= */}

      <div className={`sidebar ${showMenu ? "show-sidebar" : ""}`}>

        <h3 className="heading">
          ⚙️ Admin Panel
        </h3>

        {/* ================= EXPENSE ================= */}

        <button
          className={`menu-btn ${page === "expenserecord" ? "active" : ""}`}

          onClick={() => {

            setPage("expenserecord");
            setSelectedCategory("");
            setShowMenu(false);

          }}
        >

          <FaFileInvoiceDollar />
          <span>Expense Record</span>

        </button>

        {/* ================= PRODUCT ================= */}

        <button
          className={`menu-btn ${page === "product" ? "active" : ""}`}

          onClick={() => {

            setPage("product");
            setSelectedCategory("");
            setShowMenu(false);

          }}
        >

          📦
          <span>Product</span>

        </button>

        {/* ================= SALE ================= */}

        <button
          className={`menu-btn ${page === "sale" ? "active" : ""}`}

          onClick={() => {

            setPage("sale");
            setSelectedCategory("");
            setShowMenu(false);

          }}
        >

          💰
          <span>Sale</span>

        </button>

        {/* ================= REVIEWS ================= */}

        <button
          className={`menu-btn ${page === "review" ? "active" : ""}`}

          onClick={() => {

            setPage("review");
            setSelectedCategory("");
            setShowMenu(false);

          }}
        >

          🔐
          <span>Reviews</span>

        </button>

        {/* ================= DROPDOWN ================= */}

        <div className="dropdown-box">

          <label className="label">
            Pages
          </label>

          <select
            className="dropdown"
            onChange={handleChange}
          >

            <option value="">
              Select Page
            </option>

            {categories.map((cat, i) => (

              <option
                key={i}
                value={cat.path}
              >

                {cat.label}

              </option>

            ))}

          </select>

        </div>

      </div>

      {/* ================= CONTENT ================= */}

      <div className="content">

        {/* CATEGORY PAGE */}

        {selectedCategory && (

          <div className="card">

            <h2>
              📦 {selectedCategory}
            </h2>

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

      {/* ================= CSS ================= */}

      <style>{`

        *{
          margin:0;
          padding:0;
          box-sizing:border-box;
        }

        body{
          font-family:Arial, sans-serif;
        }

        /* ================= MAIN LAYOUT ================= */

        .main-container{
          display:flex;
          min-height:100vh;
          background:#f4f6fb;
        }

        /* ================= MOBILE TOP BAR ================= */

        .mobile-top{
          display:none;
        }

        /* ================= SIDEBAR ================= */

        .sidebar{

          width:260px;
          background:linear-gradient(180deg, #0f172a, #1e293b);
          color:#fff;

          padding:20px 15px;

          display:flex;
          flex-direction:column;

          transition:0.3s ease;
        }

        .heading{

          margin-bottom:30px;

          font-size:20px;
          font-weight:600;

          text-align:center;
        }

        /* ================= BUTTONS ================= */

        .menu-btn{

          width:100%;

          margin-bottom:12px;

          padding:13px 14px;

          background:transparent;

          color:#cbd5e1;

          border:none;

          border-radius:10px;

          cursor:pointer;

          text-align:left;

          display:flex;
          align-items:center;
          gap:12px;

          font-size:15px;

          transition:0.3s ease;
        }

        .menu-btn:hover{

          background:#334155;
          color:#fff;

          transform:translateX(3px);
        }

        .active{

          background:#334155;
          color:#fff;
        }

        /* ================= DROPDOWN ================= */

        .dropdown-box{

          margin-top:25px;
        }

        .label{

          font-size:13px;

          color:#94a3b8;
        }

        .dropdown{

          width:100%;

          margin-top:10px;

          padding:12px;

          border-radius:8px;

          border:none;

          outline:none;

          background:#1e293b;

          color:#fff;

          font-size:14px;
        }

        /* ================= CONTENT ================= */

        .content{

          flex:1;

          padding:25px;

          overflow-y:auto;
        }

        .card{

          background:#fff;

          padding:20px;

          border-radius:12px;

          box-shadow:0 4px 15px rgba(0,0,0,0.1);
        }

        /* ================= MOBILE RESPONSIVE ================= */

        @media(max-width:768px){

          .main-container{

            flex-direction:column;
          }

          /* MOBILE TOP BAR */

          .mobile-top{

            display:flex;

            align-items:center;

            gap:15px;

            background:#0f172a;

            color:#fff;

            padding:15px;

            position:sticky;

            top:0;

            z-index:1000;
          }

          .mobile-title{

            margin:0;

            font-size:18px;

            font-weight:600;
          }

          /* TOGGLE BUTTON */

          .toggle-btn{

            border:none;

            background:#334155;

            color:#fff;

            padding:10px 12px;

            border-radius:8px;

            font-size:18px;

            cursor:pointer;

            display:flex;
            align-items:center;
            justify-content:center;
          }

          /* SIDEBAR MOBILE */

          .sidebar{

            width:100%;

            display:none;

            flex-direction:column;

            padding:15px;
          }

          .show-sidebar{

            display:flex;
          }

          .heading{

            display:none;
          }

          .menu-btn{

            width:100%;
          }

          .dropdown-box{

            margin-top:15px;
          }

          /* CONTENT */

          .content{

            padding:15px;
          }
        }

      `}</style>

    </div>
  );
}