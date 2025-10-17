import { getAllTypesPlat, getTypePlatById } from "@/hooks/types_plat"
import { getAllRepas } from "@/hooks/repas";
import { getCouleursPlat } from "@/hooks/couleurs_plat";
import { getRegimesAlimentaire } from "@/hooks/regimes_alimentaire";
import { getSaveurs } from "@/hooks/saveurs";
import { getAllUstensils } from "@/hooks/ustensils";
import { getIngredients } from "@/hooks/ingredients";
import { getComplexites } from "@/hooks/complexites";
import { getPlatById } from "@/hooks/plats";
import EditPlatForm from "@/components/plats/edit-plat-form";

export default async function EditPlat({ params }: { params: { id: string } }) {

  const id = (await params).id
  const plat = await getPlatById(parseInt(id));

  const types_plat = await getAllTypesPlat();
  const repas = await getAllRepas();
  const couleurs = await getCouleursPlat();
  const regimes = await getRegimesAlimentaire();
  const saveurs = await getSaveurs();
  const ustensils = await getAllUstensils();
  const ingredients = await getIngredients();
  const complexites = await getComplexites();

  return (
    <EditPlatForm
      plat={plat}
      types_plat={types_plat}
      repas={repas}
      couleurs={couleurs}
      regimes={regimes}
      saveurs={saveurs}
      ustensils={ustensils}
      ingredients={ingredients}
      complexites={complexites}
    />
  )
}