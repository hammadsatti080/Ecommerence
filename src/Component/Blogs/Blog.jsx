import React, { useEffect } from "react";
import "./Blog.css";
import { useNavigate } from "react-router-dom";


export default function Blog() {
    const navigate = useNavigate();
    const blogs = [
        {
            id: 1,
            category: "Technology",
            title: "Top Tech Trends Shaping E-Commerce in 2026",
            description:
                "Discover the latest innovations transforming online shopping experiences worldwide.",
            image:
                "/Homescreen/Sale/blog1.jpg",
        },
        {
            id: 2,
            category: "Shopping Guide",
            title: "How to Choose the Perfect Product Online",
            description:
                "A complete guide to making smarter purchasing decisions when shopping online.",
            image:
                "/Homescreen/Sale/blog2.jpg",
        },
        {
            id: 3,
            category: "Business",
            title: "Why Customer Experience Matters More Than Ever",
            description:
                "Learn how customer satisfaction directly impacts eCommerce success.",
            image:
                "/Homescreen/Sale/blog3.jpg",
        },
    ];
    const featuredBlog = {
        id: 1,
        title: "The Future of E-Commerce: Trends Every Business Should Know",
        image: "/Homescreen/Sale/blog.jpg",
    };
      useEffect(() => {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }, []);
    return (
        <div className="blog-page">
            {/* HERO */}
            <section className="blog-hero">
                <div className="container text-center">
                    <span className="blog-badge">Latest Insights</span>

                    <h1 className="blog-title">
                        Explore Our Latest <span>Articles & News</span>
                    </h1>

                    <p className="blog-subtitle">
                        Stay updated with industry trends, shopping guides, product
                        insights, and expert recommendations.
                    </p>
                </div>
            </section>

            {/* FEATURED BLOG */}
            <section className="container mb-5">
                <div className="featured-blog">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <img
                                src="/Homescreen/Sale/blog.jpg"
                                alt="featured"
                                className="img-fluid featured-image"
                            />
                        </div>

                        <div className="col-lg-6">
                            <span className="category">Featured</span>

                            <h2>
                                The Future of E-Commerce: Trends Every Business Should Know
                            </h2>

                            <p>
                                Explore emerging technologies, consumer behavior changes, and
                                business strategies shaping the future of digital commerce.
                            </p>

                            <button
                                className="read-btn"
                                onClick={() => navigate(`/blog/${featuredBlog.id}`)}
                            >
                                Read Article →
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* BLOG CARDS */}
            <section className="container pb-5">
                <div className="row g-4">
                    {blogs.map((blog) => (
                        <div className="col-md-4" key={blog.id}>
                            <div className="blog-card">
                                <img
                                    src={blog.image}
                                    alt={blog.title}
                                    className="blog-image"
                                />

                                <div className="blog-content">
                                    <span className="category">
                                        {blog.category}
                                    </span>

                                    <h5>{blog.title}</h5>

                                    <p>{blog.description}</p>

                                    <button
                                        className="read-btn"
                                        onClick={() => navigate(`/blog/${featuredBlog.id}`)}
                                    >
                                        Read Article →
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}