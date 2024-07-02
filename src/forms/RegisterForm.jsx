import { useForm } from "react-hook-form";

export const RegisterForm = () => {
  const { register } = useForm();
  
    return (
    <div>
        <form action="">
            <input {...register("name")} type="text" placeholder="Nombre completo" />
            <input {...register("email")} type="email" placeholder="Correo electrónico" />
            <input {...register("password")} type="password" placeholder="Contraseña" />
            <input {...register("confirmPassword")} type="password" placeholder="Confirmar contraseña" />
            <button type="submit">Registrarse</button>
        </form>
    </div>
  )
}
