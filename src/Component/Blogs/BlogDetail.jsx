import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./BlogDetail.css"
const blogData = [
    {
        id: 1,
        title: "Top Tech Trends Shaping E-Commerce in 2026",
        category: "Technology",
        image:
            "/Homescreen/Sale/blog1.jpg",
        content: `
E-commerce is evolving faster than ever in 2026.

✔ AI personalization  
✔ Faster delivery systems  
✔ Mobile-first shopping  
✔ Smart checkout systems  

These trends are changing online shopping forever.
    `,
    },
    {
        id: 2,
        title: "How to Choose the Perfect Product Online",
        category: "Guide",
        image:
            "https://images.unsplash.com/photo-1556740749-887f6717d7e4?w=1000",
        content: `
Smart shopping tips:

✔ Check reviews  
✔ Compare prices  
✔ Read specifications  
✔ Choose trusted sellers  

These steps help you buy better products online.
    `,
    },
];

export default function BlogDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
  
    useEffect(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, []);

    const blog = blogData.find((b) => b.id === parseInt(id));

    if (!blog) {
        return (
            <div className="container py-5 text-center">
                <h2>Blog not found</h2>
            </div>
        );
    }
   

    return (
        <div className="blog-detail-page">

            {/* HERO IMAGE */}
            <div className="blog-hero">
                <img src={blog.image} alt="" />

                <div className="overlay"></div>

                <div className="hero-content container">
                    <span className="category">{blog.category}</span>
                    <h1>{blog.title}</h1>
                </div>
            </div>

            {/* CONTENT */}
            <div className="container blog-content-box">

                <button
                    className="back-btn"
                    onClick={() => navigate("/blog")}
                >
                    ← Back to Blog
                </button>

                <div className="blog-text">
                    <p style={{ whiteSpace: "pre-line" }}>
                        {blog.content}
                    </p>
                </div>

            </div>
        </div>
    );
}