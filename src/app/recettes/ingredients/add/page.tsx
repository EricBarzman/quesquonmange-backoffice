'use client';

import { INTENT } from '@/app/constants/editIntent';
import IngredientForm from '@/components/ingredients/IngredientForm'
import { Ingredient } from '@/types/recettes.types';
import Link from 'next/link'

const ingredient : Ingredient = {
  id: 0,
  label: '',
  description: ''
}

function AddIngredient() {
  return (
    <div>
      <h3 className='addingredient__title'>Ajouter un ingrédient</h3>
      <IngredientForm ingredient={ingredient} id={0} intent={INTENT.create} />
      <Link className="ingredients__button" href="/recettes/ingredients">Retour au tableau</Link>
    </div>
  )
}

export default AddIngredient