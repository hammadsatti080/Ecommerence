import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TermsConditions from "../../Public folder/TermsConditions";

export default function Header() {

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
        }, 30);

        return () => clearInterval(interval);
    }, []);
    const navigate = useNavigate();
    const handlebutton = () => {
        navigate("/prod")
    }

    const [openModal, setOpenModal] = useState(false);

    // button function
    const handlebuttons = () => {
        setOpenModal(true);
    };

    return (
        <div
            style={{
                width: "100%",
                height: "90vh",

                /* Beautiful Gradient Background */
                background: `linear-gradient(
                    135deg,
                    #0f2027,
                    #203a43,
                    #2c5364,
                    #6a11cb,
                    #2575fc
                )`,

                backgroundSize: "400% 400%",
                animation: "gradientMove 12s ease infinite",

                display: "flex",
                alignItems: "center",
                position: "relative",
                overflow: "hidden"
            }}
        >
            {/* Dark overlay */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    background: "rgba(0,0,0,0.35)"
                }}
            ></div>

            {/* Glowing circles */}
            <div
                style={{
                    position: "absolute",
                    width: "300px",
                    height: "300px",
                    background: "rgba(255,255,255,0.08)",
                    borderRadius: "50%",
                    top: "-80px",
                    right: "-80px",
                    filter: "blur(20px)"
                }}
            ></div>

            <div
                style={{
                    position: "absolute",
                    width: "250px",
                    height: "250px",
                    background: "rgba(255,255,255,0.05)",
                    borderRadius: "50%",
                    bottom: "-70px",
                    left: "-70px",
                    filter: "blur(20px)"
                }}
            ></div>

            {/* Content */}
            <div className="container text-white position-relative">
                <h1
                    style={{
                        fontSize: "3.5rem",
                        fontWeight: "800",
                        letterSpacing: "1px"
                    }}
                >
                    Shop Smart, Live Better
                </h1>

                <p
                    style={{
                        maxWidth: 550,
                        fontSize: "1.15rem",
                        marginTop: 20,
                        lineHeight: "1.8"
                    }}
                >
                    {displayText}
                    <span style={{ borderRight: "2px solid #fff" }}></span>
                </p>

                <button
                    className="btn btn-light btn-lg mt-4 px-4 mx-4"
                    onClick={handlebutton}
                    style={{
                        borderRadius: "30px",
                        fontWeight: "600"
                    }}
                >
                    Explore Products
                </button>
                <button
                    className="btn btn-light btn-lg mt-4 px-4"
                    onClick={handlebuttons}
                    style={{
                        borderRadius: "30px",
                        fontWeight: "600",
                        marginLeft: "20px"
                    }}
                >
                    Terms & Conditions
                </button>
                {/* Modal */}
                {openModal && (
                    <div
                        style={{
                            position: "fixed",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100vh",
                            //    background: "rgba(0,0,0,0.6)",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            zIndex: 999
                        }}
                    >
                        <div
                            style={{

                                width: "90%",
                                maxWidth: "380px",
                                padding: "10px",
                                borderRadius: "20px",
                                position: "relative",
                                maxHeight: "90vh",

                            }}
                        >

                            {/* Separate Component */}
                            <TermsConditions setOpenModal={setOpenModal} />
                        </div>
                    </div>
                )}
            </div>

            {/* Gradient Animation */}
            <style>
                {`
                    @keyframes gradientMove {
                        0% {
                            background-position: 0% 50%;
                        }
                        50% {
                            background-position: 100% 50%;
                        }
                        100% {
                            background-position: 0% 50%;
                        }
                    }
                `}
            </style>
        </div>
    );
}