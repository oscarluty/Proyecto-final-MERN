import { Header } from "./components/Header"
import { TarjetaProductos2 } from "./components/TarjetaProductos2"
import { Footer } from "./components/Footer"
import { Menu } from "./components/Menu";
import Carousel from "./components/Carousel";
import { Navigate, Route, Routes } from "react-router-dom";
import { TiendaScreen } from "./routes/TiendaScreen";
import { ContactoScreen } from "./routes/ContactoScreen";
import { HomeScreen } from "./routes/HomeScreen";
import { LogInScreen } from "./routes/LogInScreen";
import RegisterForm from "./forms/RegisterForm";
import { AboutUs } from "./components/AboutUs";
import { ProductosDesdeApi } from "./components/ProductosDesdeApi";

export const EcommerceApp = () => {
  return (
    <main className="px-4 pt-6 bg-white">
      <Header></Header>
      <Menu></Menu>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/home" element={<HomeScreen />} />
        <Route path="/tienda" element={<TiendaScreen />} />
        <Route path="/contacto" element={<ContactoScreen />} />
        <Route path="/login" element={<LogInScreen />} />
        <Route path="/*" element={<Navigate to='/' />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/productos/:searchTerm" element={<ProductosDesdeApi />} />
      </Routes>

      <Footer></Footer>
    </main>
  )
}

