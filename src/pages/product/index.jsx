import ProductView from "@/views/Product";
import { useEffect, useState } from "react";

export default function ProductPage() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetch("/api/products")
      .then(res => res.json())
      .then(data => setProducts(data.data))
  }, [])
  return (
    <>
      <ProductView products={products}/>
    </>
  )
}
