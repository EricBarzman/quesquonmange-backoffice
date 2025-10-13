import OnePlatTable from "@/components/plats/one-plat-table";
import { getPlatById } from "@/hooks/plats";

export default async function SaveurPage({ params }: { params: { id: string } }) {
  const id = (await params).id
  const plat = await getPlatById(parseInt(id));

  console.log(plat)

  return (
    <OnePlatTable cat={plat} />
  )
}