import { useEffect, useState } from "react";
const images = ["/Homescreen/Home.jpg", "/Homescreen/Home2.jpg"];
export default function Header() {

    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % images.length);
        }, 4000); // slow change (4 sec)

        return () => clearInterval(interval);
    }, []);

    const text =
        "Discover premium products at unbeatable prices. Your one-stop ecommerce destination for fashion, gadgets, and more.";

    const [displayText, setDisplayText] = useState("");

    useEffect(() => {
        let i = 0;

        const interval = setInterval(() => {
            setDisplayText(text.slice(0, i));
            i++;

            if (i > text.length) {
                clearInterval(interval);
            }
        }, 30); // speed (lower = faster)

        return () => clearInterval(interval);
    }, []);

    return (
        <div
            style={{
                width: "100%",
                height: "90vh",
                backgroundImage: `url(${images[index]})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                transition: "background-image 1s ease-in-out",
                display: "flex",
                alignItems: "center",
                position: "relative"
            }}
        >
            {/* Dark overlay */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    background: "rgba(0,0,0,0.45)"
                }}
            ></div>

            {/* Content */}
            <div className="container text-white position-relative">
                <h1 style={{ fontSize: "3rem", fontWeight: "700" }}>
                    Shop Smart, Live Better
                </h1>

                <p style={{ maxWidth: 500, fontSize: "1.1rem", marginTop: 15 }}>
                    {displayText}
                    <span style={{ borderRight: "2px solid #fff" }}></span>
                </p>


            </div>
        </div>
    );
}