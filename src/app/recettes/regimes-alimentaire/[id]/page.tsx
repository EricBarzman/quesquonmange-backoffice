import OneRegimeTable from "@/components/regime/one-regime-table";
import { getRegimeAlimentaireById } from "@/hooks/regimes_alimentaire";

export default async function SaveurPage({ params }: { params: { id: string } }) {
  const id = (await params).id
  const saveur = await getRegimeAlimentaireById(parseInt(id));

  return (
    <OneRegimeTable cat={saveur} />
  )
}