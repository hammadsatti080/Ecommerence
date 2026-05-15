import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function UserNavbar() {

  const [search, setSearch] = useState("");

  const cards = [
    {
      title: "Order History",
      icon: "bi bi-clock-history",
      link: "/userorders"
    },
    {
      title: "User Rating",
      icon: "bi bi-star-fill",
      link: "/Userrating"
    },
    {
      title: "Saved",
      icon: "bi bi-bookmark-fill",
      link: "/save"
    },
    {
      title: "User Prof",
      icon: "bi bi-person-circle",
      link: "/userprof"
    },
    {
      title: "Logout",
      icon: "bi bi-box-arrow-right",
      link: "/"
    },


  ];

  // Filter cards
  const filteredCards = cards.filter((card) =>
    card.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>

      {/* Search Field */}
      <div className="container mt-4">
        <input
          type="text"
          className="form-control shadow-sm"
          placeholder="Search cards by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Cards Section */}
      <div className="container mt-1 full-height">
        <div className="row g-4 justify-content-center">

          {filteredCards.length > 0 ? (
            filteredCards.map((card, index) => (
              <div key={index} className="col-md-4 col-sm-6">

                <a
                  href={card.link}
                  style={{ textDecoration: "none" }}
                >
                  <div className="card text-center shadow-sm p-4 h-100 hover-card">

                    <i className={`${card.icon} fs-1 mb-3`}></i>

                    <h5 className="fw-bold text-dark">
                      {card.title}
                    </h5>

                  </div>
                </a>

              </div>
            ))
          ) : (
            <h4 className="text-center mt-5">
              No Card Found
            </h4>
          )}

        </div>
      </div>

      {/* Hover effect */}
      <style>{`
       .full-height {
         padding-top: 20px;
        padding-bottom: 20px;
         }

        .hover-card {
          cursor: pointer;
          transition: 0.3s ease;
          border-radius: 12px;
        }

        .hover-card:hover {
          transform: translateY(-5px);
          background-color: #f8f9fa;
          box-shadow: 0 10px 20px rgba(0,0,0,0.15);
        }

        i {
          color: #ff6600;
        }
      `}</style>

    </div>
  );
}