import React from 'react'
import { TbArrowRight } from 'react-icons/tb'


function ProductHd(props) {

  const {product} = props;

  return (
    <div className='max-padd-container flex items-center flex-wrap py-4 gap-x-2 medium-16 capitalize bg-white'>Home<TbArrowRight/> Shop <TbArrowRight/> {product.category} <TbArrowRight/> {product.name}</div>
  )
}

export default ProductHd