import React from 'react'
import ProductHd from '../components/ProductHd'
import { useParams } from 'react-router-dom';
import all_products from '../assets/all_products';
import ProductDescription from '../components/ProductDescription';
import ProductDisplay from '../components/ProductDisplay';

function Product() {

  const { productId } = useParams();
  console.log("productId:", productId);

  const product = all_products.find((e)=> e.id === Number(productId));
  if(!product){
    return <div>Product Not Found!</div>  
  }

  return (
    <section>
      <div>
        <ProductHd product={product}/>
        <ProductDisplay product={product}/>
        <ProductDescription product={product}/>
      </div>
    </section>
  )
}

export default Product