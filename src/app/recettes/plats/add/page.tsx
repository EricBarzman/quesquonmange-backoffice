import AddPlatForm from '@/components/plats/add-plat-form';
import { getCouleursPlat } from '@/hooks/couleurs_plat';
import { getRegimesAlimentaire } from '@/hooks/regimes_alimentaire';
import { getAllRepas } from '@/hooks/repas';
import { getAllTypesPlat } from '@/hooks/types_plat';

export default async function AddRegime() {

  const types_plat = await getAllTypesPlat();
  const repas = await getAllRepas();
  const couleurs = await getCouleursPlat();
  const regimes = await getRegimesAlimentaire();

  return (
      <AddPlatForm types_plat={types_plat} repas={repas} couleurs={couleurs} regimes={regimes} />
  )
}