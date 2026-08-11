import { fetchData } from "@/app/utils/api";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";
import qs from "qs"
import styles from "./page.module.css"
import Image from "next/image";
import { Mindstorm } from "@/app/utils/interfaces/mindstorm.interface";
import RelatedBotSlider from "@/app/components/slider/related_bots_slider";

type Params = Promise<{ slug: string }>

export default async function MindstormSinglePage(props: { params: Params }) {
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
  const { name, image, date, longDescRTMD, legoSetNumber, interfaces, developerboard, bluetooth, infrared, codingTypes, bots } = strapiData.data[0] as Mindstorm;
  const sortedCodingTypes = codingTypes
    ? codingTypes
      .split(",")
      .map(item => item.trim())
      .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
      .join(", ")
    : "";

  return (
    <section>
      <h1>{name}</h1>
      <section className={styles.content_section}>
        <div className={styles.top_row}>
          <div className={styles.imageWrapper}>
            {image ? (
              <Image
                src={`https://www.legolab-karlsruhe.de${image.url}`}
                width={400}
                height={400}
                alt={`${name} (LEGO Mindstorms Set ${legoSetNumber})`}
                sizes="(max-width: 1024px) 100vw, 400px"
                className={styles.image}
              ></Image>
            ) : ("")}
          </div>
          <div className={styles.iconWithText}>
            <div className={styles.iconItem}>
              <span className={["material-symbols-outlined", styles.icon].join(" ")}>event</span>
              <span className={styles.iconLabel}>{new Date(date).getFullYear()}</span>
            </div>
            <div className={styles.iconItem}>
              <span className={["material-symbols-outlined", styles.icon].join(" ")}>numbers</span>
              <span className={styles.iconLabel}>{legoSetNumber}</span>
            </div>
            <div className={styles.iconItem}>
              <span className={["material-symbols-outlined", styles.icon].join(" ")}>developer_board</span>
              <span className={styles.iconLabel}>{developerboard}</span>
            </div>
            <div className={styles.iconItem}>
              <span className={["material-symbols-outlined", styles.icon].join(" ")}>open_jam</span>
              <span className={styles.iconLabel}>{interfaces}</span>
            </div>
            <div className={styles.iconItem}>
              {bluetooth && (
                <span className={["material-symbols-outlined", styles.icon].join(" ")}>bluetooth</span>
              )}
              {infrared && (
                <span className={["material-symbols-outlined", styles.icon].join(" ")}>infrared</span>
              )}
            </div>
            <div className={styles.iconItem}>
              <span className={["material-symbols-outlined", styles.icon].join(" ")}>code</span>
              <span className={styles.iconLabel}>{sortedCodingTypes}</span>
            </div>
          </div>
        </div>
        <div className={styles.markdown}>
          <ReactMarkdown remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeSanitize]}>
            {longDescRTMD}
          </ReactMarkdown>
        </div>
      </section>
      {bots && bots.length > 0 && (
        <section className={styles.related_section}>
          <h2>Verwendbar mit:</h2>
          <div className={styles.related_bots}>
            <RelatedBotSlider bots={bots} />
          </div>
        </section>
      )}
    </section>
  )
}