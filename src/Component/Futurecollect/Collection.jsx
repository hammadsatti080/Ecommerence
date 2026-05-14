import React, { useEffect, useState } from "react";

export default function Item() {
  const [products, setProducts] = useState([]);
  const [genderFilter, setGenderFilter] = useState("male");
  const [nameFilter, setNameFilter] = useState("");
  const [flippedCard, setFlippedCard] = useState(null);

  const PRODUCT_API = "https://ecommerence-backend-jade.vercel.app/api/products";

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch(PRODUCT_API);
      const data = await res.json();

      const futureProducts = data.filter(
        (item) =>
          item.category &&
          item.category.toLowerCase() === "future product"
      );

      setProducts(futureProducts);
    } catch (err) {
      console.log(err);
    }
  };

  /* ================= FILTER ================= */
  let filteredProducts = products.filter((p) => {
    if (!p.name) return false;

    const name = p.name.toLowerCase();

    // gender filter
    if (genderFilter === "male" && !name.includes("(male)")) return false;
    if (genderFilter === "female" && !name.includes("(female)")) return false;

    // name search filter
    if (nameFilter && !name.includes(nameFilter.toLowerCase())) return false;

    return true;
  });

  return (
    <div style={{ padding: "20px", background: "#f6f7fb", minHeight: "100vh" }}>

      {/* HEADER */}
      <div style={styles.headerBox}>
        <h1 style={styles.title}>🚀 Coming Soon Products</h1>
      </div>

      {/* FILTERS */}
      <div style={styles.topBar}>

        {/* GENDER */}
        <select
          style={styles.select}
          value={genderFilter}
          onChange={(e) => setGenderFilter(e.target.value)}
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        {/* NAME SEARCH */}
        <input
          type="text"
          placeholder="Search (e.g. Leather shoes)"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
          style={styles.input}
        />

      </div>

      {/* PRODUCTS */}
      <div style={styles.grid}>

        {filteredProducts.length > 0 ? (
          filteredProducts.map((p, index) => (
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

                {/* FRONT */}
                <div style={styles.front}>
                  <img src={p.image} alt={p.name} style={styles.img} />
                </div>

                {/* BACK */}
                <div style={styles.back}>
                  <h4>{p.name}</h4>

                  <div style={styles.contact}>
                    📞 +92-300-1234567 <br />
                    📧 myapp@gmail.com
                  </div>
                </div>

              </div>
            </div>
          ))
        ) : (
          <div style={styles.emptyBox}>
            No products found
          </div>
        )}

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
    gap: "15px",
    marginBottom: "20px",
    flexWrap: "wrap"
  },

  select: {
    padding: "10px",
    borderRadius: "10px",
    border: "1px solid #ddd"
  },

  input: {
    padding: "10px",
    borderRadius: "10px",
    border: "1px solid #ddd",
    outline: "none",
    width: "220px"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: "16px"
  },

  cardContainer: {
    perspective: "1000px",
    height: "250px",
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
    justifyContent: "space-between",
    flexDirection: "column"
  },

  img: {
    width: "100%",
    height: "100%",
    objectFit: "cover"
  },

  contact: {
    fontSize: "11px",
    opacity: 0.8,
    position: "absolute",
    bottom: "10px",
  
  },

  emptyBox: {
    background: "#fff",
    padding: "40px",
    borderRadius: "14px",
    textAlign: "center",
    fontWeight: "600",
    color: "#777"
  }
};