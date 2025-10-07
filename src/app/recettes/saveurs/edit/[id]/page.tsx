import { INTENT } from "@/app/constants/editIntent"
import SaveurForm from "@/components/saveurs/saveur-form"
import { getSaveurById } from "@/hooks/saveurs"
import { Saveur } from "@/types/recettes.types";

async function EditSaveur({ params }: { params: { id: string } }) {

  const id = parseInt((await params).id);
  const saveur: Saveur = await getSaveurById(id);

  return (
    <SaveurForm saveur={saveur} intent={INTENT.update} />
  )
}

export default EditSaveur