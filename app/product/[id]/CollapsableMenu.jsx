"use client"
import styles from "./product.module.css"

import { useState } from "react"


const CollapseItem = ({ product, title, isOpen, toggleCollapse }) => {
  return (
    <div className={styles.collapse_menu_item}>
      <div className={styles.collapse_menu__heading}>
        <h5>{title}</h5>
        <button onClick={toggleCollapse}>{isOpen ? "-" : "+"}</button>
      </div>

      <div
        className={`${styles.collapse_menu__info} ${
          isOpen ? styles.open : styles.closed
        }`}
      >
        {product.description}
      </div>
    </div>
  );
};

export default function CollapsableMenu({ product }) {
  const [openIndex, setOpenIndex] = useState(0);
  const titles = ["Product Description", "Return Policy", "Shipping Info"];

  const toggleCollapse = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className={styles.collapse_menu}>
      {titles.map((title, index) => (
        <CollapseItem
          key={index}
          product={product}
          title={title}
          isOpen={openIndex === index}
          toggleCollapse={() => toggleCollapse(index)}
        />
      ))}
    </div>
  );
}
