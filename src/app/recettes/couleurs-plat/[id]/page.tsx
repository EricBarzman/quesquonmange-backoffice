import OneCouleurPlatTable from "@/components/couleur-plat/one-couleur-plat-table";
import { getCouleurPlatById } from "@/hooks/couleurs_plat";

export default async function CouleurPlatPage({ params }: { params: { id: string } }) {
  const id = (await params).id
  const couleur_plat = await getCouleurPlatById(parseInt(id));

  return (
    <OneCouleurPlatTable cat={couleur_plat} />
  )
}