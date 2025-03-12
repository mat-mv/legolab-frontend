import { fetchData } from "@/app/utils/api";
import qs from "qs"
import styles from "./page.module.css"
import Image from "next/image";
import { Mindstorm } from "@/app/utils/interfaces/mindstorm.interface";
import RelatedBotSlider from "@/app/components/slider/related_bots_slider";

type Params = Promise<{ slug: string }>

export default async function BotSinglePage(props: { params: Params }) {
  const params = await props.params;

  const query = qs.stringify({
    populate: {
      image: {
        fields: ['url'],
      },
      bots: {
        populate: {
          image: {
            fields: ['url'],
          },
          category: {
            populate: {
              parent: {
                fields: ['name']
              }
            }
          }
        }
      },
    },
    filters: {
      slug: {
        $eq: params.slug,
      },
    },
  })

  const strapiData: any = await fetchData("mindstorms?" + query)
  const mindstorm: Mindstorm = strapiData.data[0]

  const code_icons = []

  for (let i = 0; i < 5; i++) {
    if (i < mindstorm.difficulty) {
      code_icons.push(<span key={i} className={["material-symbols-outlined", styles.icon].join(" ")}>terminal</span>)
    } else {
      code_icons.push(<span key={i} className={["material-symbols-outlined", styles.icon, styles.inactive].join(" ")}>terminal</span>)
    }
  }

  return (
    <section>
      <h1>{mindstorm.name}</h1>
      <section className={styles.content_section}>
        <div>
          {mindstorm.image ? (
            <Image src={`https://www.legolab-karlsruhe.de${mindstorm.image.url}`} width={400} height={225} alt="Image" className={styles.image}></Image>
          ) : ("")}
        </div>
        <div className={styles.content}>
          <div className={styles.code_icons}>
            {code_icons}
          </div>
          {mindstorm.description}
        </div>
      </section>
      <section className={styles.related_section}>
        <h2>Verwendbar mit:</h2>
        <div className={styles.related_bots}><RelatedBotSlider bots={mindstorm.bots}></RelatedBotSlider></div>
      </section>
    </section>
  )
}