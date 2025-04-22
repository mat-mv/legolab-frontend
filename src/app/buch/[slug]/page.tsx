import { fetchData } from "@/app/utils/api"
import { Bot } from "@/app/utils/interfaces/bot.interface"
import Button from "../../components/button";
import qs from "qs"
import styles from "./page.module.css"
import Image from "next/image";

type Params = Promise<{ slug: string }>

export default async function BotSinglePage(props: { params: Params }) {
  const params = await props.params;

  const query = qs.stringify({
    populate: {
      image: {
        fields: ['url'],
      },
      'ctaButtons': {
        fields: ['id', 'secondary', 'label', 'href']
      },
      // 'buildHintText': {
      //   fields: ['title', 'body']
      // }
      },
    filters: {
      slug: {
        $eq: params.slug,
      },
      category: {
        parent: {
          name: {
            $eq: 'Buch'
          }
        }
      }
    },
  })

  const strapiData: any = await fetchData("bots?" + query);

  // Debugging: API-Response ausgeben
  // console.log("Strapi API Response:", JSON.stringify(strapiData, null, 2));

  const bot: Bot = strapiData.data[0];


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

  return (
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
      <h2>Bauteile</h2>
      {bot.buildBOM ? (
        <Image src={`https://www.legolab-karlsruhe.de${bot.buildBOM.url}`} width={400} height={225} alt="BOM" className={styles.image}></Image>
      ) : ("BOM")}
      <div className={styles.content}>
        {bot.buildHintText}
      </div>
      <h2>{bot.buildInstructionHeader}</h2>
      <div className={styles.content}>
        {bot.buildInstructionDescription}
        <div className={styles.ctas}>
          {bot.ctaButtons?.map((button) => (
            <Button key={button.id} href={button.href} secondary={button.secondary}>
              {button.label}
            </Button>
          ))}
        </div>
      </div>
    </section>
  )
}