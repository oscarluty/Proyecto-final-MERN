import React, { useState, useEffect } from 'react';
import { fetchProducts } from '../api/fetchProduct';

const Article = ({ imagen, nombre, descripcion }) => (
  <article className='w-64 cursor-pointer relative block overflow-hidden rounded-2xl'>
    <figure className='w-full h-96 overflow-hidden'>
      <img className='w-full h-full object-cover' src={imagen} alt={nombre} />
    </figure>
    <div className="p-4 bg-white">
      <h2 className='mb-2 text-xl'>{nombre}</h2>
      <p className='text-sm'>
        {descripcion}
        <a href="#" className="inline-flex text-slate-400 mt-2" title="Read More">
          Comprar 🛒
        </a>
      </p>
    </div>
  </article>
);

export const TarjetaProductos2 = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="w-full flex justify-center items-start p-8">
      <div className="articles grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl">
        {products.map((product) => (
          <Article
            key={product._id}
            imagen={product.imagen}
            nombre={product.nombre}
            descripcion={product.descripcion}
          />
        ))}
      </div>
    </div>
  );
};