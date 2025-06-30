import qs from "qs";
import { fetchData } from "@/app/utils/api";
import { Mindstorm } from "@/app/utils/interfaces/mindstorm.interface";
import MindstormsSlider from "@/app/components/slider/mindstorms_slider";

export default async function Mindstorms() {
  const query = qs.stringify({
    populate: {
      image: {
        fields: ['url'],
      },
    },
    sort: ['date:asc', 'name:asc'],
  });

  const strapiData: any = await fetchData("mindstorms?" + query);
  const mindstorms: Mindstorm[] = strapiData.data;

  return (
    <section>
      <h1>Entdecke die LEGO® MINDSTORMS® Produktserie</h1>
      <MindstormsSlider mindstorms={mindstorms} />
    </section>
  );
}
