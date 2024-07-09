import React from 'react';
import  NavBar  from '../components/NavBar';  // Asegúrate de ajustar la ruta de importación
import { TarjetaProductos2 } from "../components/TarjetaProductos2";
import { ProductosDesdeApi } from '../components/ProductosDesdeApi';

export const TiendaScreen = () => {
  return (
    <section>
      <NavBar />
      
      <TarjetaProductos2 />
    </section>
  );
};