import { INTENT } from "@/constants/editIntent"
import AmbianceForm from "@/components/ambiance/ambiance-form"
import { getAmbianceById } from "@/hooks/ambiances"

export default async function EditAmbiance({ params }: { params: { id: string } }) {

  const id = parseInt((await params).id);
  const ambiance = await getAmbianceById(id);

  return (
    <AmbianceForm cat={ambiance} intent={INTENT.update} />
  )
}