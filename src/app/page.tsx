import Image from "next/image";
import styles from "./page.module.css";
import Button from "./components/button";
import TextBox from "./components/text_box"
import ConfettiButton from "./components/confettiButton";
import { fetchData } from "./utils/api";
import { Image as ImageInterface } from "./utils/interfaces/image.interface";
import { Button as ButtonInterface } from "./utils/interfaces/button.interface";
import { TextBox as TextBoxInterface } from "./utils/interfaces/text_box.interface"
import qs from "qs"


interface HomePage {
  header: string,
  subHeading: string,
  ctaButtons: ButtonInterface[],
  textBoxes: TextBoxInterface[],
  heroImage: ImageInterface,
}

export default async function Home() {

  const query = qs.stringify({
    populate: {
      'heroImage': {
        fields: ['url', 'width', 'height'],
      },
      'ctaButtons': {
        fields: ['id', 'secondary', 'label', 'href']
      },
      'textBoxes': {
        populate: {
          'icon': {
            fields: ['url'],
          }
        },
        fields: ['id', 'title', 'body', 'href'],
      }
    },
  })

  const strapiData: any = await fetchData("home-page?" + query)
  const home: HomePage = strapiData.data

  // Berechne die Höhe im gleichen Seitenverhältnis von heroImage:
  const displayHeight = home.heroImage?.width && home.heroImage?.height
    ? Math.round((400 / home.heroImage?.width) * home.heroImage?.height)
    : undefined;




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
          <Image className={styles.img} src={`https://www.legolab-karlsruhe.de${home.heroImage.url}`} width={home.heroImage.width} height={home.heroImage.height} alt="Picture"></Image>
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
