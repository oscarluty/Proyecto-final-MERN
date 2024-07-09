import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";


const RegisterForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signup, isAuthenticated, setIsAuthenticated, errors: registerErrors } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/login");
      setIsAuthenticated(false);
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = handleSubmit(async (values) => {
    signup(values);
  });

  return (
    <div className="flex items-center justify-center  ">
      <div className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Registro</h2>
      {
        registerErrors.map((error, i) => (
          <div className="bg-red-500 p-2 text-white my-2" key={i}>
            {error}
          </div>
        ))
      }
      <form onSubmit={onSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
            Nombre
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="nombre"
            type="text"
            {...register("nombre", { required: true })}
            placeholder="Nombre"
          />
          {errors.nombre && (
            <p className="text-red-500">Nombre es requerido</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="apellido">
            Apellido
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="apellido"
            type="text"
            {...register("apellido", { required: true })}
            placeholder="Apellido"
          />
          {errors.apellido && (
            <p className="text-red-500">Apellido es requerido</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="telefono">
            Telefono
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="telefono"
            type="text"
            {...register("telefono", { required: true })}
            placeholder="Telefono"
          />
          {errors.telefono && (
            <p className="text-red-500">Telefono es requerido</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Correo Electrónico
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            {...register("email", { required: true })}
            placeholder="Correo Electrónico"
          />
          {errors.email && (
            <p className="text-red-500">Email es requerido</p>
          )}
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Contraseña
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
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
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Registrarse
          </button>
          <Link to='/login'><p className="text-sky-600 italic">Ya tienes una cuenta? Inicia Sesion!</p></Link>
        </div>
      </form>
    </div>
    </div>
  );
};

export default RegisterForm;