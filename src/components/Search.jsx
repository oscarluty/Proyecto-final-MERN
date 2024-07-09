import React, { useEffect, useState } from 'react'

export const Search = () => {

    //setear los hooks useState

    const [users, setUsers] = useState([])
    const [search, setSearch] = useState("")

    //funcion para traer datos de la API

    const URL = 'https://jsonplaceholder.typicode.com/users'

    const showData = async () => {
        const response = await fetch(URL)
        const data = await response.json()
        setUsers(data)
    }

    //funcion busqueda

    const searcher = (e) => {
        setSearch(e.target.value)
    }

    //metodo de filtrado 1

    /*let results = []
    if(!search)
        {
            results = users
        }else{
            results = users.filter( (dato) =>
                dato.name.toLowerCase().includes(search.toLowerCase())
        )
        }*/

    //metodo de filtrado 2

    const results = !search ? users : users.filter((dato) => dato.name.toLowerCase().includes(search.toLocaleLowerCase()))

    useEffect(() => {
        showData()
    }, [])

    //renderizamos la vista

    return (
        <div>
            <input value={search} onChange={searcher} type="text" placeholder="Search" className="form-control" />
            <table className='table table-striped table-hover mt-5 shadow-lg'>
                <thead>
                    <tr className=' text-white'>
                        <th>USER</th>
                        <th>USER NAME</th>
                    </tr>
                </thead>
                <tbody>
                    {results.map((users) => (
                        <tr key={users.id}>
                            <td>{users.name}</td>
                            <td>{users.username}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
