'use client';

import { INTENT } from '@/app/constants/editIntent';
import RegimeForm from '@/components/regime/regime-form';
import { Regime_alimentaire } from '@/types/recettes.types';

const saveur : Regime_alimentaire = {
  id: null,
  label: '',
  created_at: ''
}

export default function AddRegime() {
  return (
      <RegimeForm cat={saveur} intent={INTENT.create}/>
  )
}