'use client';

import { INTENT } from '@/constants/editIntent';
import AmbianceForm from '@/components/ambiance/ambiance-form';
import { Ambiance } from '@/types/recettes.types';

const ambiance : Ambiance = {
  id: null,
  label: '',
  created_at: ''
}

export default function AddAmbiance() {
  return (
      <AmbianceForm cat={ambiance} intent={INTENT.create}/>
  )
}