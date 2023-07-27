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
  const [count, setCount] = useState(0)

  const handleChange = () => {
    if(count === images.length - 1){
        setCount(0)
    }else {
        setCount(prev => prev + 1)
    }
  }

  useEffect(() => {
    const interval = setInterval(handleChange, 4000)

    return () => clearInterval(interval)
  }, [count])
  
  function style(index){
    const styleObj = {
      left : `${index * 100}%`,
      transform: `translateX(-${count * 100}%)`
    }
    return styleObj
  }

  return (
    <div className={styles.slider__container}>
      {
        images.map((img, index) => (
            <div key={index} className={`${styles.slider}`} style={style(index)}>
                <img src={img.imgUrl}/>
            </div>
        ))
      }
      <div className={styles.slider__dot_container}>
        {
            images.map((item, index) => {
                return (
                    <button key={index} className={`${styles.slider__dot} ${index === count ? styles.active : ""}`} onClick={() => setCount(index)}></button>
                )
            })
        }
      </div>
    </div>
  )
}
