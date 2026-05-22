import React, { useEffect } from "react";
import Productitem from "../Component/Prod/Productitem";
import Headerfile from "../Component/Prod/Headerfile";
import Allcategory from '../Component/Sale/Catagory/Allcategory';
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
      <Allcategory />
      <Productitem />
    </div>
  );
}