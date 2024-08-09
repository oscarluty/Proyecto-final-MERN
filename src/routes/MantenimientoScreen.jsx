import React from 'react'
import Productos from "../components/Productos";
import Marcas from '../components/Marcas';
import Tipos from '../components/Tipos';
import Categorias from '../components/Categorias';

const MantenimientoScreen = () => {
  return (
    <div>
      <>
      <Productos />
      <Marcas />
      <Tipos />
      <Categorias />
      </>
    </div>
  )
}

export default MantenimientoScreen
