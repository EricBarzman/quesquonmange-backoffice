import OneSaveurTable from "@/components/saveurs/one-saveur-table";
import { getSaveurById } from "@/hooks/saveurs";

export default async function SaveurPage({ params }: { params: { id: string } }) {
  const id = (await params).id
  const saveur = await getSaveurById(parseInt(id));

  return (
    <OneSaveurTable saveur={saveur} />
  )
}