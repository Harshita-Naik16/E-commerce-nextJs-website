"use client"
import Heading from "@/components/heading"
import styles from "./shop.module.css"
import ProductCard from "@/components/ProductCard/ProductCard"
import { useCallback, useState } from "react"
import { productsData } from "@/data/productsData"
import Pagination from "@/components/Pagination"

export default function page() {
  const [data, setData] = useState(productsData)
  const [currentPage, setCurrentPage] = useState(1)

  const handleSort = useCallback((e) => {
    switch (e.target.value) {
      case "lowToHigh":
        setData(data.slice().sort((a, b) => parseInt(a.price) - parseInt(b.price)))
        break;   
      case "highTolow":
        setData(
          data.slice().sort((a, b) => parseInt(b.price) - parseInt(a.price))
        )
        break;   
      case "rating":
        setData(
          data.slice().sort((a, b) => parseFloat(b.rating.rate) - parseFloat(a.rating.rate))
        )
        break;
      default: 
          setData(data)
          break;
    }
  }, [data])

  const handleCategories = useCallback((e) => {
    if (e.target.value === "all") {
      setData(productsData);
    } else {
      setData(productsData.filter((product) => product.category === e.target.value));
    }
    setCurrentPage(1)
  }, [data])

  const productsPerPage  = 6;
  const totalPages = Math.ceil(data.length / productsPerPage)
  let lastIndex = currentPage * productsPerPage
  let startIndex = lastIndex - productsPerPage


  return (
    <div>
      {/* Filter products */}

      {/* Categories */}
      <span className={styles.product__sort}>
        <label className={styles.product__sort_label}>Categories :</label>
        <select onChange={handleCategories} className={styles.product__sort_select}>
          <option value="all">All</option>
          <option value="women">Women</option>
          <option value="men">Men</option>
        </select>
      </span>

      {/* Sorting items */}
      <span className={styles.product__sort}>
        <label className={styles.product__sort_label}>Sort :</label>  {/* use sort on data state */}
        <select defaultValue="relevance" onChange={handleSort} className={styles.product__sort_select}>
          <option value="relevance" selected>Relevance</option>
          <option value="lowToHigh">Price(Low to High)</option>
          <option value="highTolow">Price(High to Low)</option>
          <option value="rating">Rating</option>
        </select>
      </span>


      <Heading title="the collection" />

      {/* products list  */}
      <div className={`products_layout`}>
        {
          data.slice(startIndex, lastIndex).map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        }
      </div>
      <Pagination totalPages={totalPages} setCurrentPage={setCurrentPage} currentPage={currentPage}/>
    </div>
  )
}
