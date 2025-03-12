import Link from "next/link";
import Image from "next/image";
import styles from "./MindstormsSliderItem.module.css";
import { Mindstorm } from "../../../utils/interfaces/mindstorm.interface";

export default function MindstormsSliderItem({ name, description, image, difficulty, slug }: Readonly<Mindstorm>) {
  const code_icons = []

  for (let i = 0; i < 5; i++) {
    if (i < difficulty) {
      code_icons.push(<span key={i} className={["material-symbols-outlined", styles.icon].join(" ")}>terminal</span>)
    } else {
      code_icons.push(<span key={i} className={["material-symbols-outlined", styles.icon, styles.inactive].join(" ")}>terminal</span>)
    }
  }

  return(
    <Link href={slug} className={styles.text_box}>
      {image ? (
        <Image src={`https://www.legolab-karlsruhe.de${image.url}`} width={400} height={225} alt="Image" className={styles.image}></Image>
      ) : ("")}
      <div className={styles.content}>
      <h4 className={styles.title}>{name}</h4>
      <div className={styles.code_icons}>
        {code_icons}
      </div>
      <p>{description}</p>
      </div>
    </Link>
  )
}