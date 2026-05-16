import { useState } from "react";
import { FaStar } from "react-icons/fa";
import "./ratingModal.css";

export default function RatingModal({ show, handleClose }) {

  const [email, setEmail] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [message, setMessage] = useState("");
  const [flipped, setFlipped] = useState(false);

  const submitRating = async () => {

    try {

      const response = await fetch(
        "https://ecommerence-backend-jade.vercel.app/api/rating/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userEmail: email,
            userWebsiteRating: rating,
            userReviewMessage: message,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {

        setFlipped(true); // ✅ FLIP ONLY ON SUCCESS

        setTimeout(() => {
          alert("Thanks for rating ❤️");
        }, 300);
      }

    } catch (error) {
      console.log(error);
    }
  };

  const closeModal = () => {
    setFlipped(false);
    setEmail("");
    setRating(0);
    setMessage("");
    handleClose();
  };

  if (!show) return null;

  return (
    <div className="modal-overlay">

      <div className="flip-card">

        {/* IMPORTANT: flip is here */}
        <div className={`flip-inner ${flipped ? "flipped" : ""}`}>

          {/* FRONT SIDE */}
          <div className="modal-box front">

            <h3 className="title">⭐ Rate Us</h3>

            <input
              type="email"
              placeholder="Enter your email"
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <textarea
              className="textarea"
              rows="3"
              placeholder="Write feedback..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            {/* STARS */}
            <div className="stars">
              {[...Array(5)].map((_, index) => {

                const currentRating = index + 1;

                return (
                  <FaStar
                    key={index}
                    size={32}
                    className="star"
                    color={currentRating <= (hover || rating) ? "#ffd700" : "#444"}
                    onClick={() => setRating(currentRating)}
                    onMouseEnter={() => setHover(currentRating)}
                    onMouseLeave={() => setHover(null)}
                  />
                );
              })}
            </div>

            <button className="btn-gradient" onClick={submitRating}>
              Submit Review
            </button>

            <button className="close-btn" onClick={closeModal}>
              ✖
            </button>

          </div>

          {/* BACK SIDE */}
          <div className="modal-box back">

            <h3 className="title">🎉 Thank You!</h3>

            <p><b>Email:</b> {email}</p>
            <p><b>Rating:</b> {rating} ⭐</p>
            <p><b>Message:</b> {message}</p>

            <button
              className="btn-gradient"
              onClick={() => setFlipped(false)}
            >
              Go Back
            </button>

            <button className="close-btn" onClick={closeModal}>
              ✖
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}