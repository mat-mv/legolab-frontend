import Link from "next/link";
import styles from "./Button.module.css"

interface ButtonProps {
  href: string;
  children: React.ReactNode;
  secondary: boolean;
}

export default function Button({ href, children, secondary }: Readonly<ButtonProps>) {
  return(
    <Link href={href} className={[secondary ? styles.secondary : "", styles.button].join(" ")}>
      {children}
    </Link>
  )
}