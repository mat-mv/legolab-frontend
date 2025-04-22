import qs from "qs";
import { fetchData } from "../utils/api";
import { Mindstorm } from "../utils/interfaces/mindstorm.interface";
import MindstormsSlider from "../components/slider/mindtorms_slider";

export default async function Buch() {

  const query = qs.stringify({
      populate: {
        image: {
          fields: ['url'],
        },
      },
      sort: ['date:asc']
    })
    
    const strapiData:any = await fetchData("mindstorms?" + query)
    const mindstorms:Mindstorm[] = strapiData.data

    
    return (
      <section>
        <h1>Entdecke die LEGO® MINDSTORMS® Produktserie</h1>
        <MindstormsSlider mindstorms={mindstorms} ></MindstormsSlider>
      </section>
    );
}
