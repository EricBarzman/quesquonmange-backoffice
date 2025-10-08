import AddPlatForm from '@/components/plats/add-plat-form';
import { getMomentsAlimentaire } from '@/hooks/repas';
import { getAllTypesPlat } from '@/hooks/types_plat';

export default async function AddRegime() {

  const types_plat = await getAllTypesPlat();
  const moment_journees = await getMomentsAlimentaire();

  return (
      <AddPlatForm all_types_plat={types_plat} all_moments_journee={moment_journees} />
  )
}