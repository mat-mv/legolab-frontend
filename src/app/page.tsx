import Image from "next/image";
import styles from "./page.module.css";
import Button from "./components/button";
import TextBox from "./components/text_box"
import { fetchData } from "./utils/api";
import qs from "qs"


interface Button {
  id: number,
  label: string,
  href: string,
  secondary: boolean,
}

interface Image {
  url: string,
}

interface TextBox {
  id: number,
  title: string,
  body: string,
  icon: Image,
  href: string,
}

interface HomePage {
  header: string,
  subHeading: string,
  ctaButtons: Button[],
  textBoxes: TextBox[],
  heroImage: Image,
}

export default async function Home() {

  const query = qs.stringify({
    populate: {
      'heroImage': {
        fields: ['url'],
      },
      'ctaButtons': {
        fields: ['id', 'secondary', 'label', 'href']
      },
      'textBoxes': {
        populate: {
          'icon' : {
            fields: ['url'],
          }
        },
        fields: ['id', 'title', 'body', 'href'],
      }
    },
  })

  const strapiData:any = await fetchData("home-page?" + query)
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
          <Image className={styles.img} src={`https://www.legolab-karlsruhe.de${home.heroImage.url}`} width={400} height={225} alt="Picture"></Image>
        </div>
      </section>
      <section className={styles.slider}>
        {home.textBoxes.map((box) => (
          <TextBox key={box.id} href={box.href} icon={`https://www.legolab-karlsruhe.de${box.icon.url}`} title={box.title}><p>{box.body}</p></TextBox>
        ))}
      </section>
    </section>
  );
}
