import Link from 'next/link';
import CouleursPlatTable from '@/components/couleur-plat/couleurs-plat-table';
import { getCouleursPlat } from '@/hooks/couleurs_plat';

export default async function ComplexitesPage() {

  const couleurs = await getCouleursPlat();

  return (
    <section className='categories'>
        <CouleursPlatTable cats={couleurs!} />  
        <Link href="/recettes/couleurs-plat/add" className='button categories__btn'>Ajouter une couleur</Link>

    </section>
  )
}