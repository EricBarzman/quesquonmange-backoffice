import OneUstensilTable from "@/components/ustensils/one-ustensil-table";
import { getUstensilById } from "@/hooks/ustensils";

export default async function SaveurPage({ params }: { params: { id: string } }) {
  const id = (await params).id
  const ustensil = await getUstensilById(parseInt(id));

  return (
    <OneUstensilTable cat={ustensil} />
  )
}