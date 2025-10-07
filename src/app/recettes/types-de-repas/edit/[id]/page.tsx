import { INTENT } from "@/constants/editIntent"
import TypeRepasForm from "@/components/types-repas/type-repas-form"
import { getTypeRepasById } from "@/hooks/types_repas"

export default async function EditMoment({ params }: { params: { id: string } }) {

  const id = parseInt((await params).id);
  const type_repas = await getTypeRepasById(id);

  return (
    <TypeRepasForm cat={type_repas} intent={INTENT.update} />
  )
}