'use client';

import { INTENT } from '@/constants/editIntent';
import UstensilForm from '@/components/ustensils/ustensil-form-plat';
import { Ustensil } from '@/types/recettes.types';

const ustensil : Ustensil = {
  id: null,
  label: '',
  created_at: ''
}

export default function AddRegime() {
  return (
      <UstensilForm cat={ustensil} intent={INTENT.create}/>
  )
}