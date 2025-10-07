import { INTENT } from "@/constants/editIntent"
import TypePlatForm from "@/components/types-plat/type-form-plat"
import { getTypePlatById } from "@/hooks/types_plat"

export default async function EditMoment({ params }: { params: { id: string } }) {

  const id = parseInt((await params).id);
  const type_plat = await getTypePlatById(id);

  return (
    <TypePlatForm cat={type_plat} intent={INTENT.update} />
  )
}