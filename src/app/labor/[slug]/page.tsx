import { fetchData } from "@/app/utils/api"
import { Bot } from "@/app/utils/interfaces/bot.interface"
import { BotSinglePage } from "@/app/utils/interfaces/bot_single_page.interface"
import { PlatzhalterMedia } from "@/app/utils/interfaces/platzhalter_media.interface";
import Button from "../../components/button";
import qs from "qs"
import styles from "./page.module.css"
import Image from "next/image";
import BotFocusKachel from "@/app/components/bot_focus_kachel"

type Params = Promise<{ slug: string }>

export default async function LaborSinglePage(props: { params: Params }) {
  const params = await props.params;

  const query = qs.stringify({
    populate: {
      image: {
        fields: ['url'],
      },
      bom: {
        fields: ['url', 'width', 'height'],
      },
      'ctaButtons': {
        fields: ['id', 'secondary', 'label', 'href']
      },
      teammitglieds: {
        fields: ['name'],
        populate: {
          image: {
            fields: ['url'],
          },
        }
      },
      category:{
        fields: ['name']
      }
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

  const query2 = qs.stringify({
    populate: {
      fields: ['textcontent'],
      bild: {
        fields: ['url'],
      },
    }
  })





  const strapiData: any = await fetchData("bots?" + query)
  const bot: Bot = strapiData.data[0]

  const strapiData2: any = await fetchData("bot-single-page?")
  const BotPage: BotSinglePage = strapiData2.data

  const strapiData3: any = await fetchData("platzhalter-medias?" + query2)
  const platzhalters: PlatzhalterMedia[] = strapiData3.data
  const platzhalterAnleitung = platzhalters.find(
    (p) => p.name === "BotInstructions"
  );


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


  console.log("teammitglieds", bot.teammitglieds);
  console.log("category", bot.category)
  return (

    <section>
      {/*Erster Block mit allgemeinen Infos*/}
      <section className={styles.info_block}>
        <div>
          {bot.image ? (
            <Image src={`https://www.legolab-karlsruhe.de${bot.image.url}`} width={400} height={225} alt="Image" className={styles.image}></Image>
          ) : ("")}


          <div className={styles.botBildUnterleiste}>

            <div>
              <div className={styles.build_icons}>
                {build_icons}
              </div>
              <div className={styles.code_icons}>
                {code_icons}
              </div>
            </div>



            {Array.isArray(bot.teammitglieds) && bot.teammitglieds.length > 0 && (
              <div className={styles.teammember_box}>
                {bot.teammitglieds?.[0]?.image?.url ? (
                  <Image
                    src={`https://www.legolab-karlsruhe.de${bot.teammitglieds?.[0]?.image?.url}`}
                    width={80}
                    height={20}
                    alt="Image"
                    style={{ height: "100%", width: "auto", objectFit: "cover" }}
                  />
                ) : ("")}
                <p>{bot.teammitglieds[0]?.name}</p>
              </div>
            )}

          </div>
        </div>



        <div>
          <h1>{bot.name}</h1>
          <div className={styles.content}>
            {bot.description}
            {bot.category?.name}
          </div>
        </div>

      </section>

      {/*Zweiter Block mit Baunanleitung etc*/}

      {/*Wenn es einen Tip gibt, wird dieser hier angezeigt*/}
      {bot.buildHintDescription && bot.buildHintDescription.trim() !== "" && (
        <section className={styles.hint}>
          <strong>{BotPage.BuildHintHeader}</strong>
          {bot.buildHintDescription}
        </section>
      )}

      <section className={styles.info_block}>
        {/*Wenn es eine Bom gibt, wird diese hier angezeigt*/}
        {bot.bom && bot.bom.url !== "" && (
          <div>
            <div>
              <h3>{BotPage.BomHintHeader}</h3>
              {BotPage.BuildDescription}
            </div>
            <div className={styles.imageBOM}>
              {bot.bom ? (
                <Image
                  src={`https://www.legolab-karlsruhe.de${bot.bom.url}`}
                  alt={`${bot.name} BOM`}
                  fill
                  style={{ objectFit: "contain" }}
                />
              ) : ("Fehler: BOM ist nicht verfügbar oder konnte nicht geladen werden.")}
            </div>
          </div>
        )}
        {/*Wenn es eine Anleitung gibt, wird diese hier angezeigt*/}
        {bot.buildInstructionDescription && bot.buildInstructionDescription.trim() !== "" && (
          <div>
            <h3>{BotPage.BuildInstructionHeader}</h3>
            
            <BotFocusKachel
              tip={bot.buildInstructionDescription}
              platzhalterAnleitung={platzhalterAnleitung?.textcontent}
              platzhalterBildUrl={platzhalterAnleitung?.bild?.url ? `https://www.legolab-karlsruhe.de${platzhalterAnleitung.bild.url}` : undefined}
            />
          </div>
        )}


      </section>
      <div className={styles.ctas}>
        {bot.ctaButtons?.map((button) => (
          <Button key={button.id} href={button.href} secondary={button.secondary}>
            {button.label}
          </Button>
        ))}
      </div>





    </section>
  )
}
