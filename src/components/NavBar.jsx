import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const NavItem = ({ title, items }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative group">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 text-slate-700 font-semibold hover:bg-slate-100 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
      >
        {title}
      </button>
      {items && (
        <div
          className={`${
            isOpen ? 'block' : 'hidden'
          } absolute left-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-10`}
        >
          {items.map((item, index) => (
            <Link
              key={index}
              to={item.link}
              className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    {
      title: 'Wrangler',
      items: [
        { name: 'Jeans', link: '/wrangler/jeans' },
        { name: 'Camisas', link: '/wrangler/camisas' },
        { name: 'Chaquetas', link: '/wrangler/chaquetas' },
      ],
    },
    {
      title: 'Lee',
      items: [
        { name: 'Jeans', link: '/lee/jeans' },
        { name: 'Camisas', link: '/lee/camisas' },
        { name: 'Chaquetas', link: '/lee/chaquetas' },
      ],
    },
    { title: 'Otros', link: '/otros' },
  ];

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="hidden md:block">
            <div className="flex items-baseline space-x-4">
              {navItems.map((item, index) => (
                <NavItem key={index} title={item.title} items={item.items} />
              ))}
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-slate-500 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-slate-500"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item, index) => (
              <NavItem key={index} title={item.title} items={item.items} />
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};