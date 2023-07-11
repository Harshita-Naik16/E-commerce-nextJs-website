"use client";
import { getProductDataById } from "./data/productsData";

const { createContext, useState, useEffect } = require("react");

const CartContext = createContext({
    items: [],
    getProductQuantity: () => { },
    addOneToCart: () => { },
    addItemsToCart: () => { },
    removeOneFromCart: () => { },
    deleteFromCart: () => { },
    getSubTotal: () => { },
    wishListItems: [],
    itemInWishlist: () => {},
    addToWishList: () => {},
    removeFromWishList: () => {},
    toggleModal: false,
    setToggleModal: () => {}
})

export function CartProvider({ children }) {
    const [cart, setCart] = useState([])
    const [wishList, setWishList] = useState([])
    // cart : [{id: 1, quantity: 1}]
    // wishlist: [{id:1}]

    const [toggleModal, setToggleModal] = useState(false)

    useEffect(() => {
        const storedCart = localStorage.getItem("cart");
        if (storedCart) {
            setCart(JSON.parse(storedCart));
        }

        const storedWishList = localStorage.getItem("wishlist");
        if(storedWishList){
            setWishList(JSON.parse(storedWishList))
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    useEffect(() => {
        localStorage.setItem("wishlist", JSON.stringify(wishList));
    }, [wishList]);

    const getProductQuantity = (id) => {
        const quantity = cart.find(product => product.id == id)?.quantity

        if (quantity === undefined) {
            return 0;
        }

        return quantity;
    }

    const addOneToCart = (id) => {
        const quantity = getProductQuantity(id);

        if (quantity === 0) {
            setCart(
                [
                    ...cart,
                    {
                        id: id,
                        quantity: 1
                    }
                ]
            )
        } else {
            setCart(
                cart.map(product => (
                    product.id === id ?
                        {...product, quantity: product.quantity + 1}
                        :
                        product
                )))
        }
    }

    const addItemsToCart = (id, quantity) => {
        const cartQuantity = getProductQuantity(id);

        if(cartQuantity === 0) {
            setCart([
                ...cart,
                {
                    id: id,
                    quantity: quantity
                }
            ]
            )
        }else {
            setCart(
                cart.map(product => (
                    product.id == id ?
                    {
                        ...product,
                        quantity: product.quantity + quantity
                    } 
                    :
                    product
                ))
            )
        }
    }

    const deleteFromCart = (id) => {
        setCart(cart.filter(product => product.id !== id))
    }

    const removeOneFromCart = (id) => {
        const quantity = getProductQuantity(id);

        if(quantity === 1){
            deleteFromCart(id)
        }else {
            setCart(
                cart.map(product => (
                    product.id === id ?
                        {...product, quantity: product.quantity - 1}
                        :
                        product
                ))
            )
        }
    }

    const getSubTotal = () => {
        let total = 0;
        cart.map(cartItem => {
            const productData = getProductDataById(cartItem.id)
            total += cartItem.quantity * productData.price
        })
        return total
    }

    const itemInWishlist = (id) => {
        if(wishList.find(item => item.id === id)){
            return true
        }else {
            return false
        }
    }

    const addToWishList = (id) => {
        if(itemInWishlist(id)){
            return
        }else {
            setWishList(prevList => [...prevList, {id: id}])
        }
    }

    const removeFromWishList = (id) => {
        setWishList(prevlist => prevlist.filter(item => item.id !== id))
    }


    const values = {
        items: cart,
        getProductQuantity,
        addOneToCart,
        addItemsToCart,
        removeOneFromCart,
        deleteFromCart,
        getSubTotal,
        wishListItems: wishList,
        itemInWishlist,
        addToWishList,
        removeFromWishList,
        toggleModal,
        setToggleModal
    }

    return (
        <CartContext.Provider value={values}>
            {children}
        </CartContext.Provider>
    )
}

export { CartContext }

