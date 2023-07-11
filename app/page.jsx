import Link from 'next/link'
import styles from './page.module.css'
import { productsData } from '@/data/productsData'
import ProductCard from "@/components/ProductCard/ProductCard"
import Heading from '@/components/heading'
import Slider from '@/components/slider/Slider'

export default function Home() {

  return (
    <main>
      <section className={`products_layout ${styles.popular__section}`}>
        <Slider />
        <Heading title="populer items"/>
        <div className={styles.popular}>
          {productsData.slice(0, 3).map(product => {
            return <ProductCard key={product.id} product={product}/>
          }
          )}
        </div>
        <Link href={"/shop"} className={`${styles.popular__btn} btn`}>Shop All</Link>
      </section>
    </main>
  )
}
