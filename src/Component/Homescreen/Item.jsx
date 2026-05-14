/*import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Item() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");
  const [sortOrder, setSortOrder] = useState("");

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

 
  let filteredProducts = products.filter(
    (p) => p.category === activeCategory
  );


  if (sortOrder === "lowToHigh") {
    filteredProducts.sort(
      (a, b) =>
        Number(getFinalPrice(a.price, a.discount)) -
        Number(getFinalPrice(b.price, b.discount))
    );
  }

  if (sortOrder === "highToLow") {
    filteredProducts.sort(
      (a, b) =>
        Number(getFinalPrice(b.price, b.discount)) -
        Number(getFinalPrice(a.price, a.discount))
    );
  }

  const navigate = useNavigate();

  const handleBuyNow = (product) => {
    navigate(`/prod/${product._id}`);
  };

  return (
    <div style={{ padding: "20px", background: "#f6f7fb", minHeight: "100vh" }}>

     
      <div style={styles.headerBox}>
        <h1 style={styles.title}>🛒 Visit Inventory</h1>
        <p style={styles.subtitle}>
          Browse, select & purchase products instantly
        </p>
      </div>

     
      <div style={styles.topBar}>

     
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

        
        <select
          style={styles.select}
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="">Sort By Price</option>
          <option value="lowToHigh">Price: Low → High</option>
          <option value="highToLow">Price: High → Low</option>
        </select>

      </div>

   
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

              <p
                style={{
                  fontSize: "12px",
                  color: p.stock > 0 ? "green" : "red"
                }}
              >
                Stock: {p.stock}
              </p>

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


const styles = {

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

  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "15px",
    marginBottom: "20px"
  },

  categoryRow: {
    display: "flex",
    gap: "10px",
    overflowX: "auto",
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


  select: {
    padding: "10px 14px",
    borderRadius: "10px",
    border: "1px solid #ddd",
    background: "#fff",
    cursor: "pointer",
    outline: "none",
    fontWeight: "500"
  },


  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: "16px"
  },


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
*/

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Item() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const PRODUCT_API = "https://ecommerence-backend-jade.vercel.app/api/products";
  const CATEGORY_API = "https://ecommerence-backend-jade.vercel.app/api/categories";

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch(PRODUCT_API);
      const data = await res.json();

      // REMOVE FUTURE PRODUCT ITEMS
      const filtered = data.filter(
        (item) =>
          item.category &&
          item.category.toLowerCase() !== "future product"
      );

      setProducts(filtered);

    } catch (err) {
      console.log(err);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch(CATEGORY_API);
      const data = await res.json();

      // REMOVE FUTURE PRODUCT CATEGORY
      const filteredCategories = data.filter(
        (cat) =>
          cat.name &&
          cat.name.toLowerCase() !== "future product"
      );

      setCategories(filteredCategories);

      if (filteredCategories.length > 0) {
        setActiveCategory(filteredCategories[0].name);
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

  /* ================= FILTER PRODUCTS ================= */
  let filteredProducts = products.filter(
    (p) => p.category === activeCategory
  );

  /* ================= SORT PRODUCTS ================= */
  if (sortOrder === "lowToHigh") {
    filteredProducts.sort(
      (a, b) =>
        Number(getFinalPrice(a.price, a.discount)) -
        Number(getFinalPrice(b.price, b.discount))
    );
  }

  if (sortOrder === "highToLow") {
    filteredProducts.sort(
      (a, b) =>
        Number(getFinalPrice(b.price, b.discount)) -
        Number(getFinalPrice(a.price, a.discount))
    );
  }

  const navigate = useNavigate();

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

      {/* ================= TOP BAR ================= */}
      <div style={styles.topBar}>

        {/* CATEGORY ROW */}
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

        {/* SORT DROPDOWN */}
        <select
          style={styles.select}
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="">Sort By Price</option>
          <option value="lowToHigh">Price: Low → High</option>
          <option value="highToLow">Price: High → Low</option>
        </select>

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

              <p
                style={{
                  fontSize: "12px",
                  color: p.stock > 0 ? "green" : "red"
                }}
              >
                Stock: {p.stock}
              </p>

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

  /* TOP BAR */
  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "15px",
    marginBottom: "20px"
  },

  /* CATEGORY */
  categoryRow: {
    display: "flex",
    gap: "10px",
    overflowX: "auto",
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

  /* SELECT */
  select: {
    padding: "10px 14px",
    borderRadius: "10px",
    border: "1px solid #ddd",
    background: "#fff",
    cursor: "pointer",
    outline: "none",
    fontWeight: "500"
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