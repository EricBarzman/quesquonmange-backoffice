import AddPlatForm from '@/components/plats/add-plat-form';
import { getCouleursPlat } from '@/hooks/couleurs_plat';
import { getIngredients } from '@/hooks/ingredients';
import { getRegimesAlimentaire } from '@/hooks/regimes_alimentaire';
import { getAllRepas } from '@/hooks/repas';
import { getSaveurs } from '@/hooks/saveurs';
import { getAllTypesPlat } from '@/hooks/types_plat';
import { getAllUstensils } from '@/hooks/ustensils';

export default async function AddRegime() {

  const types_plat = await getAllTypesPlat();
  const repas = await getAllRepas();
  const couleurs = await getCouleursPlat();
  const regimes = await getRegimesAlimentaire();
  const saveurs = await getSaveurs();
  const ustensils = await getAllUstensils();
  const ingredients = await getIngredients();

  return (
      <AddPlatForm
        types_plat={types_plat}
        repas={repas}
        couleurs={couleurs}
        regimes={regimes}
        saveurs={saveurs}
        ustensils={ustensils}
        ingredients={ingredients}
      />
  )
}