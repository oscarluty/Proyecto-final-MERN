import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signin, isAuthenticated, setIsAuthenticated, errors: signinErrors } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/tienda");
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = handleSubmit((data) => {
    signin(data);
  });

  return (
    <div className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-md">
      {
        signinErrors.map((error, i) => (
          <div className="bg-red-500 p-2 text-white my-2" key={i}>
            {error}
          </div>
        ))
      }
      <h2 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h2>
      <form onSubmit={onSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Correo electronico
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            {...register("email", { required: true })}
            placeholder="Correo electronico"
          />
          {errors.email && (
            <p className="text-red-500">El email es requerido</p>
          )}
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="login-password">
            Contraseña
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="login-password"
            type="password"
            {...register("password", { required: true })}
            placeholder="******************"
          />
          {errors.password && (
            <p className="text-red-500">Password es requerido</p>
          )}
        </div>
        <div className="flex items-center justify-between">
          <button
            action="/onsubmit"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Iniciar Sesión
          </button>
          <Link to='/register'><p className="text-sky-600 italic">No tienes una cuenta? Registrate!</p></Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;