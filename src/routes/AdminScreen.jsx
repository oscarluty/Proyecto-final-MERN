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
                <Link to="/productos" className="text-decoration-none">
                    <button className="w-full p-6 text-xl font-bold text-white bg-slate-600 rounded-lg hover:bg-slate-700 transition-colors">
                        Registros
                    </button>
                </Link>
                <button className="w-full p-6 text-xl font-bold text-white bg-slate-600 rounded-lg hover:bg-slate-700 transition-colors">
                    Botón 3
                </button>
                <button className="w-full p-6 text-xl font-bold text-white bg-slate-600 rounded-lg hover:bg-slate-700 transition-colors">
                    Botón 4
                </button>
                <button className="w-full p-6 text-xl font-bold text-white bg-slate-600 rounded-lg hover:bg-slate-700 transition-colors">
                    Botón 5
                </button>
                <button className="w-full p-6 text-xl font-bold text-white bg-slate-600 rounded-lg hover:bg-slate-700 transition-colors">
                    Botón 6
                </button>
            </div>
        </div>
    )
}

export default AdminScreen