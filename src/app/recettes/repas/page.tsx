import Link from 'next/link';
import AllRepasTable from '@/components/repas/all-repas-table';
import { getAllRepas } from '@/hooks/repas';

import './page.css';

export default async function AllRepasPage() {

  const cats = await getAllRepas();

  return (
    <section className='categories'>
        <AllRepasTable cats={cats!} />  
        <Link href="/recettes/repas/add" className='button categories__btn'>
          Ajouter un repas
        </Link>
    </section>
  )
}