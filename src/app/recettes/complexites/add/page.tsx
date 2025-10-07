'use client';

import { INTENT } from '@/app/constants/editIntent';
import ComplexiteForm from '@/components/complexites/complexite-form';
import { Complexite } from '@/types/recettes.types';

const complexite : Complexite = {
  id: null,
  label: '',
  created_at: ''
}

export default function AddComplexite() {
  return (
      <ComplexiteForm complexite={complexite} intent={INTENT.create}/>
  )
}