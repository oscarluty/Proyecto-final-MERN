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
import ProductoForm from "./forms/ProductoForm";
import AdminScreen from "./routes/AdminScreen";
import UserScreen from "./routes/UserScreen";
import ProtectedRoute from "./ProtectedRoute";


export const EcommerceApp = () => {
  return (
    <main className="px-4 pt-6 bg-white">
      <Header></Header>
      <Menu></Menu>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/home" element={<HomeScreen />} />
        <Route path="/tienda" element={<TiendaScreen />} />
        <Route path="/login" element={<LogInScreen />} />
        <Route path="/*" element={<Navigate to='/' />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/productos/:searchTerm" element={<ProductosDesdeApi />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/contacto" element={<ContactoScreen />} />
          <Route path="/admin" element={<AdminScreen />} />
          <Route path="/productos" element={<ProductoForm />} />
          <Route path="/users" element={<UserScreen />} />
        </Route>

      </Routes>

      <Footer></Footer>
    </main>
  )
}

