import { Category } from "../utils/interfaces/category.interface"
import { fetchData } from "../utils/api"
import qs from "qs"
import BotSlider from "./slider/bot_slider"
import { Bot } from "../utils/interfaces/bot.interface"
import styles from "./BotCategory.module.css"

export default async function BotCategory(category: Category) {
  const query = qs.stringify({
    populate: {
      image: {
        fields: ['url', 'width', 'height'],
      },
    },
    filters: {
      category: {
        name: {
          $eq: category.name,
        },
      },
    },
    sort: ['codeDif:asc','buildDif:asc'],
  }, { encodeValuesOnly: true });

  const strapiData: any = await fetchData("bots?" + query);
  const bots: Bot[] = strapiData.data;

  if (bots.length === 0) {
    return null;
  }

  return (
    <section className={styles.container}>
      <h3>{category.name}</h3>
      <BotSlider bots={bots} />
    </section>
  );
}
