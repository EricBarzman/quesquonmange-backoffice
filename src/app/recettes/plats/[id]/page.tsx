import OneTypePlatTable from "@/components/types-plat/one-type-plat-table";
import { getTypePlatById } from "@/hooks/types_plat";

export default async function SaveurPage({ params }: { params: { id: string } }) {
  const id = (await params).id
  const type_plat = await getTypePlatById(parseInt(id));

  return (
    <OneTypePlatTable cat={type_plat} />
  )
}