import ProductView from "@/views/Product"

const StaticProductPage = (props) => {
    const {products} = props
  return (
    <div>
      <ProductView products={products}/>
    </div>
  )
}

export default StaticProductPage;

// Dipanggil setiap melakukan request (halaman ini di load)
export async function getStaticProps () {
    const res = await fetch("http://localhost:3000/api/products")
    const response = await res.json();
    return {
        props : {
            products : response.data,
        }
    }
}
