import React from 'react';
import { Link } from 'react-router';

const Product = ({product}) => {
    const { title, price_min,  price_max, image,_id } = product;
    return (
        <div>
            <div className="card bg-base-300  shadow-sm">
  <figure className="px-4 pt-4">
    <img
      src={image}
      alt="Shoes"
      className="rounded-xl"/>
  </figure>
  <div className="card-body">
    <h2 className="card-title">{title}</h2>
    <p className='text-start'>Price:${price_min} - {price_max}</p>
    
    <div className="card-actions">
      <Link to={`/productDetailse/${_id}`} className="btn btn-primary w-full">View Detailse</Link>
    </div>
  </div>
</div>
        </div>
    );
};

export default Product;