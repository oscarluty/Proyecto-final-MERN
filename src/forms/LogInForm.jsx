import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const { register, handleSubmit, formState: { errors }, setError } = useForm();
  const { signin, isAuthenticated, errors: authErrors } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/tienda");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    // Manejar errores de autenticación
    if (authErrors.length > 0) {
      authErrors.forEach(error => {
        if (error.toLowerCase().includes('email')) {
          setError('email', { type: 'manual', message: error });
        } else if (error.toLowerCase().includes('contraseña') || error.toLowerCase().includes('password')) {
          setError('password', { type: 'manual', message: error });
        } else {
          // Para errores generales, los mostramos en la parte superior del formulario
          setError('general', { type: 'manual', message: error });
        }
      });
    }
  }, [authErrors, setError]);

  const onSubmit = handleSubmit(async (data) => {
    await signin(data);
  });

  return (
    <div className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-md">
      {errors.general && (
        <div className="bg-red-500 p-2 text-white my-2">
          {errors.general.message}
        </div>
      )}
      <h2 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h2>
      <form onSubmit={onSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Correo electrónico
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.email ? 'border-red-500' : ''
            }`}
            type="text"
            {...register("email", { 
              required: "El email es requerido",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Ingrese un email válido"
              }
            })}
            placeholder="Correo electrónico"
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="login-password">
            Contraseña
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${
              errors.password ? 'border-red-500' : ''
            }`}
            id="login-password"
            type="password"
            {...register("password", { required: "La contraseña es requerida" })}
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
            Iniciar Sesión
          </button>
          <Link to="/register">
            <p className="text-sky-600 italic text-center sm:text-left">
              ¿No tienes una cuenta? ¡Regístrate!
            </p>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;