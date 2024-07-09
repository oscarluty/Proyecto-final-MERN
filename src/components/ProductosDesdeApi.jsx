import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Article = ({ imgSrc, title, text, price }) => (
  <article className='w-64 cursor-pointer relative block overflow-hidden rounded-2xl'>
    <figure className='w-full h-96 overflow-hidden'>
      <img className='w-full h-full object-cover' src={imgSrc} alt="Preview" />
    </figure>
    <div className="p-4 bg-white">
      <h2 className='mb-2 text-xl'>{title}</h2>
      <p className='text-sm'>
        {text}
      </p>
      <p className='text-lg font-bold mt-2'>${price}</p>
      <a href="#" className="inline-flex text-slate-400 mt-2" title="Read More">
        Comprar 🛒
      </a>
    </div>
  </article>
);

export const ProductosDesdeApi = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { searchTerm } = useParams();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://dummyjson.com/products/search?q=${searchTerm || 'phone'}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchTerm]);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="w-full flex justify-center items-start p-8">
      <div className="articles grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl">
        {products.map((product) => (
          <Article
            key={product.id}
            imgSrc={product.thumbnail}
            title={product.title}
            text={product.description}
            price={product.price}
          />
        ))}
      </div>
    </div>
  );
};