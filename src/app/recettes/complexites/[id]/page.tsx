import OneComplexiteTable from "@/components/complexites/one-complexite-table";
import { getComplexiteById } from "@/hooks/complexites";

export default async function ComplexitePage({ params }: { params: { id: string } }) {
  const id = (await params).id
  const complexite = await getComplexiteById(parseInt(id));

  return (
    <OneComplexiteTable complexite={complexite} />
  )
}