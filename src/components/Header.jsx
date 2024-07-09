import React, { useState } from "react";
import { Menu } from "./Menu";
import buscar from '../assets/img/buscar.png';
import whatsapp from '../assets/img/whatsapp.png';
import user from '../assets/img/usuario.png';
import burgerMenu from '../assets/img/burger.png';
import logo from '../assets/img/logo.png';
import cierre from '../assets/img/cierre.png';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleClick = (e) => {
    if (isAuthenticated) {
      e.preventDefault();
      logout();
    }
  };

  const toggleSearchInput = () => {
    setShowSearchInput(!showSearchInput);
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (searchQuery.trim()) {
        navigate(`/productos/${encodeURIComponent(searchQuery)}`);
        setShowSearchInput(false);
        setSearchQuery("");
      }
    }
  };

  return (
    <header className="bg-white flex place-content-between items-center">
      <Link to='/'>
        <img src={logo} alt="logo" className="size-28"></img>
      </Link>
      <ul className='bg-white hidden sm:flex text-[18px] sm:w-[438px] sm:place-content-end sm:text-[16] sm:items-center space-x-4'>
        <li className="relative">
          {showSearchInput ? (
            <input
              type="text"
              placeholder="Buscar..."
              className="p-1 border border-gray-300 rounded"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleSearch}
            />
          ) : (
            <img
              src={buscar}
              alt="buscar"
              className="size-5 cursor-pointer transition duration-300 ease-in-out transform hover:-translate-y-1"
              onClick={toggleSearchInput}
            />
          )}
        </li>
        <li>
          <img src={whatsapp} alt="whatsapp" className="size-5 cursor-pointer transition duration-300 ease-in-out transform hover:-translate-y-1"></img>
        </li>
        <li>
          <Link to={isAuthenticated ? '/*': '/login'} onClick={handleClick}>
            <img src={isAuthenticated ? cierre : user} alt="usuario" className="size-5 cursor-pointer transition duration-300 ease-in-out transform hover:-translate-y-1"></img>
          </Link>
        </li>
      </ul>
      <img src={burgerMenu} className='w-10 h-4 cursor-pointer sm:hidden' alt="menu" />
    </header>
  );
};