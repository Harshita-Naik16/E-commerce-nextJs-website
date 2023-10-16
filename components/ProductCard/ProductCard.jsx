"use client";
import Link from "next/link";
import styles from "./ProductCard.module.css";
import { useContext, useEffect } from "react";
import { CartContext } from "@/CartContext";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

export default function ProductCard({ product }) {
  const { id, title, image, price } = product;
  const cart = useContext(CartContext);

  const handleOpenInNewTab = (event) => {
    event.preventDefault();

    const newTab = window.open(`/product/${id}`, "_blank");
    if (newTab) {
      newTab.document.title = title;
    } else {
      alert(
        "Please allow pop-ups for this site to open the product in a new tab."
      );
    }
  };

  return (
    <div className={styles.product}>
      {cart.itemInWishlist(id) ? (
        <button
          className={styles.product__wishlist_btn}
          onClick={() => cart.removeFromWishList(id)}
        >
          <AiFillHeart color="red" size={20} />
        </button>
      ) : (
        <button
          className={styles.product__wishlist_btn}
          onClick={() => cart.addToWishList(id)}
        >
          <AiOutlineHeart size={20} />
        </button>
      )}
      <Link href={`/product/${id}`} target="__blank" legacyBehavior>
        <a onClick={handleOpenInNewTab}>
          <div className={styles.product__img}>
            <img src={image} />
          </div>
          <h4 className={styles.product__title}>{title}</h4>
          <span className={styles.product__price}>Rs.{price}</span>
        </a>
      </Link>

      <button
        className={`btn ${styles.product__btn}`}
        onClick={() => cart.addOneToCart(id)}
      >
        Add to Cart
      </button>
    </div>
  );
}

// import wishlist feature here to compare and add
// if(wishlist.id === product.id)  filledHeart icon
