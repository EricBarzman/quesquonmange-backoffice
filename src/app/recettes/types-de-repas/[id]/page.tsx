import OneTypeRepasTable from "@/components/types-repas/one-type-repas-table";
import { getTypeRepasById } from "@/hooks/types_repas";

export default async function SaveurPage({ params }: { params: { id: string } }) {
  const id = (await params).id
  const type_repas = await getTypeRepasById(parseInt(id));

  return (
    <OneTypeRepasTable cat={type_repas} />
  )
}