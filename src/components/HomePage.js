import React from 'react'
import { Link } from 'react-router-dom'

const HomePage = () => {
    return (
        <div>
            <h2>Lambda Eats Presents</h2>
            <h1>BUILD YOUR OWN PIZZA</h1>
            <Link to={"/pizza"}>
                <div className="clickToBuild">ORDER NOW</div>
            </Link>

        </div>
    )
}

export default HomePage;