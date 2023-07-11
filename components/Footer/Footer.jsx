import Link from 'next/link'
import React from 'react'
import styles from "./footer.module.css"

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container`}>
        <h3 className={`${styles.footer__header} logo ${styles.logo} heading__partition`}>Life Etc.<span className="heading__lines"></span></h3>
        <div className={styles.footer__info_container}>
            <ul className={styles.footer__links_container}>
                <Link href={'/'}>Shop</Link>
                <Link href={'/'}>About</Link>
                <Link href={'/'}>Journal</Link>
                <Link href={'/'}>Contact</Link>
            </ul>
            <ul className={styles.footer__links_container}>
                <Link href={'/'}>FAQ</Link>
                <Link href={'/'}>Shipping and Returns</Link>
                <Link href={'/'}>Store Policy</Link>
                <Link href={'/'}>Payments</Link>
            </ul>
            <address className={styles.footer__address}>
                <pre>
                    info@my-domain.com <br />
                    500 Terry Francine Street<br />
                    San Francisco, CA 94158<br />
                    Tel: 123-456-7890<br />
                </pre> 
            </address>
            <form method='POST' action='/' className={styles.footer__form}>
                <h5>Sign Up. Stay Stylish</h5>
                <input type="text" name="email" id="email" placeholder='Enter Your Email Here..' required/>
                <button type='submit' className='btn'>Subscribe Now</button> 
            </form>
        </div>
      </div>
    </footer>
  )
}
