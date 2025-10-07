import { INTENT } from "@/constants/editIntent"
import UstensilForm from "@/components/ustensils/ustensil-form-plat"
import { getUstensilById } from "@/hooks/ustensils"

export default async function EditMoment({ params }: { params: { id: string } }) {

  const id = parseInt((await params).id);
  const ustensil = await getUstensilById(id);

  return (
    <UstensilForm cat={ustensil} intent={INTENT.update} />
  )
}