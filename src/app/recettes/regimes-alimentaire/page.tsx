import Link from 'next/link';
import AllRegimesTable from '@/components/regime/all-regimes-plat-table';
import { getRegimesAlimentaire } from '@/hooks/regimes_alimentaire';

import './page.css';

export default async function RegimesPage() {

  const cats = await getRegimesAlimentaire();

  return (
    <section className='categories'>
        <AllRegimesTable cats={cats!} />  
        <Link href="/recettes/regimes-alimentaire/add" className='button categories__btn'>Ajouter un régime</Link>
    </section>
  )
}