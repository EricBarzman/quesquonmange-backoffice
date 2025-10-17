import Link from 'next/link';
import IngredientsTable from '@/components/ingredients/ingredients-table';
import { getIngredients } from '@/hooks/ingredients';

import './page.css'

export default async function IngredientsPage() {

  const ingredients = await getIngredients();
  // Sort alphabetically
  ingredients.sort((a, b) => a.label.toLowerCase().localeCompare(b.label.toLowerCase()))

  return (
    <section className='categories'>
      <IngredientsTable cats={ingredients} />
      <Link href="/recettes/ingredients/add" className='button categories__btn'>Ajouter un ingrédient</Link>
    </section>
  )
}