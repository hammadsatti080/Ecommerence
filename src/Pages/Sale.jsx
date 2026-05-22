import React, { useEffect } from 'react'
import Catagory from '../Component/Sale/Catagory'
import FlashSale from '../Component/Sale/FlashSale'


export default function Sale() {
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, []);
    return (
        <div>
            <FlashSale />
            <Catagory />
          
        </div>
    )
}
