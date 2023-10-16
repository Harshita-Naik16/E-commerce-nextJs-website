"use client";
import { useContext, useEffect, useRef } from "react";
import styles from "./modal.module.css";
import { BsChevronRight } from "react-icons/bs";
import { CartContext } from "@/CartContext";
import { IoIosClose } from "react-icons/io";
import { getProductDataById } from "@/data/productsData";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function Modal() {
  const cart = useContext(CartContext);
  const modalContentRef = useRef(null);
  const { user } = useUser();

  // Stripe payment api
  const checkout = async () => {
    await fetch("https://e-commerce-next-js-website.vercel.app/api/checkout", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ items: cart.items }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.url) {
          window.location.assign(res.url);
        }
      });
  };

  // close modal when clicked on background
  const handleModalClick = (e) => {
    if (!modalContentRef.current.contains(e.target)) {
      cart.setToggleModal(false);
    }
  };

  // Background scroll disabled when cart is open
  useEffect(() => {
    document.body.style.overflow = cart.toggleModal ? "hidden" : "auto";
  }, [cart.toggleModal]);

  return (
    <>
      {cart.toggleModal && (
        // Black background
        <div
          className={`${styles.modal__container}`}
          onClick={handleModalClick}
        >
          {/* The cart content */}
          <div className={`${styles.modal}`} ref={modalContentRef}>
            {/* cart heading */}
            <div className={styles.modal__header}>
              <button onClick={() => cart.setToggleModal(false)}>
                <BsChevronRight />
              </button>
              <span>Cart</span>
            </div>
            {/* cart list mapping*/}
            <div className={styles.modal__content}>
              {cart.items.length <= 0 ? (
                <div className={styles.modal__content_empty}>
                  Cart is Empty !
                </div>
              ) : (
                cart.items.map((cartItem) => {
                  let item = getProductDataById(cartItem.id);
                  return (
                    <div
                      className={styles.cartItem__container}
                      key={cartItem.id}
                    >
                      <div className={styles.cartItem__info}>
                        <div className={styles.cartItem__img}>
                          <img src={item?.image} />
                        </div>
                        <div>
                          <h4 className={styles.cartItem__title}>
                            {item.title.slice(0, 26)}
                          </h4>
                          <p className={styles.cartItem__price}>
                            ${item.price}
                          </p>

                          <div className={styles.cartItem__quantity__container}>
                            <button
                              className={styles.cartItem__btn}
                              onClick={() =>
                                cart.removeOneFromCart(cartItem.id)
                              }
                            >
                              -
                            </button>
                            <span>{cartItem.quantity}</span>
                            <button
                              onClick={() => cart.addOneToCart(cartItem.id)}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>

                      <button
                        className={styles.cartItem__delete}
                        onClick={() => cart.deleteFromCart(cartItem.id)}
                      >
                        <IoIosClose />
                      </button>
                    </div>
                  );
                })
              )}
            </div>
            {/* Cart footer */}
            <div className={styles.modal__total}>
              <h5>Subtotal</h5>
              <p>Rs.{cart.getSubTotal()}</p>
            </div>
            <span className={styles.line__break}></span>
            {user ? (
              <div
                className={`${styles.modal__view_cart} btn`}
                onClick={checkout}
              >
                Checkout
              </div>
            ) : (
              <div className={`${styles.modal__view_cart} btn`}>
                <a href="/api/auth/login">LogIn to Checkout</a>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
