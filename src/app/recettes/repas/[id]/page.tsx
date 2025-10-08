import OneRepasTable from "@/components/repas/one-repas-table";
import { getRepasById } from "@/hooks/repas";

export default async function RepasPage({ params }: { params: { id: string } }) {
  const id = (await params).id
  const repas = await getRepasById(parseInt(id));

  return (
    <OneRepasTable cat={repas} />
  )
}