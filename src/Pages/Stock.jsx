import React, { useEffect } from "react";
import Productitem from "../Component/Prod/Productitem";
import Headerfile from "../Component/Prod/Headerfile";

export default function Stock() {

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <div>
      <Headerfile />
      <Productitem />
    </div>
  );
}