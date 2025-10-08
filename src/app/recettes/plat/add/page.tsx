'use client';

import { INTENT } from '@/constants/editIntent';
import TypePlatForm from '@/components/types-plat/type-form-plat';
import { Type_plat } from '@/types/recettes.types';

const type_plat : Type_plat = {
  id: null,
  label: '',
  created_at: ''
}

export default function AddRegime() {
  return (
      <TypePlatForm cat={type_plat} intent={INTENT.create}/>
  )
}