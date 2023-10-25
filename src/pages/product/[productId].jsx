import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function DetailProductPage(props) {
  const { product } = props;
  const { query } = useRouter();
  // const [product, setProduct] = useState({});

  // Client Side Rendering
  // useEffect(() => {
  //   if (query.productId) {
  //     fetch(`/api/products/${query.productId}`)
  //       .then((res) => res.json())
  //       .then((data) => setProduct(data.data))
  //       .catch((error) => console.error("Error fetching product:", error));
  //   }
  // }, [query.productId]);

  console.log(query);
  console.log(product);

  if (!product || Object.keys(product).length === 0) {
    // Jika objek product belum diinisialisasi atau kosong, tidak merender apa-apa
    return (
      <div>
        <h1 className="text-center my-5 text-xl font-bold">
          Ini Halaman Product Detail
        </h1>
        <p className="text-center">Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-center my-5 text-xl font-bold">
        Ini Halaman Product Detail
      </h1>
      <div className="h-80 w-60 bg-slate-400 rounded-lg overflow-hidden mx-auto my-6">
        <div>
          <div className="block relative">
            <img src={product.image} alt={product.name} />
            <div className="absolute top-0 left-0 bg-slate-500 text-white px-2 py-1 rounded-br-md font-semibold text-sm capitalize">
              {product.category}
            </div>
          </div>
          <div className="px-3 py-1">
            <h2 className="text-lg text-white">{product.name}</h2>
            <h4 className="text-white font-bold text-xl">
              Rp {product.price?.toLocaleString("id-ID")}
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
}

// Server Side Rendering

// export async function getServerSideProps({params}) {
//   console.log(params);
//   const res = await fetch(`http://localhost:3000/api/products/${params.productId}`);
//   const response = await res.json();

//   return {
//     props : {
//       product : response.data
//     }
//   }
// }

// Generic Static Rendering

export async function getStaticProps({ params }) {
  const res = await fetch(
    `http://localhost:3000/api/products/${params.productId}`
  );
  const response = await res.json();

  return {
    props: {
      product: response.data,
    },
  };
}

export async function getStaticPaths() {
  const res = await fetch(`http://localhost:3000/api/products`);
  const response = await res.json();

  const paths = response.data.map((product) => ({
    params: {
      productId: product.id,
    },
  }));

  console.log(paths);
  return {
    paths,
    fallback: false
  }
}
