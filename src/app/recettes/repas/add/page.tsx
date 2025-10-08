'use client';

import { INTENT } from '@/constants/editIntent';
import RepasForm from '@/components/repas/repas-form';
import { Repas } from '@/types/recettes.types';

const repas : Repas = {
  id: null,
  label: '',
  created_at: ''
}

export default function AddRepas() {
  return (
      <RepasForm cat={repas} intent={INTENT.create}/>
  )
}