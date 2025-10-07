import { INTENT } from "@/constants/editIntent"
import RegimeForm from "@/components/regime/regime-form"
import { getRegimeAlimentaireById } from "@/hooks/regimes_alimentaire"

async function EditSaveur({ params }: { params: { id: string } }) {

  const id = parseInt((await params).id);
  const saveur = await getRegimeAlimentaireById(id);

  return (
    <RegimeForm cat={saveur} intent={INTENT.update} />
  )
}

export default EditSaveur