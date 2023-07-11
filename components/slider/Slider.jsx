"use client"
import { useEffect, useState } from "react"
import styles from "./slider.module.css"

const images = [
    {
        imgUrl: "https://static.wixstatic.com/media/ad420a_8dd6c10bf55547e78d0d9ba1e5bb5256~mv2_d_5184_3497_s_4_2.jpg/v1/fill/w_1126,h_606,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/ad420a_8dd6c10bf55547e78d0d9ba1e5bb5256~mv2_d_5184_3497_s_4_2.jpg"
    },
    {
        imgUrl: "https://static.wixstatic.com/media/84770f_b8a2d0fcac104f88a14d95f999540efb~mv2.jpg/v1/fill/w_979,h_527,al_c,q_85,enc_auto/84770f_b8a2d0fcac104f88a14d95f999540efb~mv2.jpg"
    },
    {
        imgUrl: "https://static.wixstatic.com/media/ad420a_f1c5200130ab46cea2eee44c629824a0~mv2.jpg/v1/fill/w_1000,h_538,al_c,q_85,enc_auto/ad420a_f1c5200130ab46cea2eee44c629824a0~mv2.jpg"
    },
    {
        imgUrl: "https://static.wixstatic.com/media/ad420a_a6fde3feab894f6cae6bf59d119fc863~mv2.jpg/v1/fill/w_1126,h_606,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/ad420a_a6fde3feab894f6cae6bf59d119fc863~mv2.jpg"
    },
]

export default function Slider() {
  const [currentIndex, setCurrent] = useState(0)

  const handleChange = () => {
    if(currentIndex === images.length - 1){
        setCurrent(0)
    }else {
        setCurrent(currentIndex + 1)
    }
  }

  useEffect(() => {
    const interval = setInterval(handleChange, 4000)

    return () => clearInterval(interval)
  }, [currentIndex])
  
  

  return (
    <div className={styles.slider__container}>
      {
        images.map((img, index) => (
            <div key={index} className={`${styles.slider} ${index === currentIndex ? styles.active : ""}`}>
                <img className={`${styles.slider_img}`} src={img.imgUrl}/>
            </div>
        ))
      }
      <div className={styles.slider__dot_container}>
        {
            images.map((item, index) => {
                return (
                    <button key={index} className={`${styles.slider__dot} ${index === currentIndex ? styles.active : ""}`} onClick={() => setCurrent(index)}></button>
                )
            })
        }
      </div>
    </div>
  )
}
