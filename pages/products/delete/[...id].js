import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

export default function DeleteProductPage() {
    const router = useRouter();
    const { id } = router.query;
    const [productInfo, setProductInfo] = useState()
    useEffect(() => {
        if (!id) {
            return
        }
        axios.get("/api/products?id=" + id).then(response => {
            setProductInfo(response.data)
        })
    }, [id])
    function goBack() {
        router.push("/products")
    }
    async function deleteProduct() {
        await axios.delete("/api/products?id="+id)
        goBack();
    }
    return (
        <Layout>
                <h1 className="text-center">Are you sure that you want to delete product: "{productInfo?.title}"?</h1>
                <div className="flex justify-center gap-4">
                    <button className="px-4 py-1 bg-red-800 rounded-md text-white" onClick={deleteProduct}>
                        Yes
                    </button>
                    <button className="px-4 py-1 bg-gray-200 rounded-md" onClick={goBack}>
                        No
                    </button>
                </div>
        </Layout>
    )
}