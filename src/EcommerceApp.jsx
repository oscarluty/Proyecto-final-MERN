import { Header } from "./components/Header";
import { TarjetaProductos2 } from "./components/TarjetaProductos2";
import { Footer } from "./components/Footer";
import Carousel from "./components/Carousel";
import { Navigate, Route, Routes } from "react-router-dom";
import { ContactoScreen } from "./routes/ContactoScreen";
import { HomeScreen } from "./routes/HomeScreen";
import { LogInScreen } from "./routes/LogInScreen";
import RegisterForm from "./forms/RegisterForm";
import { AboutUs } from "./components/AboutUs";
import ProductoForm from "./forms/ProductoForm";
import AdminScreen from "./routes/AdminScreen";
import UserScreen from "./routes/UserScreen";
import ProtectedRoute from "./ProtectedRoute";
import CarruselScreen from "./routes/CarruselScreen";
import RegistrosScreen from "./routes/RegistrosScreen";
import TiendaScreen from "./routes/TiendaScreen";
import MantenimientoScreen from "./routes/MantenimientoScreen";
import { Menu } from "./components/Menu";
import VistaScreen from "./routes/VistaScreen";

export const EcommerceApp = () => {
  return (
    <main className="px-4 pt-6 bg-white">
      <Header />
      <Menu />
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/home" element={<HomeScreen />} />
        <Route path="/tienda" element={<TiendaScreen />} />
        <Route path="/login" element={<LogInScreen />} />
        <Route path="/*" element={<Navigate to='/' />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/contacto" element={<ContactoScreen />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/vista" element={<VistaScreen />} />
          <Route path="/admin" element={<AdminScreen />} />
          <Route path="/registros" element={<RegistrosScreen />} />
          <Route path="/carrusel" element={<CarruselScreen />} />
          <Route path="/users" element={<UserScreen />} />
          <Route path="/mantenimiento" element={<MantenimientoScreen />} />
        </Route>
      </Routes>
      <Footer />
    </main>
  );
};
