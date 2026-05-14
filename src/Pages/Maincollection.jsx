import React, { useEffect } from 'react'
import Collection from '../Component/Futurecollect/Collection'
import Collection1 from '../Component/Futurecollect/Collection1'
export default function Maincollection() {

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, []);
    return (
        <div>
            <Collection />
            <Collection1 />
        </div>
    )
}
