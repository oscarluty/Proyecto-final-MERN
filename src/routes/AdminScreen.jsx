import React from 'react'
import { Link } from 'react-router-dom'

const AdminScreen = () => {
    return (
        <div className="flex flex-col items-center min-h-screen p-5 pt-10">
            <h1 className="text-4xl font-bold mb-6 text-slate-800">Panel de Control</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl w-full">
                <Link to="/users" className="text-decoration-none">
                    <button className="w-full p-6 text-xl font-bold text-white bg-slate-600 rounded-lg hover:bg-slate-700 transition-colors">
                        Usuarios
                    </button>
                </Link>
                <Link to='/mantenimiento'>
                    <button className="w-full p-6 text-xl font-bold text-white bg-slate-600 rounded-lg hover:bg-slate-700 transition-colors">
                        Mantenimiento
                    </button>
                </Link>
                <Link to="/registros" className="text-decoration-none">
                    <button className="w-full p-6 text-xl font-bold text-white bg-slate-600 rounded-lg hover:bg-slate-700 transition-colors">
                        Registros
                    </button>
                </Link>
                <Link to="/carrusel" className="text-decoration-none">
                    <button className="w-full p-6 text-xl font-bold text-white bg-slate-600 rounded-lg hover:bg-slate-700 transition-colors">
                        Carrusel
                    </button>
                </Link>
                <Link to="/vista" className="text-decoration-none">
                    <button className="w-full p-6 text-xl font-bold text-white bg-slate-600 rounded-lg hover:bg-slate-700 transition-colors">
                        Mensajes de usuarios
                    </button>
                </Link>
                <button className="w-full p-6 text-xl font-bold text-white bg-slate-600 rounded-lg hover:bg-slate-700 transition-colors">
                    Botón 6
                </button>
            </div>
        </div>
    )
}

export default AdminScreen