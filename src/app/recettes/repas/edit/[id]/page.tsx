import { INTENT } from "@/constants/editIntent"
import RepasForm from "@/components/repas/repas-form"
import { getRepasById } from "@/hooks/repas"

export default async function EditRepas({ params }: { params: { id: string } }) {

  const id = parseInt((await params).id);
  const moment = await getRepasById(id);

  return (
    <RepasForm cat={moment} intent={INTENT.update} />
  )
}