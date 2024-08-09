import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const RegisterForm = () => {
  const { register, handleSubmit, formState: { errors }, setError } = useForm();
  const { signup, isAuthenticated, errors: registerErrors } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (Array.isArray(registerErrors) && registerErrors.length > 0) {
      registerErrors.forEach(error => {
        if (typeof error === 'string') {
          if (error.toLowerCase().includes('nombre')) {
            setError('nombre', { type: 'manual', message: error });
          } else if (error.toLowerCase().includes('apellido')) {
            setError('apellido', { type: 'manual', message: error });
          } else if (error.toLowerCase().includes('telefono')) {
            setError('telefono', { type: 'manual', message: error });
          } else if (error.toLowerCase().includes('email') || error.toLowerCase().includes('correo')) {
            setError('email', { type: 'manual', message: error });
          } else if (error.toLowerCase().includes('contraseña') || error.toLowerCase().includes('password')) {
            setError('password', { type: 'manual', message: error });
          } else {
            setError('general', { type: 'manual', message: error });
          }
        } else {
          console.error('Error inesperado:', error);
        }
      });
    }
  }, [registerErrors, setError]);

  const onSubmit = handleSubmit(async (values) => {
    signup(values);
  });

  return (
    <div className="flex items-center justify-center">
      <div className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Registro</h2>
        {errors.general && (
          <div className="bg-red-500 p-2 text-white my-2">
            {errors.general.message}
          </div>
        )}
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
              Nombre
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.nombre ? 'border-red-500' : ''
              }`}
              id="nombre"
              type="text"
              {...register("nombre", { required: "Nombre es requerido" })}
              placeholder="Nombre"
            />
            {errors.nombre && (
              <p className="text-red-500">{errors.nombre.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="apellido">
              Apellido
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.apellido ? 'border-red-500' : ''
              }`}
              id="apellido"
              type="text"
              {...register("apellido", { required: "Apellido es requerido" })}
              placeholder="Apellido"
            />
            {errors.apellido && (
              <p className="text-red-500">{errors.apellido.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="telefono">
              Teléfono
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.telefono ? 'border-red-500' : ''
              }`}
              id="telefono"
              type="tel"
              {...register("telefono", {
                required: "Teléfono es requerido",
                pattern: {
                  value: /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,9}$/,
                  message: "Formato de teléfono inválido"
                }
              })}
              placeholder="+1 (123) 456-7890"
            />
            {errors.telefono && (
              <p className="text-red-500">{errors.telefono.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Correo Electrónico
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.email ? 'border-red-500' : ''
              }`}
              id="email"
              type="email"
              {...register("email", {
                required: "Email es requerido",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Ingrese un email válido"
                }
              })}
              placeholder="Correo Electrónico"
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Contraseña
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${
                errors.password ? 'border-red-500' : ''
              }`}
              id="password"
              type="password"
              {...register("password", {
                required: "Contraseña es requerida",
                minLength: {
                  value: 6,
                  message: "La contraseña debe tener al menos 6 caracteres"
                }
              })}
              placeholder="******************"
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4">
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full sm:w-auto"
              type="submit"
            >
              Registrarse
            </button>
            <Link to='/login'><p className="text-sky-600 italic text-center sm:text-left">¿Ya tienes una cuenta? ¡Inicia Sesión!</p></Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;