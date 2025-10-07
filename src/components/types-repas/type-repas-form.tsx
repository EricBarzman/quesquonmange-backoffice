'use client';

import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

import { INTENT } from "@/constants/editIntent";
import './type-repas.css'

import { createTypeRepas, updateTypeRepas } from "@/hooks/types_repas";
import { Type_repas } from "@/types/recettes.types";
import BackBtn from "../backBtn/BackBtn";

interface Inputs {
  label: string;
}

export default function MomentForm(
  { cat, intent }: { cat : Type_repas, intent: string }
) {
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

  const router = useRouter();

  const onSubmit: SubmitHandler<Inputs> = async ({ label }) => {

    switch (intent) {
      case (INTENT.create):
        try {
          await createTypeRepas({ label });
          router.push("/recettes/types-de-repas")

        } catch (error) {
          console.error(error);
        }

      case (INTENT.update):
        try {
          await updateTypeRepas({ id: cat.id!, label });
          router.push("/recettes/types-de-repas");

        } catch (error) {
          console.error(error);
        }
    }
  }

  return (
    <div className="cats__container">
      <h3 className='cats__title'>{intent === 'create' ? 'Ajouter' : 'Editer'} un type de repas</h3>
      <form className="cat__form" onSubmit={handleSubmit(onSubmit)}>
        <label className='cat__form__label'>Label</label>
        <input
          className="cat__form__field"
          type="text"
          placeholder="Entrée, dessert..."
          {...register("label")}
          defaultValue={cat.label}
        />
        <input type="submit" className="cat__form__field" />
      </form>
      <BackBtn url="types-de-repas" label="types de repas" />
    </div>
  )
}