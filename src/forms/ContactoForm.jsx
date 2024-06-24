import { useForm } from "react-hook-form"

export const ContactoForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    
    const customSubmit = (data) => {
        console.log(data)
    }
  return (
    <>
        <h2></h2>
    </>
  )
}
