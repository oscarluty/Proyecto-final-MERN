import { CiMenuFries } from "react-icons/ci";
import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { useState } from "react";

const NavBar = () => {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const content = <>
    <div className="lg:hidden z-50 block absolute top-64 w-full left-0 right-0 bg-slate-400 backdrop-blur-lg bg-opacity-30 transition">
      <ul className="text-center text-xl p-20">

        {/* inicio sub-menu */}
        <div className="group">
          <button className="hover:text-slate-700 transition border-b-2 border-white hover:border-slate-700 cursor-pointer text-slate-700">Vestimenta</button>
          <div className="hidden group-hover:flex flex-col absolute left-0 p-10 w-full bg-white z-20 text-black duration-300">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              <div className="flex flex-col">
                <h3 className="mb-4 text-2xl text-slate-700">Wrangler</h3>
                <a href="" className="hover:underline hover:text-slate-700">Camisa</a>
                <a href="" className="hover:underline hover:text-slate-700">Pantalon</a>
                <a href="" className="hover:underline hover:text-slate-700">Remera</a>
                <a href="" className="hover:underline hover:text-slate-700">Abrigo</a>
              </div>
              <div className="flex flex-col">
                <h3 className="mb-4 text-2xl text-slate-700">Lee</h3>
                <a href="" className="hover:underline hover:text-slate-700">Camisa</a>
                <a href="" className="hover:underline hover:text-slate-700">Pantalon</a>
                <a href="" className="hover:underline hover:text-slate-700">Remera</a>
              </div>
            </div>

          </div>
        </div>
        {/* fin sub-menu */}

        <Link to='/'>
          <li className="my-4 py-4 border-b border-slate-700 text-slate-700 hover:text-slate-700 transition-all duration-150 hover:bg-slate-200 hover:rounded">Accesorios</li>
        </Link>
      </ul>
    </div>
  </>
  return (
    <nav className="z-50">
      <div className="h-[10vh] flex justify-between items-center px-4 py-4 lg:py-5 lg:px-10 border-b">
        <div className="hidden md:flex lg:flex flex-1 justify-center items-center font-normal">
          <ul className="flex gap-8 text-[18px]">

            {/* inicio sub-menu */}
            <div className="group">
              <button className="hover:text-slate-700 transition border-b-2 border-white hover:border-slate-700 cursor-pointer text-slate-700">Vestimenta</button>
              <div className="hidden group-hover:flex flex-col absolute left-0 p-10 w-full bg-white z-20 text-black duration-300">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                  <div className="flex flex-col">
                    <h3 className="mb-4 text-2xl text-slate-700">Wrangler</h3>
                    <a href="" className="hover:underline hover:text-slate-700">Camisa</a>
                    <a href="" className="hover:underline hover:text-slate-700">Pantalon</a>
                    <a href="" className="hover:underline hover:text-slate-700">Remera</a>
                    <a href="" className="hover:underline hover:text-slate-700">Abrigo</a>
                  </div>
                  <div className="flex flex-col">
                    <h3 className="mb-4 text-2xl text-slate-700">Lee</h3>
                    <a href="" className="hover:underline hover:text-slate-700">Camisa</a>
                    <a href="" className="hover:underline hover:text-slate-700">Pantalon</a>
                    <a href="" className="hover:underline hover:text-slate-700">Remera</a>
                  </div>
                </div>

              </div>
            </div>
            {/* fin sub-menu */}

            <Link to='/'>
              <li className="hover:text-slate-700 transition border-b-2 border-white hover:border-slate-700 cursor-pointer">Accesorios</li>
            </Link>
          </ul>
        </div>
        <div>
          {click && content}
        </div>
        <button className="block sm:hidden transition-none" onClick={handleClick}>
          {click ? <FaTimes /> : <CiMenuFries  />}
        </button>

      </div>
    </nav>
  )
}

export default NavBar;
