import Link from 'next/link';
import AllAmbiancesTable from '@/components/ambiance/all-ambiances-table';
import { getAllAmbiances } from '@/hooks/ambiances';

import './page.css';

export default async function AllAmbiancesPage() {

  const cats = await getAllAmbiances();

  return (
    <section className='categories'>
        <AllAmbiancesTable cats={cats!} />  
        <Link href="/recettes/ambiances/add" className='button categories__btn'>
          Ajouter une ambiance
        </Link>
    </section>
  )
}