'use client';

import { INTENT } from '@/constants/editIntent';
import MomentForm from '@/components/moments/moment-form';
import { Moment_journee } from '@/types/recettes.types';

const moment : Moment_journee = {
  id: null,
  label: '',
  created_at: ''
}

export default function AddRegime() {
  return (
      <MomentForm cat={moment} intent={INTENT.create}/>
  )
}