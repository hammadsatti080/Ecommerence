import { Link, useNavigate } from "react-router-dom";
import RatingModal from "./RatingModal";
import { FaStar } from "react-icons/fa";
import { FaStore } from "react-icons/fa";
import { useState } from "react";
export default function Navbar() {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handlelog = () => {
    navigate("/mainauth");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top border-bottom">
      <div className="container">

        {/* Brand */}


        <Link
          className="navbar-brand fw-bold d-flex align-items-center gap-2"
          to="/"
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "12px",
              background: "#ffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#f50505",
              boxShadow: "0 8px 20px rgba(37,99,235,0.25)",
            }}
          >
            <FaStore size={18} />
          </div>

          <span
            style={{
              color: "#111",
              fontSize: "22px",
              fontWeight: "800",
              letterSpacing: "0.5px",
            }}
          >
            Ecommerce
          </span>
        </Link>

        {/* Toggle */}
        <button
          className="navbar-toggler border-0 shadow-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menu */}
        <div className="collapse navbar-collapse" id="navbarNav">

          {/* ❌ CROSS ICON (MOBILE ONLY) */}
          <div className="d-lg-none text-start mb-3 ">
            <button
              className="btn btn-light border"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              style={{
                fontSize: "18px",
                padding: "3px",
                width: "90px",
                height: "40px",
                borderRadius: "10px",
              }}
            >
              ❌
            </button>
          </div>

          {/* Links */}
          <ul className="navbar-nav me-auto ms-lg-4 gap-lg-2 mt-3 mt-lg-0">

            {[
              { name: "Home", path: "/", icon: "bi-house" },
              { name: "Product", path: "/prod", icon: "bi-box-seam" },
              { name: "Sale", path: "/sale", icon: "bi-box-seam" },
              { name: "Future Collection", path: "/collect", icon: "bi-lightning-charge" },
              { name: "Blog", path: "/blog", icon: "bi-journal-text" }
            ].map((item) => (
              <li className="nav-item" key={item.name}>

                <Link
                  className="nav-link px-3 py-2 rounded"
                  to={item.path}
                  style={{ color: "#555", transition: "0.3s" }}
                >
                  <i className={`bi ${item.icon} me-1`}></i>   {item.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className="d-flex align-items-center gap-4 ms-lg-3 mt-3 mt-lg-0">

            <button
              className="btn border"
              onClick={() => setShowModal(true)}
              style={{
                borderRadius: "10px",
                width: "45px",
                height: "45px"
              }}
            >
              <FaStar color="#f5b301" size={20} />
            </button>
            <button
              className="btn text-white px-4"
              style={{
                background: "linear-gradient(135deg,#e94560,#ff7a7a)",
                borderRadius: "10px"
              }}
              onClick={handlelog}
            >
              Sign in
            </button>

          </div>
        </div>
      </div>
      <RatingModal
        show={showModal}
        handleClose={() => setShowModal(false)}
      />
    </nav>

  );
}