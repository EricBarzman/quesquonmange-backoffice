import AddPlatForm from '@/components/plats/add-plat-form';
import { getAllRepas } from '@/hooks/repas';
import { getAllTypesPlat } from '@/hooks/types_plat';

export default async function AddRegime() {

  const types_plat = await getAllTypesPlat();
  const repas = await getAllRepas();

  return (
      <AddPlatForm types_plat={types_plat} repas={repas} />
  )
}