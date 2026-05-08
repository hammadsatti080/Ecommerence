import React, { useEffect, useState  } from "react";
import { useNavigate } from "react-router-dom";
export default function Item() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");

  const PRODUCT_API = "http://localhost:5000/api/products";
  const CATEGORY_API = "http://localhost:5000/api/categories";

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch(PRODUCT_API);
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch(CATEGORY_API);
      const data = await res.json();
      setCategories(data);

      if (data.length > 0) {
        setActiveCategory(data[0].name);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getFinalPrice = (price, discount) => {
    const p = Number(price);
    const d = Number(discount || 0);
    return (p - (p * d) / 100).toFixed(2);
  };

  const filteredProducts = products.filter(
    (p) => p.category === activeCategory
  );

  const navigate = useNavigate();
  // NAVIGATION (route-ready)


const handleBuyNow = (product) => {
  navigate(`/prod/${product._id}`);
};
  return (
    <div style={{ padding: "20px", background: "#f6f7fb", minHeight: "100vh" }}>

      {/* ================= HEADER ================= */}
      <div style={styles.headerBox}>
        <h1 style={styles.title}>🛒 Visit Inventory</h1>
        <p style={styles.subtitle}>
          Browse, select & purchase products instantly
        </p>
      </div>

      {/* ================= CATEGORY ROW ================= */}
      <div style={styles.categoryRow}>
        {categories.map((cat) => (
          <button
            key={cat._id}
            style={
              activeCategory === cat.name
                ? styles.activeBtn
                : styles.catBtn
            }
            onClick={() => setActiveCategory(cat.name)}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* ================= PRODUCTS ================= */}
      <div style={styles.grid}>
        {filteredProducts.map((p) => (
          <div key={p._id} style={styles.card}>

            <img src={p.image} alt={p.name} style={styles.img} />

            <div style={styles.body}>
              <h4 style={styles.productTitle}>{p.name}</h4>

              <p style={styles.price}>${p.price}</p>

              {p.discount > 0 && (
                <p style={styles.finalPrice}>
                  ${getFinalPrice(p.price, p.discount)} (-{p.discount}%)
                </p>
              )}

              <p style={{ fontSize: "12px", color: p.stock > 0 ? "green" : "red" }}>
                Stock: {p.stock}
              </p>

              {/* ================= BUY NOW BUTTON ================= */}
             <button
  style={styles.buyBtn}
  onClick={() => handleBuyNow(p)}
>
  Buy Now →
</button>

            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

/* ================= STYLES ================= */
const styles = {

  /* HEADER */
  headerBox: {
    textAlign: "center",
    marginBottom: "20px",
    padding: "20px",
    background: "linear-gradient(135deg, #111, #333)",
    color: "#fff",
    borderRadius: "14px"
  },

  title: {
    margin: 0,
    fontSize: "26px",
    letterSpacing: "1px"
  },

  subtitle: {
    marginTop: "6px",
    fontSize: "13px",
    opacity: 0.8
  },

  /* CATEGORY */
  categoryRow: {
    display: "flex",
    gap: "10px",
    overflowX: "auto",
    marginBottom: "20px",
    paddingBottom: "10px"
  },

  catBtn: {
    padding: "8px 14px",
    borderRadius: "20px",
    border: "1px solid #ddd",
    background: "#fff",
    cursor: "pointer",
    whiteSpace: "nowrap"
  },

  activeBtn: {
    padding: "8px 14px",
    borderRadius: "20px",
    border: "none",
    background: "#111",
    color: "#fff",
    cursor: "pointer",
    whiteSpace: "nowrap"
  },

  /* GRID */
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: "16px"
  },

  /* CARD */
  card: {
    background: "#fff",
    borderRadius: "14px",
    overflow: "hidden",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    display: "flex",
    flexDirection: "column"
  },

  img: {
    width: "100%",
    height: "160px",
    objectFit: "cover"
  },

  body: {
    padding: "12px",
    display: "flex",
    flexDirection: "column",
    gap: "6px"
  },

  productTitle: {
    fontSize: "15px",
    margin: 0
  },

  price: {
    color: "#888",
    margin: 0
  },

  finalPrice: {
    color: "green",
    fontWeight: "bold",
    margin: 0
  },

  /* BUY BUTTON */
  buyBtn: {
    marginTop: "10px",
    padding: "10px",
    border: "none",
    borderRadius: "10px",
    background: "linear-gradient(135deg,#2563eb,#1d4ed8)",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "600"
  }
};