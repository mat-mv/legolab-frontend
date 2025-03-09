import { Category } from "../utils/interfaces/category.interface"
import { fetchData } from "../utils/api"
import qs from "qs"
import BotSlider from "./bot_slider"
import { Bot } from "../utils/interfaces/bot.interface"
import styles from "./BotCategory.module.css"

export default async function BotCategory(category: Category) {

  const query = qs.stringify({
    populate: {
      image: {
        fields: ['url'],
      },
    },
    filters: {
      category: {
        name: {
          $eq: category.name,
        },
      },
    },
  })

  const strapiData:any = await fetchData("bots?" + query)
  const bots:Bot[] = strapiData.data

  return(
    <section className={styles.container}>
        <h4>{category.name}</h4>
        <BotSlider bots={bots}/>
      </section>
  )
}
