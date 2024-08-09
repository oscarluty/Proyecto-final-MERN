import React from 'react'
import ProductoForm from "../forms/ProductoForm";
import CategoriasForm from '../forms/CategoriasForm';
import MarcasForm from '../forms/MarcasForm';
import TipoForm from '../forms/TipoForm';
import { Link } from 'react-router-dom';

const RegistrosScreen = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Registros</h1>
      <Link to='/mantenimiento'><p className="text-sky-600 italic">Ver registro de productos</p></Link>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <ProductoForm />
        </div>
        <div className="flex-1 lg:flex lg:flex-col gap-8">
          <div className="mb-8 lg:mb-0">
            <CategoriasForm />
          </div>
          <div>
            <MarcasForm />
          </div>
          <div>
            <TipoForm />
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegistrosScreen