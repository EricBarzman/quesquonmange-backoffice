import Link from 'next/link';
import AllUstensilsTable from '@/components/ustensils/all-ustensils-table';
import { getAllUstensils } from '@/hooks/ustensils';

import './page.css';

export default async function UstensilsPage() {

  const cats = await getAllUstensils();

  return (
    <section className='categories'>
        <AllUstensilsTable cats={cats!} />  
        <Link href="/recettes/ustensils/add" className='button categories__btn'>Ajouter un ustensil</Link>
    </section>
  )
}