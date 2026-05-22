import React, { useEffect, useState } from "react";

const Allcategory = () => {
    const [products, setProducts] = useState([]);
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        Promise.all([
            fetch("https://ecommerence-backend-jade.vercel.app/api/Saleprod").then((res) =>
                res.json()
            ),
            fetch("https://ecommerence-backend-jade.vercel.app/api/products").then((res) =>
                res.json()
            ),
        ])
            .then(([saleData, productData]) => {
                const saleProducts = Array.isArray(saleData)
                    ? saleData
                    : saleData.data || [];

                const normalProducts = Array.isArray(productData)
                    ? productData
                    : productData.data || [];

                setProducts([...saleProducts, ...normalProducts]);
            })
            .catch((err) => console.log(err));
    }, []);

    const visibleProducts = showAll
        ? products
        : products.slice(0, 10);

    return (
        <div className="container-fluid mt-3">
               {/* HEADER */}
      <div style={styles.headerBox}>
        <h1 style={styles.title}>🛒 Our Inventory</h1>
      </div>
            <div className="row g-2">

                {visibleProducts.map((item, index) => (
                    <div
                        key={item._id || index}
                        className="col-6 col-md-2"
                    >
                        {/* FLIP CARD */}
                        <div
                            style={{
                                perspective: "1000px",
                                height: "240px",
                            }}
                        >
                            <div
                                style={{
                                    position: "relative",
                                    width: "100%",
                                    height: "70%",
                                    transition: "transform 0.6s",
                                    transformStyle: "preserve-3d",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform =
                                        "rotateY(180deg)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform =
                                        "rotateY(0deg)";
                                }}
                            >

                                {/* FRONT SIDE */}
                                <div
                                    style={{
                                        position: "absolute",
                                        width: "100%",
                                        height: "100%",
                                        backfaceVisibility: "hidden",
                                        background: "#fff",
                                        borderRadius: "10px",
                                        overflow: "hidden",
                                        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                                    }}
                                >
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        style={{
                                            width: "100%",
                                            height: "120px",
                                            objectFit: "cover",
                                        }}
                                    />

                                    <div style={{ padding: "8px" }}>
                                        <h6 style={{ fontSize: "13px" }}>
                                            {item.name}
                                        </h6>
                                        <p
                                            style={{
                                                fontSize: "11px",
                                                color: "#777",
                                            }}
                                        >
                                            {item.category}
                                        </p>
                                    </div>
                                </div>

                                {/* BACK SIDE */}
                                <div
                                    style={{
                                        position: "absolute",
                                        width: "100%",
                                        height: "100%",
                                        backfaceVisibility: "hidden",
                                        transform: "rotateY(180deg)",
                                        background: "#111",
                                        color: "#fff",
                                        borderRadius: "10px",
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        textAlign: "center",
                                        padding: "10px",
                                    }}
                                >
                                    <h5>{item.name}</h5>

                                    <h3 style={{ color: "#00ff88" }}>
                                        Rs {item.price}
                                    </h3>

                                    <p style={{ fontSize: "12px" }}>
                                        {item.description}
                                    </p>
                                </div>

                            </div>
                        </div>
                    </div>
                ))}

            </div>

            {/* BUTTON */}
            {products.length > 10 && (
                <div className="text-center mt-4">
                    <button
                        className="btn btn-dark px-4"
                        onClick={() => setShowAll(!showAll)}
                    >
                        {showAll ? "Show Less" : "Learn More"}
                    </button>
                </div>
            )}
        </div>
    );
};

export default Allcategory;

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
}