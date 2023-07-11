"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './navbar.module.css'
import { BsFillBagFill } from "react-icons/bs"
import { CgProfile } from "react-icons/cg"
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx"
import { useContext, useEffect, useRef, useState } from 'react'
import { CartContext } from '@/CartContext'
import SearchBox from './SearchBox'


export default function Navbar() {
  const [toggleNav, setToggleNav] = useState(false)
  const cart = useContext(CartContext)
  const pathname = usePathname()
  const navRef = useRef(null)

  const totalCartItems = cart.items?.reduce((sum, product) => (sum += product.quantity), 0)

  const navList = [
    {
      name: "HOME",
      link: "/"
    },
    {
      name: "SHOP",
      link: "/shop"
    },
    {
      name: "WISHLIST",
      link: "/wishlist"
    },
    {
      name: "ABOUT",
      link: "/about"
    },
  ]

  // background scroll disabled when nav is open
  useEffect(() => {
    document.body.style.overflow = toggleNav? "hidden" : "auto";
  }, [toggleNav])
  

  useEffect(() => {
    // Add event listener to navbar for mobile nav
    const nav = document.querySelector("nav")
    nav.addEventListener("click", handleOutsideClick)

    return () => document.removeEventListener("click", handleOutsideClick)
  }, [])

  const handleOutsideClick = (e) => {
    // Check if the click target is outside the navListRef
    if(navRef.current && !navRef.current.contains(e.target)){
      setToggleNav(false)
    }
  }

  return (
    <header>
      <nav className={`${styles.nav} ${toggleNav && styles.active}`}>

        <div className={styles.nav__search_block}>
          {/* Search bar */}
          <SearchBox />

          {/* Log in  &  Cart */}
          <div className={styles.nav__login_cart}>
            {/* Log In */}
            <button className={`${styles.nav__login} ${toggleNav && styles.active}`}>
              <CgProfile size={28} />
              <span>Log In</span>
            </button>

            {/* Cart */}
            <button className={styles.nav__cart} onClick={() => cart.setToggleModal(true)}><BsFillBagFill size={28} /> <span>{totalCartItems}</span> </button>

            {/* Mobile Nav Toggle */}
            <button onClick={() => setToggleNav(prev => !prev)} className={styles.nav__toggle_btn}>
              {toggleNav ? <RxCross2 size={24} /> : <RxHamburgerMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Logo */}
        <div className={`logo`}>
          <Link href={"/"}>Life Etc.</Link>
        </div>

        {/* Navigation Links */}
          <div 
            className={`${styles.nav__list_container} ${toggleNav && styles.active}`} 
            ref={navRef}
          >
            <ul className={`${styles.nav__list} ${toggleNav && styles.active}`}>
              {
                navList.map((navItem, index) => {
                  return (
                  <Link 
                    href={navItem.link} 
                    key={index} 
                    className={`${styles.nav__list__link} ${pathname === navItem.link ? styles.active : ""}`} 
                    onClick={() => setToggleNav(false)}>{navItem.name}
                  </Link>)
                })
              }
            </ul>
          </div>

      </nav>
    </header>
  )
}
