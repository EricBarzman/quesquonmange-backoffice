'use client';

import { INTENT } from '@/constants/editIntent';
import SaveurForm from '@/components/saveurs/saveur-form';
import { Saveur } from '@/types/recettes.types';

const saveur : Saveur = {
  id: null,
  label: '',
  created_at: ''
}

export default function AddSaveur() {
  return (
      <SaveurForm saveur={saveur} intent={INTENT.create}/>
  )
}