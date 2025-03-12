import Link from "next/link";
import Image from "next/image";
import styles from "./BotSliderItem.module.css"
import { Category } from "@/app/utils/interfaces/category.interface";

interface BotSliderItemProps {
  title: string;
  href: string;
  image: string;
  build_difficulty: number;
  code_difficulty: number;
  category: Category
}



export default function RelatedBotSliderItem({ title, href, image, build_difficulty, code_difficulty, category }: Readonly<BotSliderItemProps>) {
  const build_icons = []

  for (let i = 0; i < 5; i++) {
    if (i < build_difficulty) {
      build_icons.push(<span key={i} className={["material-symbols-outlined", styles.icon].join(" ")}>build</span>)
    } else {
      build_icons.push(<span key={i} className={["material-symbols-outlined", styles.icon, styles.inactive].join(" ")}>build</span>)
    }
  }

  const code_icons = []

  for (let i = 0; i < 5; i++) {
    if (i < code_difficulty) {
      code_icons.push(<span key={i} className={["material-symbols-outlined", styles.icon].join(" ")}>terminal</span>)
    } else {
      code_icons.push(<span key={i} className={["material-symbols-outlined", styles.icon, styles.inactive].join(" ")}>terminal</span>)
    }
  }

  return(
    <Link href={"/" + category.parent?.name.toLowerCase() + "/" + href} className={styles.text_box}>
      {image ? (
        <Image src={`https://www.legolab-karlsruhe.de${image}`} width={100} height={56} alt="Image" className={styles.image}></Image>
      ) : ("")}
      <div className={styles.content}>
      <h5 className={styles.title}>{title}</h5>
      <div className={styles.build_icons}>
        {build_icons}
      </div>
      <div className={styles.code_icons}>
        {code_icons}
      </div>
      </div>
    </Link>
  )
}