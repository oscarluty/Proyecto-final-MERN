import { fetchMarcas, fetchCategorias, fetchTipos } from '../api/createProduct';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { fetchProducts } from '../fetch/fetchProduct';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { CiMenuFries, CiCircleList  } from "react-icons/ci";


const Article = ({ imagen, nombre, descripcion, _id }) => {
  const handleBuyClick = () => {
    const phoneNumber = "595972194983";
    const message = `Hola, tengo una pregunta sobre ${nombre}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <article className="bg-white rounded-xl overflow-hidden shadow-lg">
      <img src={imagen} alt={nombre} className="w-full h-48 object-cover" />
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

const TiendaScreen = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTipo, setSelectedTipo] = useState('');
  const [selectedMarca, setSelectedMarca] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        const [productsData, marcasData, tiposData] = await Promise.all([
          fetchProducts(),
          fetchMarcas(),
          fetchTipos()
        ]);
        setProducts(productsData);
        setMarcas(marcasData);
        setTipos(tiposData);
        setLoading(false);
      } catch (err) {
        console.error('Error loading data:', err);
        setError('Failed to load data. Please try again later.');
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleFilterClick = (tipo, marca) => {
    setSelectedTipo(tipo);
    setSelectedMarca(marca);
    setMenuOpen(false);
  };

  const filteredProducts = products.filter(product => 
    (!selectedTipo || product.tipo === selectedTipo) &&
    (!selectedMarca || product.marca === selectedMarca)
  );

  const getMarcasForTipo = (tipoId) => {
    const productsForTipo = products.filter(product => product.tipo === tipoId);
    const marcasForTipo = [...new Set(productsForTipo.map(product => product.marca))];
    return marcas.filter(marca => marcasForTipo.includes(marca._id));
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <nav className="z-50">
        <div className="h-[10vh] flex justify-between items-center px-4 py-4 lg:py-5 lg:px-10 border-b">
          <div className="hidden md:flex lg:flex flex-1 justify-center items-center font-normal">
            <ul className="flex gap-8 text-[18px]">
              {tipos.map(tipo => {
                const marcasForTipo = getMarcasForTipo(tipo._id);
                if (marcasForTipo.length === 0) return null;

                return (
                  <div key={tipo._id} className="group">
                    <button className="hover:text-slate-700 transition border-b-2 border-white hover:border-slate-700 cursor-pointer text-slate-700">
                      {tipo.nombre}
                    </button>
                    <div className="hidden group-hover:flex flex-col absolute left-0 p-10 w-full bg-white z-20 text-black duration-300">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                        {marcasForTipo.map(marca => (
                          <div key={marca._id} className="flex flex-col">
                            <Link 
                              to="#" 
                              onClick={() => handleFilterClick(tipo._id, marca._id)} 
                              className="hover:underline hover:text-slate-700"
                            >
                              {marca.nombre}
                            </Link>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </ul>
          </div>
          <button className="block md:hidden transition-none" onClick={toggleMenu}>
            {menuOpen ? <FaTimes /> : <CiCircleList  />}
          </button>
        </div>

        {/* Slide bar */}
        <div className={`fixed top-0 left-0 h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${menuOpen ? 'translate-x-0' : '-translate-x-full'} md:hidden z-40`}>
          <div className="flex justify-end p-4">
            <button onClick={toggleMenu}>
              <FaTimes />
            </button>
          </div>
          <ul className="flex flex-col items-start py-4 px-4">
            {tipos.map(tipo => {
              const marcasForTipo = getMarcasForTipo(tipo._id);
              if (marcasForTipo.length === 0) return null;

              return (
                <li key={tipo._id} className="w-full mb-2">
                  <button 
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={() => setSelectedTipo(tipo._id)}
                  >
                    {tipo.nombre}
                  </button>
                  <ul className="pl-8">
                    {marcasForTipo.map(marca => (
                      <li key={marca._id}>
                        <button 
                          className="w-full text-left px-4 py-2 hover:bg-gray-100"
                          onClick={() => handleFilterClick(tipo._id, marca._id)}
                        >
                          {marca.nombre}
                        </button>
                      </li>
                    ))}
                  </ul>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      <div className="w-full flex justify-center items-start p-8">
        <div className="articles grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl">
          {filteredProducts.map((product) => (
            <Article
              key={product._id}
              _id={product._id}
              imagen={product.imagen}
              nombre={product.nombre}
              descripcion={product.descripcion}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TiendaScreen;