import logo from '../assets/img/logo.png'
import { Link } from 'react-router-dom'

export const Footer = () => {
    return (
        <footer className="bg-white">
            <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
                
                <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <span className="text-sm text-gray-500 text-center sm:text-left dark:text-gray-400 mb-4 sm:mb-0">
                        © 2024 <a href="#" className="hover:underline">Arriero Mbarete®</a>. All Rights Reserved.
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6 text-center md:text-left">
                    <Link to='/contacto' className="hover:underline text-gray-500 dark:text-gray-400 font-medium"> Contacto </Link> 
                        <a href="https://www.instagram.com/arriero_mbarete96/" target='blank' className="hover:underline text-gray-500 dark:text-gray-400 font-medium">Seguinos</a>
                        <Link to='/aboutUs' className="hover:underline text-gray-500 dark:text-gray-400 font-medium"> About Us </Link> 
                    </div>
                </div>
            </div>
        </footer>
    )
}