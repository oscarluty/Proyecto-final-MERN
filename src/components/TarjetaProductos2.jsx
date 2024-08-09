import React, { useState, useEffect } from 'react';
import { fetchProducts } from '../fetch/fetchProduct';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';

const Article = ({ imagen, nombre, descripcion, marca, _id }) => {
  const handleBuyClick = () => {
    const phoneNumber = "595994881715";
    const productUrl = `https://www.jeanvernier.com.py/product/${_id}`;
    
    const message = `Hola, tengo una pregunta sobre ${nombre}`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <article className="bg-white rounded-xl overflow-hidden shadow-lg relative">
      <div className="relative">
        <img src={imagen} alt={nombre} className="w-full h-48 object-cover" />
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-25 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
          <span className="text-white text-sm font-semibold">{marca}</span>
        </div>
      </div>
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{nombre}</h2>
        <p className="text-gray-600 mb-4">{descripcion}</p>
        <button 
          onClick={handleBuyClick}
          className="flex items-center justify-center space-x-2 text-slate-600 hover:text-slate-800 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-opacity-50 rounded-lg px-4 py-2"
        >
          <ShoppingCartIcon className="h-5 w-5" />
          <span>Comprar</span>
        </button>
      </div>
    </article>
  );
};

export const TarjetaProductos2 = ({ filterCategoria, filterMarca }) => {
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

  const filteredProducts = products.filter(product => {
    if (!filterCategoria && !filterMarca) return true;
    if (filterCategoria && filterMarca) {
      return product.categoria.$oid === filterCategoria && product.marca.$oid === filterMarca;
    }
    if (filterCategoria) return product.categoria.$oid === filterCategoria;
    if (filterMarca) return product.marca.$oid === filterMarca;
  });

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="w-full flex justify-center items-start p-8">
      <div className="articles grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl">
        {filteredProducts.map((product) => (
          <Article
            key={product._id}
            _id={product._id}
            imagen={product.imagen}
            nombre={product.nombre}
            descripcion={product.descripcion}
            marca={product.marca.nombre} // assuming product.marca contains an object with a 'nombre' field
          />
        ))}
      </div>
    </div>
  );
};
