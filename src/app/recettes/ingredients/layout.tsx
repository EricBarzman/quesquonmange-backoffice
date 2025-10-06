// import { createClient } from '@/supabase/client'

import './layout.css'
import { getIngredients } from '@/hooks/ingredients'
import IngredientsTable from '@/components/ingredients/IngredientsTable';
import Link from 'next/link';

export default async function IngredientLayout(
  { children }: { children: React.ReactNode }
) {

  const ingredients = await getIngredients();

  return (
    <section className='ingredients'>
      <div className='ingredients__left'>
        <IngredientsTable ingredients={ingredients!} />
        
        <div className='ingredients__left__addbtn'>
          <Link className='ingredients__button' href="/recettes/ingredients/add">
            + ingrédient
          </Link>
        </div>
      </div>
      <div className='ingredients__right'>{children}</div>
    </section>
  )
}