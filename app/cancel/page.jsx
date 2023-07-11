import Link from "next/link"
import styles from "./cancel.module.css"
import { BsFillPatchExclamationFill } from "react-icons/bs"

export default function page() {
  return (
    <div className={styles.cancel}>
      <h1>Sorry! There was an error while placing your order.</h1>
      <span className={styles.cancel_icon}><BsFillPatchExclamationFill /></span>
      <Link href={"/"} className="btn">Try again</Link>
    </div>
  )
}
