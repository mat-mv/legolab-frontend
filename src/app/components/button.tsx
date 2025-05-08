import Link from "next/link";

interface ButtonProps {
  href: string;
  children: React.ReactNode;
  secondary: boolean;
}

export default function Button({ href, children, secondary }: Readonly<ButtonProps>) {
  return(
    <Link href={href} className={[secondary ? "secondary" : "", "button"].join(" ")}>
      {children}
    </Link>
  )
}