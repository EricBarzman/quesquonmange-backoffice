import Link from 'next/link';
import AllMomentsTable from '@/components/moments/all-moments-table';
import { getMomentsAlimentaire } from '@/hooks/moment_journees';

import './page.css';

export default async function RegimesPage() {

  const cats = await getMomentsAlimentaire();

  return (
    <section className='categories'>
        <AllMomentsTable cats={cats!} />  
        <Link href="/recettes/moments-journee/add" className='button categories__btn'>Ajouter un moment de la journée</Link>
    </section>
  )
}