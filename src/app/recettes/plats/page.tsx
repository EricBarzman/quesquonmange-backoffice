import Link from 'next/link';
import AllPlatsTable from '@/components/plats/all-plats-table';
import { getAllPlats } from '@/hooks/plats';

import './page.css';

export default async function PlatsPage() {

  const cats = await getAllPlats();

  return (
    <section className='categories'>
        <AllPlatsTable cats={cats!} />  
        <Link href="/recettes/plats/add" className='button categories__btn'>Ajouter un plat</Link>
    </section>
  )
}