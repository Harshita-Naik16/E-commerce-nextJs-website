"use client"
import { getProductDataById } from "@/data/productsData"
import styles from "./product.module.css"
import { useContext, useState } from "react"
import { CartContext } from "@/CartContext"
import CollapsableMenu from "./CollapsableMenu"
import { AiOutlineStar, AiOutlineHeart, AiFillHeart } from "react-icons/ai"

export default function page({ params }) {
  const cart = useContext(CartContext)
  const [value, setValue] = useState(1)  //quantity of product input by user

  // Getting the product data
  let product = getProductDataById(params.id)
  const { id, image, title, price, rating: { rate, count } } = product

  const handleBuyNow = async () => {
    await fetch("https://e-commerce-next-js-website.vercel.app/api/checkout", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({items: [{id: id, quantity: parseInt(value)}]})       
    })
    .then(res => res.json())
    .then(res => {
      if(res){
        window.location.assign(res.url)
      }
    })
    .catch(err => console.log(err.message))
  }

  const handleAddToCart = () => {
    // const quantity = value
    cart.addItemsToCart((params.id), parseInt(value))
  }

  return (
    // product container
    <section aria-label="product page" className={styles.product__container}>
      {/* Col 1 */}
      <div className={styles.product__image}>
        <img src={image} alt={`${title} image`} />
      </div>

      {/* Col 2 */}
      <div className={styles.product__info}>

        <h1 className={styles.product__title}>{title}</h1>
        <p className={styles.product__rating_container}><span className={styles.product__rating}><span>{rate}</span><AiOutlineStar size={16} /></span>{count} rating</p>
        <h4 className={styles.product__price}>Rs.{price}</h4>

        {/* Quantity selector */}
        <div className={styles.product__quantity}>
          <p>Quantity</p>
          <input type="number" id="quantity" name="quantity" min="1" max="10" onChange={(e) => setValue(e.target.value)} value={value} />
        </div>
        
        {/* Add to cart, Wishlist and Buy now buttons */}
        <div className={styles.product__btn__container}>

          <div className={styles.product__wishlist_container}>
            <button onClick={() => handleAddToCart()} className={`btn ${styles.product__add_to_cart}`}>Add to cart</button>
            {
              cart.itemInWishlist(id) ?
              <button className={`btn ${styles.product__wishlist}`} onClick={() => cart.removeFromWishList(id)}><AiFillHeart color="red" size={18}/></button>
              :
              <button className={`btn ${styles.product__wishlist}`} onClick={() => cart.addToWishList(id)}><AiOutlineHeart size={18}/></button>
            }
          </div>
          
          <button className={`btn ${styles.product__buy_now}`} onClick={handleBuyNow}>Buy Now</button>

        </div>

        <CollapsableMenu product={product} />
      </div>
    </section>
  )
}
