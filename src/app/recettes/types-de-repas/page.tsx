import Link from 'next/link';
import AllTypesRepasTable from '@/components/types-repas/all-types-repas-table';
import { getAllTypesRepas } from '@/hooks/types_repas';

import './page.css';

export default async function TypesRepasPage() {

  const cats = await getAllTypesRepas();

  return (
    <section className='categories'>
        <AllTypesRepasTable cats={cats!} />  
        <Link href="/recettes/types-de-repas/add" className='button categories__btn'>Ajouter un type de repas</Link>
    </section>
  )
}