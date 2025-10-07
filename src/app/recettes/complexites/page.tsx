import Link from 'next/link';
import './complexites.css'
import ComplexitesTable from '@/components/complexites/complexites-table';
import { getComplexites } from '@/hooks/complexites';

export default async function ComplexitesPage() {

  const complexites = await getComplexites();

  return (
    <section className='complexites'>
        <ComplexitesTable complexites={complexites!} />  
        <Link href="/recettes/complexites/add" className='button complexites__btn'>Ajouter une complexité</Link>

    </section>
  )
}