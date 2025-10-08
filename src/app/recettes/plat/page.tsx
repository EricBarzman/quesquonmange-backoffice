import Link from 'next/link';
import AllTypesPlatTable from '@/components/types-plat/all-types-plat-table';
import { getAllTypesPlat } from '@/hooks/types_plat';

import './page.css';

export default async function TypesPlatPage() {

  const cats = await getAllTypesPlat();

  return (
    <section className='categories'>
        <AllTypesPlatTable cats={cats!} />  
        <Link href="/recettes/types-de-plat/add" className='button categories__btn'>Ajouter un type de plat</Link>
    </section>
  )
}