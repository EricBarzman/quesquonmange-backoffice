'use client';

import { INTENT } from '@/constants/editIntent';
import IngredientForm from '@/components/ingredients/ingredient-form';
import { Ingredient } from '@/types/recettes.types';

const ingredient : Ingredient = {
  id: null,
  label: '',
  description: '',
  created_at: ''
}

export default function AddIngredient() {
  return (
      <IngredientForm cat={ingredient} intent={INTENT.create}/>
  )
}