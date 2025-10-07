'use client';

import { INTENT } from '@/app/constants/editIntent';
import CouleurPlatForm from '@/components/couleur-plat/couleur-plat-form';
import { Couleur_plat } from '@/types/recettes.types';

const couleur_plat : Couleur_plat = {
  id: null,
  label: '',
  created_at: ''
}

export default function AddComplexite() {
  return (
      <CouleurPlatForm cat={couleur_plat} intent={INTENT.create}/>
  )
}