import Link from 'next/link';
import IngredientsTable from '@/components/ingredients/ingredients-table';
import { getIngredients } from '@/hooks/ingredients';

export default async function IngredientsPage() {

  const ingredients = await getIngredients();

  return (
    <section className='categories'>
        <IngredientsTable cats={ingredients} />  
        <Link href="/recettes/ingredients/add" className='button categories__btn'>Ajouter un ingrédient</Link>
    </section>
  )
}