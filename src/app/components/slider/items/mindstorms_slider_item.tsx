import Link from "next/link";
import Image from "next/image";
import styles from "./MindstormsSliderItem.module.css";
import { Mindstorm } from "@/app/utils/interfaces/mindstorm.interface";

export default function MindstormsSliderItem({ date, name, image, slug }: Readonly<Mindstorm>) {

  return (
    <Link href={slug} className={styles.text_box}>
      {image ? (
        <Image src={`https://www.legolab-karlsruhe.de${image.url}`} width={image.width} height={image.height} alt="Image" className={styles.image} />
      ) : ("")}
      <div className={styles.content}>
        <h4 className={styles.title}>{name}</h4>
        <div className={styles.iconWithText}>
          <div className={styles.iconItem}>
            <span className={["material-symbols-outlined", styles.icon].join(" ")}>event</span>
            <span className={styles.iconLabel}>{new Date(date).getFullYear()}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
