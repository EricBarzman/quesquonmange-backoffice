import { INTENT } from "@/app/constants/editIntent"
import ComplexiteForm from "@/components/complexites/complexite-form"
import { getComplexiteById } from "@/hooks/complexites"
import { Complexite } from "@/types/recettes.types";

async function EditComplexite({ params }: { params: { id: string } }) {

  const id = parseInt((await params).id);
  const complexite: Complexite = await getComplexiteById(id);

  return (
    <ComplexiteForm complexite={complexite} intent={INTENT.update} />
  )
}

export default EditComplexite