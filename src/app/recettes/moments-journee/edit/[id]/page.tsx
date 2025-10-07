import { INTENT } from "@/constants/editIntent"
import MomentForm from "@/components/moments/moment-form"
import { getMomentAlimentaireById } from "@/hooks/moment_journees"

export default async function EditMoment({ params }: { params: { id: string } }) {

  const id = parseInt((await params).id);
  const moment = await getMomentAlimentaireById(id);

  return (
    <MomentForm cat={moment} intent={INTENT.update} />
  )
}