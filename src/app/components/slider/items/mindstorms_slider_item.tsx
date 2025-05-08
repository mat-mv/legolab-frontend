import Link from "next/link";
import Image from "next/image";
import styles from "./MindstormsSliderItem.module.css";
import { Mindstorm } from "../../../utils/interfaces/mindstorm.interface";

export default function MindstormsSliderItem({ date, name, shortDescription, description, image, developerboard, legoSetNumber, infrared, bluetooth, codingTypes, interfaces, slug }: Readonly<Mindstorm>) {
  const sortedCodingTypes = codingTypes
    .split(",")
    .map(s => s.trim())
    .sort()
    .join(", ");

  return (
    <Link href={slug} className={styles.text_box}>
      {image ? (
        <Image src={`https://www.legolab-karlsruhe.de${image.url}`} width={400} height={225} alt="Image" className={styles.image} />
      ) : ("")}
      <div className={styles.content}>
        <h4 className={styles.title}>{name}</h4>

        <div className={styles.iconWithText}>
          <div className={styles.iconItem}>
            <span className={["material-symbols-outlined", styles.icon].join(" ")}>event</span>
            <span className={styles.iconLabel}>{new Date(date).getFullYear()}</span>
          </div>
          <div className={styles.iconItem}>
            <span className={["material-symbols-outlined", styles.icon].join(" ")}>numbers</span>
            <span className={styles.iconLabel}>{legoSetNumber}</span>
          </div>
          <div className={styles.iconItem}>
            <span className={["material-symbols-outlined", styles.icon].join(" ")}>developer_board</span>
            <span className={styles.iconLabel}>{developerboard}</span>
          </div>
          <div className={styles.iconItem}>
            <span className={["material-symbols-outlined", styles.icon].join(" ")}>open_jam</span>
            <span className={styles.iconLabel}>{interfaces}</span>
          </div>
          <div className={styles.iconItem}>
            {bluetooth && (
              <span className={["material-symbols-outlined", styles.icon].join(" ")}>bluetooth</span>
            )}
            {infrared && (
              <span className={["material-symbols-outlined", styles.icon].join(" ")}>infrared</span>
            )}
          </div>
          <div className={styles.iconItem}>
            <span className={["material-symbols-outlined", styles.icon].join(" ")}>code</span>
            <span className={styles.iconLabel}>{sortedCodingTypes}</span>
          </div>
        </div>
        <p className={styles.shortDescription}>{shortDescription}</p>
      </div>
    </Link>
  );
}
