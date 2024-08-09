import cierre from '../assets/img/cierre.png';
import React, { useState } from "react";
import whatsapp from '../assets/img/whatsapp.png';
import usuario from '../assets/img/usuario.png';
import logo from '../assets/img/logo.png';
import config from '../assets/img/config.png';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { XMarkIcon  } from '@heroicons/react/24/outline';
import { CiMenuFries } from "react-icons/ci";
import { FaTimes } from "react-icons/fa";




export const Header = () => {
  const { isAuthenticated, logout, user, isAdmin } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleClick = (e) => {
    if (isAuthenticated) {
      e.preventDefault();
      logout();
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="bg-white flex justify-between items-center p-4 relative">
      <div className="flex justify-between items-center w-full sm:w-auto">
        <Link to='/'>
          <img src={logo} alt="logo" className="size-28"></img>
        </Link>
        <CiMenuFries className='w-10 h-10 cursor-pointer sm:hidden' onClick={toggleMenu} />
      </div>
      <ul className='hidden sm:flex text-[18px] sm:w-[438px] justify-end text-[16px] items-center space-x-4'>
        {isAuthenticated && user && user.rol === '668366f031d497510845d8cc' && (
          <li>
            <Link to='/admin'>
              <img src={config} alt="config" className="size-5 cursor-pointer transition duration-300 ease-in-out transform hover:-translate-y-1"></img>
            </Link>
          </li>
        )}
        <li>
          <a
            href="https://wa.me/595994881715?text=Hola%21%20vengo%20de%20la%20pagina%20web%20y%20quisiera%20hacer%20una%20consulta."
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={whatsapp}
              alt="whatsapp"
              className="size-5 cursor-pointer transition duration-300 ease-in-out transform hover:-translate-y-1"
            />
          </a>
        </li>
        <li>
          <Link to={isAuthenticated ? '/*' : '/login'} onClick={handleClick}>
            <img src={isAuthenticated ? cierre : usuario} alt="usuario" className="size-5 cursor-pointer transition duration-300 ease-in-out transform hover:-translate-y-1"></img>
          </Link>
        </li>
        {isAuthenticated ? (
          <li>
            Bienvenido {user.nombre}
          </li>
        ) : null}
      </ul>

      <div className={`fixed inset-0 bg-black bg-opacity-50 z-10 transition-opacity duration-300 ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} onClick={toggleMenu}></div>
      
      <div className={`fixed left-0 top-0 h-full bg-white w-64 z-20 transform transition-transform duration-300 ${menuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex justify-end p-4">
          <FaTimes className='w-10 h-10 cursor-pointer' onClick={toggleMenu} /> {/* Usar XMarkIcon de Heroicons */}
        </div>
        <ul className='flex flex-col p-4 space-y-4'>
          <li className="flex justify-around items-center space-x-4">
            {isAuthenticated && user && user.rol === '668366f031d497510845d8cc' && (
              <Link to='/admin'>
                <img src={config} alt="config" className="size-5 cursor-pointer transition duration-300 ease-in-out transform hover:-translate-y-1" onClick={toggleMenu}></img>
              </Link>
            )}
            <a
              href="https://wa.me/595994881715?text=Hola%21%20vengo%20de%20la%20pagina%20web%20y%20quisiera%20hacer%20una%20consulta."
              target="_blank"
              rel="noopener noreferrer"
              onClick={toggleMenu}
            >
              <img
                src={whatsapp}
                alt="whatsapp"
                className="size-5 cursor-pointer transition duration-300 ease-in-out transform hover:-translate-y-1"
              />
            </a>
            <Link to={isAuthenticated ? '/*' : '/login'} onClick={(e) => { handleClick(e); toggleMenu(); }}>
              <img src={isAuthenticated ? cierre : usuario} alt="usuario" className="size-5 cursor-pointer transition duration-300 ease-in-out transform hover:-translate-y-1"></img>
            </Link>
          </li>
          {isAuthenticated && (
            <li className="text-center">
              Bienvenido {user.nombre}
            </li>
          )}
        </ul>
      </div>
    </header>
  );
};
