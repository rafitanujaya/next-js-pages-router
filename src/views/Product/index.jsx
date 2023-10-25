import style from "./product.module.css";
import Link from 'next/link';

const ProductView = ({ products }) => {
  
  return (
    <div>
      <h1>Product Page</h1>
      <div className={style.products}>
        {products.length > 0 ? (
          products.map((product) => (
            <Link href={`/product/${product.id}`} key={product.id} className={style.product}>
              <div>
                <img src={product.image} alt={product.name} />
              </div>
              <div className={style.product_body}>
                <p className={style.product_name}>{product.name}</p>
                <p className={style.product_category}>{product.category}</p>
                <h4 className={style.product_price}>RP {product.price.toLocaleString("id-ID")}</h4>
              </div>
            </Link>
          ))
        ) : (
          <>
          <div className={style.product_skeleton}/>
          <div className={style.product_skeleton}/>
          <div className={style.product_skeleton}/>
          <div className={style.product_skeleton}/>
          <div className={style.product_skeleton}/>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductView;
