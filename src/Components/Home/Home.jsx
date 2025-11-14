import React from 'react';
import LatestProducts from '../LatestProducts/LatestProducts';

const latestProductsPromise = fetch('http://localhost:5000/latest-products')
.then(res=> res.json());
const Home = () => {
    return (
        <div>
            <h1 className='bg-primary'>This is home</h1>
            <LatestProducts latestProductsPromise={latestProductsPromise}></LatestProducts>
        </div>
    );
};

export default Home;