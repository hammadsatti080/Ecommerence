import { useState } from "react";
import { FaStar } from "react-icons/fa";

export default function RatingModal({ show, handleClose }) {

  const [email, setEmail] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [message, setMessage] = useState("");

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
        alert("Thanks for rating ❤️");

        setEmail("");
        setRating(0);
        setMessage("");

        handleClose();
      }

    } catch (error) {
      console.log(error);
    }
  };

  if (!show) return null;

  return (
    <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
      style={{ background: "rgba(0,0,0,0.5)", zIndex: 9999 }}>

      <div className="bg-white p-4" style={{ width: "400px", borderRadius: "15px" }}>

        <h4>Rate Us</h4>

        {/* EMAIL INPUT */}
        <input
          type="email"
          placeholder="Enter your email"
          className="form-control mb-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <textarea
          className="form-control mb-3"
          rows="3"
          placeholder="Write feedback..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        {/* STARS */}
        <div className="d-flex gap-2 justify-content-center mb-3">

          {[...Array(5)].map((_, index) => {

            const currentRating = index + 1;

            return (
              <FaStar
                key={index}
                size={35}
                style={{ cursor: "pointer" }}
                color={currentRating <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                onClick={() => setRating(currentRating)}
                onMouseEnter={() => setHover(currentRating)}
                onMouseLeave={() => setHover(null)}
              />
            );
          })}
        </div>

        <button
          className="btn w-100 text-white"
          style={{ background: "linear-gradient(135deg,#e94560,#ff7a7a)" }}
          onClick={submitRating}
        >
          Submit Rating
        </button>

      </div>
    </div>
  );
}