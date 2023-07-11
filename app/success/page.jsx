import styles from "./success.module.css"
import { BsPatchCheck } from "react-icons/bs"

export default function page() {
  return (
    <div className={styles.success}>
      <h1>Order Placed!</h1>
      <span className={styles.success_icon}><BsPatchCheck /></span>
      
    </div>
  )
}
