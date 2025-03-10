import { fetchData } from "@/app/utils/api";
import { Bot } from "@/app/utils/interfaces/bot.interface";
import qs from "qs"
import styles from "./page.module.css"
import Image from "next/image";

type Params = Promise<{ slug: string }>

export default async function LaborSinglePage(props: {params: Params}) {
  const params = await props.params;

  const query = qs.stringify({
    populate: {
      image: {
        fields: ['url'],
      },
    },
    filters: {
      slug: {
          $eq: params.slug,
      },
      category: {
        parent: {
          name: {
            $eq: 'Labor'
          }
        }
      }
    },
  })
  
  const strapiData:any = await fetchData("bots?" + query)
  const bot:Bot = strapiData.data[0]

  const build_icons = []

  for (let i = 0; i < 5; i++) {
    if (i < bot.buildDif) {
      build_icons.push(<span key={i} className={["material-symbols-outlined", styles.icon].join(" ")}>build</span>)
    } else {
      build_icons.push(<span key={i} className={["material-symbols-outlined", styles.icon, styles.inactive].join(" ")}>build</span>)
    }
  }

  const code_icons = []

  for (let i = 0; i < 5; i++) {
    if (i < bot.codeDif) {
      code_icons.push(<span key={i} className={["material-symbols-outlined", styles.icon].join(" ")}>terminal</span>)
    } else {
      code_icons.push(<span key={i} className={["material-symbols-outlined", styles.icon, styles.inactive].join(" ")}>terminal</span>)
    }
  }

  return(
    <section>
      <h1>{bot.name}</h1>
      {bot.image ? (
        <Image src={`https://www.legolab-karlsruhe.de${bot.image.url}`} width={400} height={225} alt="Image" className={styles.image}></Image>
      ) : ("")}
      <div className={styles.content}>
      <div className={styles.build_icons}>
        {build_icons}
      </div>
      <div className={styles.code_icons}>
        {code_icons}
      </div>
      {bot.description}
      </div>
    </section>
  )
}
