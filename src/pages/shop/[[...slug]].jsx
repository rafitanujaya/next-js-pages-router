import { useRouter } from "next/router"
import { useEffect, useState } from "react";

const ShopPage = () => {
    const { query, push } = useRouter()
    const [isLogin, setLogin] = useState(false)

    useEffect(() => {
        if (!isLogin) {
            push("/auth/login")
        }
    }, [])
    console.log(query);
    // Periksa apakah query.slug telah didefinisikan sebelum mengakses propertinya
    const category = query.slug && query.slug.length > 0 ? query.slug[0] : "tidak ada category";
    return (
        <>
        <h1>Selamat datang di Shop</h1>
        <p>product : {category}</p>
        </>
    )
}

export default ShopPage