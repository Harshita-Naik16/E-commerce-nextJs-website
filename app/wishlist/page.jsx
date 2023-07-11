"use client"
import { CartContext } from '@/CartContext'
import { useContext } from 'react'
import { getProductDataById } from "@/data/productsData"
import ProductCard from '@/components/ProductCard/ProductCard'
import Heading from '@/components/Heading'

export default function page() {
  const cart = useContext(CartContext)

  return (
    <>
      <Heading title={"Wishlist"} />
      <div className='products_layout'>
        {cart.wishListItems.length > 0 ?

          cart.wishListItems.map(item => {
            let product = getProductDataById(item.id)
            return (
              <ProductCard key={product.id} product={product} />
            )
          })
          :
          <p className='flex'>Wishlist is empty</p>
        }
      </div>
    </>
  )
}
