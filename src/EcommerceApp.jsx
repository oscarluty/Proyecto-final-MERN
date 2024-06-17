import { Menu } from "./components/Menu"
import { NavBar } from "./components/NavBar"
import { TarjetaProductos1 } from "./components/TarjetaProductos1"
import { TarjetaProductos2 } from "./components/TarjetaProductos2"
import { Footer } from "./components/Footer"

export const EcommerceApp = () => {
  return (
    <>
    <NavBar></NavBar>
    <Menu></Menu>
    <TarjetaProductos1></TarjetaProductos1>
    <TarjetaProductos2></TarjetaProductos2>
    <Footer></Footer>
    </>
    )
}

