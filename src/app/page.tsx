import Image from "next/image";
import styles from "./page.module.css";
import Button from "./components/button";
import TextBox from "./components/text_box"
import { fetchData } from "./utils/api";


interface Button {
  id: number,
  label: string,
  href: string,
  secondary: boolean,
}

interface TextBox {
  id: number,
  title: string,
  body: string,
  image: string,
  href: string,
}

interface HomePage {
  header: string,
  subHeading: string,
  ctaButtons: Button[],
  textBoxes: TextBox[],
}

export default async function Home() {

  const strapiData:any = await fetchData("home-page?populate=*")
  const home:HomePage = strapiData.data

  return (
    <section>
      <section className={[styles.hero_section].join(" ")}>
        <div>
          <h1>{home.header}</h1>
          <p>{home.subHeading}</p>
          <div className={styles.ctas}>
            {home.ctaButtons.map((button) => (
              <Button key={button.id} href={button.href} secondary={button.secondary}>{button.label}</Button>
            ))}
          </div>
        </div>
        <div>
          <Image className={styles.img} src="https://images.pexels.com/photos/28184434/pexels-photo-28184434/free-photo-of-meer-natur-wasser-blau.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" width={400} height={225} alt="Picture"></Image>
        </div>
      </section>
      <section className={styles.slider}>
        {home.textBoxes.map((box) => (
          <TextBox key={box.id} href={box.href} icon="/next.svg" title={box.title}><p>{box.body}</p></TextBox>
        ))}
      </section>
    </section>
  );
}
