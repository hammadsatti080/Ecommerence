import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Item() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  //const [activeCategory, setActiveCategory] = useState("");
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [sortOrder, setSortOrder] = useState("");
  const [flippedCard, setFlippedCard] = useState(null);

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

  /* FILTER */
  let filteredProducts = products.filter(
    (p) => p.category === activeCategory
  );
  

  /* SORT */
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

      {/* HEADER */}
      <div style={styles.headerBox}>
        <h1 style={styles.title}>🛒 Visit Inventory</h1>
      </div>

      {/* TOP BAR */}
      <div style={styles.topBar}>

        {/* CATEGORY */}
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

        {/* SORT */}
        <select
          style={styles.select}
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="">Sort By Price</option>
          <option value="lowToHigh">Low → High</option>
          <option value="highToLow">High → Low</option>
        </select>

      </div>

      {/* GRID */}
      <div style={styles.grid}>

        {filteredProducts.map((p, index) => (
          <div
            key={p._id}
            style={styles.cardContainer}
            onClick={() =>
              setFlippedCard(flippedCard === index ? null : index)
            }
          >

            <div
              style={{
                ...styles.cardInner,
                transform:
                  flippedCard === index
                    ? "rotateY(180deg)"
                    : "rotateY(0deg)"
              }}
            >

              {/* FRONT (IMAGE ONLY) */}
              <div style={styles.front}>
                <img src={p.image} alt={p.name} style={styles.img} />
              </div>

              {/* BACK (DETAILS) */}
              <div style={styles.back}>
                <h4 style={{ margin: 0 }}>{p.name}</h4>

                <p style={{ color: "#aaa", margin: "5px 0" }}>
                  Rs: {p.price}
                </p>

                {p.discount > 0 && (
                  <p style={{ color: "lightgreen", margin: 0 }}>
                     Rs: {getFinalPrice(p.price, p.discount)} (-{p.discount}%)
                  </p>
                )}

                <p style={{ fontSize: "12px" }}>
                  Stock: {p.stock}
                </p>

                <button
                  style={styles.buyBtn}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleBuyNow(p);
                  }}
                >
                  Buy Now →
                </button>
              </div>

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
    fontSize: "26px"
  },

  topBar: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
    flexWrap: "wrap",
    gap: "10px"
  },

  categoryRow: {
    display: "flex",
    gap: "10px",
    overflowX: "auto"
  },

  catBtn: {
    padding: "8px 14px",
    borderRadius: "20px",
    border: "1px solid #ddd",
    background: "#fff"
  },

  activeBtn: {
    padding: "8px 14px",
    borderRadius: "20px",
    border: "none",
    background: "#111",
    color: "#fff"
  },

  select: {
    padding: "10px",
    borderRadius: "10px",
    border: "1px solid #ddd"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: "16px"
  },

  /* FLIP CARD */
  cardContainer: {
    perspective: "1000px",
    height: "260px",
    cursor: "pointer"
  },

  cardInner: {
    width: "100%",
    height: "100%",
    position: "relative",
    transition: "transform 0.6s",
    transformStyle: "preserve-3d"
  },

  front: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backfaceVisibility: "hidden",
    borderRadius: "14px",
    overflow: "hidden"
  },

  back: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backfaceVisibility: "hidden",
    transform: "rotateY(180deg)",
    background: "#111",
    color: "#fff",
    borderRadius: "14px",
    padding: "15px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  },

  img: {
    width: "100%",
    height: "100%",
    objectFit: "cover"
  },

  buyBtn: {
    padding: "10px",
    borderRadius: "10px",
    border: "none",
    background: "linear-gradient(135deg,#2563eb,#1d4ed8)",
    color: "#fff",
    fontWeight: "600",
    cursor: "pointer"
  }
};