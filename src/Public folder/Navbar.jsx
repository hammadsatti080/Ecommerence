import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handlelog = () => {
    navigate("/mainauth");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top border-bottom">
      <div className="container">

        {/* Brand */}
        <Link className="navbar-brand fw-bold d-flex align-items-center gap-2" to="/">
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: "linear-gradient(135deg,#e94560,#ff7a7a)"
            }}
          />
          <span style={{ color: "#111", fontSize: 18 }}>Ecommerce</span>
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
               { name: "Future Collection", path: "/collect", icon: "bi-lightning-charge"  },
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
    </nav>
  );
}