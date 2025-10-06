import Link from 'next/link';
import './saveurs.css'
import SaveursTable from '@/components/saveurs/saveurs-table';
import { getSaveurs } from '@/hooks/saveurs';

export default async function SaveursPage() {

  const saveurs = await getSaveurs();

  return (
    <section className='saveurs'>
        <SaveursTable saveurs={saveurs!} />  
        <Link href="/recettes/saveurs/add" className='button saveurs__btn'>Ajouter une saveur</Link>

    </section>
  )
}