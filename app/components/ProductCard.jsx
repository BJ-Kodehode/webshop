import React from 'react';

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-start hover:shadow-lg transition-shadow border border-gray-100">
      <img
        src={product.imageUrl || '/public/file.svg'}
        alt={product.name}
        className="w-full h-40 object-cover rounded mb-4 bg-gray-100"
      />
      <h2 className="text-xl font-semibold text-dark-brown mb-2">{product.name}</h2>
      <p className="text-gray-700 mb-4">{product.description}</p>
      <p className="text-lg font-bold text-deep-orange mb-2">{product.price} NOK</p>
      <button
        className="mt-auto px-4 py-2 bg-deep-orange text-white rounded hover:bg-bright-red transition-colors"
        onClick={() => onAddToCart(product)}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
