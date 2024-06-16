import React from 'react';

function Product({ product, onDelete }) {
  return (
    <div className="product-container">
      <p className="product-name">{product.name}</p>
      <p className="product-desc">{product.description}</p>
      <p className="product-price">{product.price}</p>
      <img src={product.image} style={{ maxWidth: '100px', maxHeight: '100px' }} />
      <button className="delete" onClick={() => onDelete(product.id)}>
        Delete
      </button>
    </div>
  );
}

export default Product;
