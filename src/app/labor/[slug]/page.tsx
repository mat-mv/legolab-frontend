import BotSinglePage from "@/app/components/bot_singlepage";

type Params = Promise<{ slug: string }>


export default async function LaborSinglePage(props: { params: Params }) {
  const params = await props.params;

  return (
    <>
      <BotSinglePage slug={params.slug} category="Labor" />
    </>
  )
}
