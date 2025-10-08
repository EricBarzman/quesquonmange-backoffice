import OneAmbianceTable from "@/components/ambiance/one-ambiance-table";
import { getAmbianceById } from "@/hooks/ambiances";

export default async function AmbiancePage({ params }: { params: { id: string } }) {
  const id = (await params).id
  const ambiance = await getAmbianceById(parseInt(id));

  return (
    <OneAmbianceTable cat={ambiance} />
  )
}