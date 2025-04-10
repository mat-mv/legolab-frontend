import Image from "next/image";
import styles from "./page.module.css";
import Button from "../components/button";
import TextBox from "../components/text_box"
import { fetchData } from "../utils/api";
import { Image as ImageInterface } from "../utils/interfaces/image.interface";
import { Button as ButtonInterface } from "../utils/interfaces/button.interface";
import { TextBox as TextBoxInterface } from "../utils/interfaces/text_box.interface";
import qs from "qs";



interface ProgrammierenPage {
  header: string,
  description: string,
  programme: TextBoxInterface[],
}

export default async function Programmieren() {

  const query = qs.stringify({
    populate: {
      'programme': {
        populate: {
          'icon' : {
            fields: ['url'],
          }
        },
        fields: ['id', 'title', 'body', 'href'],
      }
    },
  })

  const strapiData:any = await fetchData("programmieren?" + query)
  const home:ProgrammierenPage = strapiData.data

  return (
    <section>
      <section className={[styles.hero_section].join(" ")}>
        <h1>{home.header}</h1>
        <p>{home.description}</p>
      </section>
      <section className={styles.box_section}>
        {home.programme.map((box) => (
          <TextBox key={box.id} href={box.href} icon={`https://www.legolab-karlsruhe.de${box.icon.url}`} title={box.title}><p>{box.body}</p></TextBox>
        ))}
      </section>
    </section>
  );
}
