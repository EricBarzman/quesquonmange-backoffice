'use client';

import { INTENT } from '@/constants/editIntent';
import TypeRepasForm from '@/components/types-repas/type-repas-form';
import { Type_repas } from '@/types/recettes.types';

const type_repas : Type_repas = {
  id: null,
  label: '',
  created_at: ''
}

export default function AddRegime() {
  return (
      <TypeRepasForm cat={type_repas} intent={INTENT.create}/>
  )
}