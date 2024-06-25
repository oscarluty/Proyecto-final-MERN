import { useForm } from "react-hook-form"

export const ContactoForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()

    const customSubmit = (data) => {
        console.log(data)
    }
    return (
        <>
            <h2 className="p-1 font-semibold">Contacto</h2>
            <form onSubmit={handleSubmit(customSubmit)}>
                <div className="p-1 grid grid-cols-2">
                    <div className="p-1">
                        <ul>
                            <li className="p-1">
                                <input type="text" className="bg-neutral-200 rounded" placeholder="Nombre" {...register('name')} />
                            </li>
                            <li className="p-1">
                                <input type="text" className="bg-neutral-200 rounded" placeholder="Email" {...register('name')} />
                            </li>
                            <li className="p-1">
                                <input type="number" className="bg-neutral-200 rounded" placeholder="Telefono" {...register('name')} />
                            </li>
                            <li className="p-1">
                                <textarea className="bg-neutral-200 rounded"
                                    id="w3review"
                                    name="w3review"
                                    rows={4}
                                    cols={50}
                                    placeholder="Mensaje"

                                />
                            </li>
                        </ul>
                    </div>
                    <div className="p-1 ml-10">
                        <p className="ml-20">
                            En Jean Vernier nos interesa escuchar a todos nuestros clientes. Nuestro objetivo es ofrecer el mejor servicio, para ello te solicitamos que nos acerques tus consultas, sugerencias y reclamos completando el siguiente formulario:

                            Shopping Pinedo – Local 31
                            Avenida Mariscal López y 26 de Febrero
                            San Lorenzo, Paraguay.

                            +595 994 441 058

                            ventas@jeanvernier.com.py
                        </p>
                    </div>
                </div>
            </form>

        </>
    )
}
