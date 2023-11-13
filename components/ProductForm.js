import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function ProductForm(
    { _id, title: existingTitle, description: existingDescription, price: existingPrice, images }) {
    const [title, setTitle] = useState(existingTitle || "");
    const [description, setDescription] = useState(existingDescription || "");
    const [price, setPrice] = useState(existingPrice || "");
    const [goToProducts, setGoToProducts] = useState(false);
    const router = useRouter()
    async function saveProduct(ev) {
        ev.preventDefault();
        const data = { title, description, price };
        if (_id) {
            //update
            await axios.put("/api/products", { ...data, _id });
        } else {
            //create
            await axios.post("/api/products", data);
        }
        setGoToProducts(true)
    }
    if (goToProducts) {
        router.push('/products')
    }
    async function uploadImages(ev) {
        const files = ev.target?.files;
        if (files?.length > 0) {
            const data = new FormData();
            for (const file of files) {
                data.append("file", file)
            }
            const res = await fetch("/api/upload", {
                method: "POST",
                body: data
            });
            console.log(res)
        }
    }
    return (
        <form onSubmit={saveProduct}>
            <label>Product Name</label>
            <input type="text" placeholder="Product Name" value={title} onChange={ev => setTitle(ev.target.value)} />
            <label>Photos</label>
            <div className="mb-2">
                <label className="cursor-pointer w-24 h-24 border justify-center flex flex-col items-center rounded-md bg-gray-300">
                    <svg className="w-6" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12l-3-3m0 0l-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"></path>
                    </svg>
                    <div>
                        Upload
                    </div>
                    <input type="file" onChange={uploadImages} className="hidden"></input>
                </label>
                {!images?.length && (
                    <div>No photos in this product</div>
                )}
            </div>
            <label>Description</label>
            <textarea placeholder="Description" value={description} onChange={ev => setDescription(ev.target.value)} />
            <label>Price</label>
            <input type="number" placeholder="Price" value={price} onChange={ev => setPrice(ev.target.value)} />
            <button className="btn-primary" type="submit">Save</button>
        </form>
    )
}