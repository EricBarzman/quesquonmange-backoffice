'use client';

import Link from 'next/link'
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { INTENT } from '@/constants/editIntent';
import { getIngredientById } from '@/hooks/ingredients';

import IngredientForm from '@/components/ingredients/IngredientForm';
import { Ingredient } from '@/types/recettes.types';

function EditIngredient() {
  const params = useParams();
  const id = parseInt(params.id);
  
  const [ingredient, setIngredient] = useState<Ingredient>({
    id: 0,
    label: '',
    description: '',
  });

  useEffect(() => {
    getIngredientById(id)
      .then(ingredient => setIngredient(ingredient));
  }, [])

  return (
    <div>
      <h3 className='addingredient__title'>Editer un ingrédient</h3>
      <IngredientForm ingredient={ingredient} id={id} intent={INTENT.update} />
      <Link className="ingredients__button" href="/recettes/ingredients">Retour au tableau</Link>
    </div>
  )
}

export default EditIngredient