import { INTENT } from "@/app/constants/editIntent"
import CouleurPlatForm from "@/components/couleur-plat/couleur-plat-form";
import { getCouleurPlatById } from "@/hooks/couleurs_plat"
import { Couleur_plat } from "@/types/recettes.types";

export default async function EditCouleurPlat({ params }: { params: { id: string } }) {

  const id = parseInt((await params).id);
  const couleur: Couleur_plat = await getCouleurPlatById(id);

  return (
    <CouleurPlatForm cat={couleur} intent={INTENT.update} />
  )
}