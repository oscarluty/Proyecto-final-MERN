import { NavBar } from "./NavBar"
import { Menu } from "./Menu"
import logo from '../assets/img/logo.png'
import { Link } from "react-router-dom"


export const Header = () => {
  return (
    <header className="bg-white flex place-content-between items-center">
      <Link to='/'>
        <img src={logo} alt="logo" className="size-28"></img>
      </Link>
      <NavBar></NavBar>

    </header>
  )
}
