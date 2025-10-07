'use client';

import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

import { INTENT } from "@/constants/editIntent";
import './moment.css'

import { createMomentAlimentaire, updateMomentAlimentaire } from "@/hooks/moment_journees";
import { Moment_journee } from "@/types/recettes.types";
import BackBtn from "../backBtn/BackBtn";

interface Inputs {
  label: string;
}

export default function MomentForm(
  { cat, intent }: { cat : Moment_journee, intent: string }
) {
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

  const router = useRouter();

  const onSubmit: SubmitHandler<Inputs> = async ({ label }) => {

    switch (intent) {
      case (INTENT.create):
        try {
          await createMomentAlimentaire({ label });
          router.push("/recettes/moments-journee")

        } catch (error) {
          console.error(error);
        }

      case (INTENT.update):
        try {
          await updateMomentAlimentaire({ id: cat.id!, label });
          router.push("/recettes/moments-journee");

        } catch (error) {
          console.error(error);
        }
    }
  }

  return (
    <div className="cats__container">
      <h3 className='cats__title'>{intent === 'create' ? 'Ajouter' : 'Editer'} un moment de la journée</h3>
      <form className="cat__form" onSubmit={handleSubmit(onSubmit)}>
        <label className='cat__form__label'>Label</label>
        <input
          className="cat__form__field"
          type="text"
          placeholder="Petit-déjeuner..."
          {...register("label")}
          defaultValue={cat.label}
        />
        <input type="submit" className="cat__form__field" />
      </form>
      <BackBtn url="moments-journee" label="moments de la journée" />
    </div>
  )
}