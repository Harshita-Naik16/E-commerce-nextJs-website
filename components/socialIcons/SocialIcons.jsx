import Link from 'next/link'
import React from 'react'
import styles from './social.module.css'
import {AiOutlineInstagram} from "react-icons/ai"
import {FaPinterestP} from "react-icons/fa"
import {RiFacebookLine} from "react-icons/ri"

export default function SocialIcons() {
  return (
    <div className={`${styles.social__container}`}>
      <div className={`${styles.social}`}>
        <Link href={"/"} className={styles.social__link}><AiOutlineInstagram size={20}/></Link>
        <Link href={"/"} className={styles.social__link}><FaPinterestP size={16} /></Link>
        <Link href={"/"} className={styles.social__link}><RiFacebookLine size={16} /></Link>
      </div>
    </div>
  )
}
