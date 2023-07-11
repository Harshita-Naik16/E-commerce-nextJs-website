import Heading from "@/components/Heading"
import styles from "./about.module.css"

export default function page() {
    return (
        <div className={styles.about__section}>
            <Heading title="BEHIND THE BRAND" />
            <div className={styles.about__image}>
                <img src="https://static.wixstatic.com/media/ad420a_973b2717df6240c98a7091be5d8ac7e7~mv2_d_2128_3200_s_2.jpg/v1/crop/x_0,y_451,w_2128,h_2297/fill/w_197,h_211,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/annie-spratt-527629-unsplash.jpg" />
                <img src={"https://static.wixstatic.com/media/ad420a_c01a3bf5b4c046a3aa249c6c1e7c7c75~mv2_d_3713_5591_s_4_2.jpg/v1/crop/x_0,y_759,w_3713,h_4073/fill/w_320,h_351,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/GettyImages-917024394.jpg"} alt="image of a person" />
            </div>
            <h2 className={styles.about__header}>Lorem ipsum dolor sit amet consectetur adipisicing elit. A tenetur quis ipsa id similique nemo odio inventore, porro magnam culpa minus repellendus modi, debitis et dignissimos molestiae, molestias.</h2>
            <p className={styles.about__description}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nobis earum, corporis optio non dolorem explicabo perferendis saepe maxime excepturi esse placeat hic sint tempore tenetur aperiam voluptatibus veritatis quia reprehenderit laboriosam doloribus. Vel cum est eligendi, illo quo assumenda adipisci?</p>
        </div>
    )
}
