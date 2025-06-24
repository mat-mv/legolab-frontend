import qs from "qs";
import { fetchData } from "@/app/utils/api";
import { LinksPerChapter } from "@/app/utils/interfaces/links_per_chapter";
import LinksTabs from "@/app/components/tabs/links_tabs";



export default async function LinksPage() {

  const query = qs.stringify({
    populate: {
      linkList: {
        fields: ['href', 'label', 'target'],
      }
    },
    sort: ['chapter:asc'],
  })

  const strapiData: any = await fetchData("links-per-chapters?" + query);
  const links_per_chapter: LinksPerChapter[] = strapiData.data;

  return (
    <section>
      <LinksTabs links_per_chapter={links_per_chapter} />
    </section>
  )
}