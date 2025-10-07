import OneMomentTable from "@/components/moments/one-moment-table";
import { getMomentAlimentaireById } from "@/hooks/moment_journees";

export default async function SaveurPage({ params }: { params: { id: string } }) {
  const id = (await params).id
  const moment = await getMomentAlimentaireById(parseInt(id));

  return (
    <OneMomentTable cat={moment} />
  )
}