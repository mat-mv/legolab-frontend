import { fetchData } from "@/app/utils/api"
import { Bot } from "@/app/utils/interfaces/bot.interface"
import { BotSinglePage as BotSinglePageInterface } from "@/app/utils/interfaces/bot_single_page.interface"
import { PlatzhalterMedia } from "@/app/utils/interfaces/platzhalter_media.interface";
import { Image as ImageInterface } from "@/app/utils//interfaces/image.interface";
import Button from "@/app/components/button";
import qs from "qs"
import styles from "./BotSinglePage.module.css"
import Image from "next/image";
import BotFocusKachel from "@/app/components/bot_focus_kachel"
import Link from "next/link";
import { Button as ButtonInterface } from "@/app/utils/interfaces/button.interface";

interface BotProps {
  slug: string,
  category: string,
}

interface Banner {
  title: string,
  subTitle: string,
  image: ImageInterface,
  ctaButton: ButtonInterface,
}


export default async function BotSinglePage({ slug, category }: Readonly<BotProps>) {

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
      category: {
        fields: ['name'],
        populate: {
          parent: {
            fields: ['name'],
          }
        }
      }
    },
    filters: {
      slug: {
        $eq: slug,
      },
      category: {
        parent: {
          name: {
            $eq: category,
          }
        }
      }
    },

  })
  //Platzhalter Content
  const query2 = qs.stringify({
    populate: {
      fields: ['textcontent'],
      bild: {
        fields: ['url'],
      },
    }
  })
  //Buch Content
  const query3 = qs.stringify({
    populate: {
      image: {
        fields: ['url', 'width', 'height'],
      },
      ctaButton: {
        fields: ['href', 'secondary', 'label']
      }
    }
  });





  const strapiData: any = await fetchData("bots?" + query)
  const bot: Bot = strapiData.data[0]

  const strapiData2: any = await fetchData("bot-single-page?")
  const BotPage: BotSinglePageInterface = strapiData2.data

  const strapiData3: any = await fetchData("platzhalter-medias?" + query2)
  const platzhalters: PlatzhalterMedia[] = strapiData3.data
  const platzhalterAnleitung = platzhalters.find(
    (p) => p.name === "BotInstructions"
  );
  const platzhalterPerson = platzhalters.find(
    (p) => p.name === "PlatzhalterAvatar"
  );

  const strapiData4: any = await fetchData("buch-banner?" + query3);
  const banner: Banner = strapiData4.data;


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

  console.log("banner URL", banner.ctaButton.href);
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



            {/*Wenn die Parent-Categorie vom Bot "Buch" hat, gebe das Buch als Author an*/}
            {bot.category.parent?.name.trim() == "Buch" && (
              <Link href={banner.ctaButton.href}>
                <div className={styles.teammember_box}>

                  {banner?.image?.url ? (
                    <Image
                      src={`https://www.legolab-karlsruhe.de${banner?.image?.url}`}
                      width={80}
                      height={20}
                      alt="Image"
                      style={{ height: "100%", width: "auto", objectFit: "cover" }}
                    />
                  ) : ("")}

                  <p>{banner?.title}</p>
                </div>
              </Link>
            )}

            {/*Wenn der Bot ein Teammitglied hat, zeige es an (im Moment nur das erste eingetragene)*/}
            {Array.isArray(bot.teammitglieds) && bot.teammitglieds.length > 0 && (
              bot.teammitglieds.map((mitglied: { name: string; image?: { url?: string } }, idx: number) => (
                <Link href="/team" key={idx}>
                  <div className={styles.teammember_box}>
                      <Image
                        src={`https://www.legolab-karlsruhe.de${mitglied?.image?.url ? mitglied.image.url : platzhalterPerson?.bild?.url}`}
                        width={80}
                        height={20}
                        alt="Image"
                        style={{ height: "100%", width: "auto", objectFit: "cover" }}
                      />
                    <p>{mitglied.name}</p>
                  </div>
                </Link>
              ))
            )}

          </div>
        </div>



        <div>
          <h1>{bot.name}</h1>

          <div>
            <div className={styles.build_icons}>
              {build_icons}
            </div>
            <div className={styles.code_icons}>
              {code_icons}
            </div>
          </div>

          <div className={styles.content}>
            {bot.description}
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
            <div>
              {platzhalterAnleitung?.textcontent}
            </div>

            {/*Sobald die .mpd Integration funktioniert, soll die Bauanleitung hier erscheinen
            <BotFocusKachel
              tip={bot.buildInstructionDescription}
              platzhalterAnleitung={platzhalterAnleitung?.textcontent}
              platzhalterBildUrl={platzhalterAnleitung?.bild?.url ? `https://www.legolab-karlsruhe.de${platzhalterAnleitung.bild.url}` : undefined}
              botName={bot.name}
            />
            */}
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
