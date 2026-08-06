import qs from "qs";
import BotCategory from "../components/bot_category";
import styles from "./page.module.css";
import { fetchData } from "../utils/api";
import { Category } from "../utils/interfaces/category.interface";
import { sortCategoriesBySemesterDesc } from "../utils/sortSemesters";

export default async function Labor() {

  const query = qs.stringify({
      populate: {
        parent: {
          fields: ['name'],
        },
        subCategories: {
          fields: ['name'],
        },
      },
      filters: {
        parent: {
          name: {
            $eq: 'Labor',
          }
        },
      },
    })

    const strapiData:any = await fetchData("categories?" + query)
    const categories:Category[] = sortCategoriesBySemesterDesc(strapiData.data)

    
    return (
      <section>
        <h1>Projektarbeiten</h1>
        {categories.map((category) => (
          <BotCategory key={category.id} name={category.name} parent={undefined} subCategories={[]} id={0} ></BotCategory>
        ))}
      </section>
    );
}
