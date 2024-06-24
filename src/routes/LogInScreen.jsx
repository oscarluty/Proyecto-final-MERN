import { Link } from 'react-router-dom'
import { useState } from 'react'

export const LogInScreen = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }
  return (
    <nav className="bg-white shadow-md items-center">
        <ul className="flex space-x-4">
          <li>
            <Link to='/' className="text-slate-700 font-semibold hover:text-slate-900">Inicio</Link>
          </li>
          <li>
            <Link to='/about' className="text-slate-700 font-semibold hover:text-slate-900">Acerca de</Link>
          </li>
          <li className="relative">
            <button 
              onClick={toggleDropdown} 
              className="text-slate-700 font-semibold hover:text-slate-900 focus:outline-none"
            >
              Servicios
            </button>
            {isDropdownOpen && (
              <ul className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg">
                <li>
                  <Link to='/service1' className="block px-4 py-2 text-slate-700 hover:bg-slate-100">Servicio 1</Link>
                </li>
                <li>
                  <Link to='/service2' className="block px-4 py-2 text-slate-700 hover:bg-slate-100">Servicio 2</Link>
                </li>
                <li>
                  <Link to='/service3' className="block px-4 py-2 text-slate-700 hover:bg-slate-100">Servicio 3</Link>
                </li>
              </ul>
            )}
          </li>
          <li>
            <Link to='/contact' className="text-slate-700 font-semibold hover:text-slate-900">Contacto</Link>
          </li>
        </ul>
    </nav>
  )
}
