import { Link } from "react-router-dom"
import { useState } from "react"
import { TarjetaProductos2 } from "../components/TarjetaProductos2"

export const TiendaScreen = () => {
  const [isDropdownWOpen, setIsDropdownWOpen] = useState(false)

  const toggleDropdownW = () => {
    setIsDropdownWOpen(!isDropdownWOpen)
  }
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  return (
    <section >
      <hr />
      <ul className="bg-white flex place-content-center items-center space-x-5 ">
        <li>
          
            <button onClick={toggleDropdownW} className="bg-transparent text-slate-700 font-semibold 
         transition duration-300 ease-in-out transform hover:-translate-y-1">
              Wrangler
            </button>
            {isDropdownWOpen && (
              <ul className="absolute  mt-2 w-48 bg-white border rounded shadow-lg">
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
          
            <button onClick={toggleDropdown} className="bg-transparent text-slate-700 font-semibold 
         transition duration-300 ease-in-out transform hover:-translate-y-1">
              Lee
            </button>
            {isDropdownOpen && (
              <ul className="absolute  mt-2 w-48 bg-white border rounded shadow-lg">
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
          <Link to='/contacto'>
            <button className="bg-transparent text-slate-700 font-semibold 
         transition duration-300 ease-in-out transform hover:-translate-y-1">
              Otros
            </button>
          </Link>
        </li>
      </ul>
      <TarjetaProductos2></TarjetaProductos2>
    </section>
  )
}
