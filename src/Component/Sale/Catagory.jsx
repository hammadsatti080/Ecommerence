import React from "react";

const categories = [
    { id: 1, name: "Screen Protectors", icon: "📱", link: "screen", bg: "#FFF3E0", iconBg: "#FF6F00" },
    { id: 2, name: "Hoodies & Sweatshirts", icon: "👕", link: "hoddies", bg: "#E8F5E9", iconBg: "#2E7D32" },
    { id: 3, name: "Microphones", icon: "🎙️", link: "microphones", bg: "#E3F2FD", iconBg: "#1565C0" },
    { id: 7, name: "Mobile", icon: "📱", link: "mob", bg: "#E0F7FA", iconBg: "#00695C" },
     { id: 7, name: "Jewellery", icon: "💍", link: "jew", bg: "#E0F7FA", iconBg: "#00695C" },
   
];

export default function Catagory() {
    return (
        <>
            <style>{`
                .cat-wrapper{
                    width:90%;
                    margin:30px auto;
                }

                .cat-header{
                    display:flex;
                    justify-content:space-between;
                    align-items:center;
                    margin-bottom:15px;
                }

                .cat-title{
                    font-size:22px;
                    font-weight:700;
                }

                .cat-grid{
                    display:grid;
                    grid-template-columns:repeat(4,1fr);
                    gap:15px;
                }

                .cat-card{
                    display:flex;
                    flex-direction:column;
                    align-items:center;
                    justify-content:center;
                    padding:14px;
                    border-radius:14px;
                    text-decoration:none;
                    box-shadow:0 3px 10px rgba(0,0,0,0.08);
                    transition:0.3s;
                }

                .cat-card:hover{
                    transform:translateY(-5px);
                    box-shadow:0 8px 20px rgba(0,0,0,0.15);
                }

                .cat-icon{
                    width:55px;
                    height:55px;
                    border-radius:50%;
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    font-size:26px;
                    margin-bottom:10px;
                }

                .cat-name{
                    font-size:12px;
                    font-weight:600;
                    text-align:center;
                    color:#333;
                }

                /* 📱 MOBILE DESIGN (HORIZONTAL SCROLL LIKE DARAZ) */
                @media (max-width:768px){
                    .cat-wrapper{
                        width:95%;
                    }

                    .cat-grid{
                        display:flex;
                        overflow-x:auto;
                        gap:12px;
                        padding-bottom:10px;
                    }

                    .cat-card{
                        min-width:110px;
                        flex-shrink:0;
                    }

                    .cat-grid::-webkit-scrollbar{
                        display:none;
                    }

                    .cat-title{
                        font-size:18px;
                    }
                }
            `}</style>

            <div className="cat-wrapper">

                <div className="cat-header">
                    <h2 className="cat-title">🗂️ Popular Categories</h2>
                </div>

                <div className="cat-grid">
                    {categories.map((cat) => (
                        <a
                            key={cat.id}
                            href={cat.link}
                            className="cat-card"
                            style={{ background: cat.bg }}
                        >
                            <div
                                className="cat-icon"
                                style={{ background: cat.iconBg + "22" }}
                            >
                                {cat.icon}
                            </div>

                            <div className="cat-name">
                                {cat.name}
                            </div>
                        </a>
                    ))}
                </div>

            </div>
        </>
    );
}