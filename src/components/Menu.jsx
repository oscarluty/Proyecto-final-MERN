import React from 'react'
import { NavLink, Link } from 'react-router-dom'

export const Menu = () => {
  return (
    <section >
      <hr />
      <ul className="bg-white flex place-content-center items-center space-x-2">
        <li>
          <Link to='/tienda'>
            <button className="bg-transparent text-slate-700 font-semibold 
         transition duration-300 ease-in-out transform hover:-translate-y-1">
              Tienda
            </button>
          </Link>
        </li>
        <li>
          <Link to='/contacto'>
            <button className="bg-transparent text-slate-700 font-semibold 
         transition duration-300 ease-in-out transform hover:-translate-y-1">
              Contacto
            </button>
          </Link>
        </li>
      </ul>
    </section>
  )
}
