import Layout from "@/components/Layout"
import Link from "next/link"
import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"

export default function Products() {
    const [products, setProducts] = useState([])
    useEffect(() => {
        axios.get("/api/products").then(response => {
            setProducts(response.data)
        })
    })
    return (
        <Layout>
            <Link className='bg-blue-700 text-white rounded-md py-1 px-2' href={"/products/new"}>Add new product</Link>
            <table className="basic">
                <thead>
                    <tr>
                        <td>Product Name</td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        // eslint-disable-next-line react/jsx-key
                        <tr>
                            <td>{product.title}</td>
                            <td>
                                <Link href={"/products/edit/" + product._id} className="items-center">
                                    <svg className="w-5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"></path>
                                    </svg>
                                    Edit
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Layout>
    )
}