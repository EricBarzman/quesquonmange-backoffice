'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

import { INTENT } from "@/app/constants/editIntent";
import './couleur-plat-table.css'

import { createCouleurPlat, updateCouleurPlat } from "@/hooks/couleurs_plat";
import { Couleur_plat } from "@/types/recettes.types";

interface Inputs {
  label: string;
}

export default function CouleurPlatForm(
  { cat, intent }: { cat : Couleur_plat, intent: string }
) {
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

  const router = useRouter();

  const onSubmit: SubmitHandler<Inputs> = async ({ label }) => {

    switch (intent) {
      case (INTENT.create):
        try {
          await createCouleurPlat({ label });
          router.push("/recettes/couleurs-plat")

        } catch (error) {
          console.error(error);
        }

      case (INTENT.update):
        try {
          await updateCouleurPlat({ id: cat.id!, label });
          router.push("/recettes/couleurs-plat");

        } catch (error) {
          console.error(error);
        }
    }
  }

  return (
    <div className="cats__container">
      <h3 className='cats__title'>{intent === 'create' ? 'Ajouter' : 'Editer'} une couleur</h3>
      <form className="cat__form" onSubmit={handleSubmit(onSubmit)}>
        <label className='cat__form__label'>Label</label>
        <input
          className="cat__form__field"
          type="text"
          placeholder="Jaune, ocre..."
          {...register("label")}
          defaultValue={cat.label}
        />
        <input type="submit" className="cat__form__field" />
      </form>
      <Link className="button cats__btn" href="/recettes/cats-plat">Retour aux couleurs</Link>
    </div>
  )
}