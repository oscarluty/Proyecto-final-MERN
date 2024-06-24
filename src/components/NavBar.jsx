import buscar from '../assets/img/buscar.png'
import whatsapp from '../assets/img/whatsapp.png'
import user from '../assets/img/usuario.png'
import burgerMenu from '../assets/img/burger.png'
import { Link } from 'react-router-dom'
export const NavBar = () => {
  return (
    <>
      <ul className='bg-white hidden sm:flex text-[18px] sm:w-[438px] sm:place-content-end sm:text-[16] sm:items-center space-x-4'>
        <li>
          <img src={buscar} alt="logo" className="size-5 cursor-pointer transition duration-300 ease-in-out transform hover:-translate-y-1"></img>
        </li>
        <li>
          <img src={whatsapp} alt="logo" className="size-5 cursor-pointer transition duration-300 ease-in-out transform hover:-translate-y-1"></img>
        </li>
        <li>
          <Link to='/login'>
          <img src={user} alt="logo" className="size-5 cursor-pointer transition duration-300 ease-in-out transform hover:-translate-y-1"></img>
          </Link>
        </li>
      </ul>
      <img src={burgerMenu} className='w-10 h-4 cursor-pointer sm:hidden' alt="menu" />
    </>
  )
}
