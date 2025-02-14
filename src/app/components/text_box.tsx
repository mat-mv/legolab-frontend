import Link from "next/link";
import Image from "next/image";
import styles from "./TextBox.module.css"

interface TextBoxProps {
  title: string;
  href: string;
  children: React.ReactElement;
  icon: string;
}

export default function TextBox({ title, href, children, icon }: Readonly<TextBoxProps>) {
  return(
    <Link href={href} className={styles.text_box}>
      <Image src={icon} width={64} height={64} alt="Icon"></Image>
      <h4 className={styles.title}>{title}</h4>
      {children}
    </Link>
  )
}