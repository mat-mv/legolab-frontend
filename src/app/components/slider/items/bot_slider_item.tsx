import Link from "next/link";
import Image from "next/image";
import styles from "./BotSliderItem.module.css"
import { Image as ImageInterface } from "@/app/utils/interfaces/image.interface";

interface BotSliderItemProps {
  title: string;
  href: string;
  children: React.ReactElement;
  image: ImageInterface;
  build_difficulty: number;
  code_difficulty: number;
}



export default function BotSliderItem({ title, href, children, image, build_difficulty, code_difficulty }: Readonly<BotSliderItemProps>) {
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
    <Link href={href} className={styles.text_box}>
      {image ? (
        <Image src={`https://www.legolab-karlsruhe.de${image.url}`} width={image.width} height={image.height} alt="Image" className={styles.image}></Image>
      ) : ("")}
      <div className={styles.content}>
      <h4 className={styles.title}>{title}</h4>
      <div className={styles.build_icons}>
        {build_icons}
      </div>
      <div className={styles.code_icons}>
        {code_icons}
      </div>
      {children}
      </div>
    </Link>
  )
}