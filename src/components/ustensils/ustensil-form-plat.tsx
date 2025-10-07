'use client';

import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

import { INTENT } from "@/constants/editIntent";
import './ustensil.css'

import { createUstensil, updateUstensil } from "@/hooks/ustensils";
import { Ustensil } from "@/types/recettes.types";
import BackBtn from "../backBtn/BackBtn";

interface Inputs {
  label: string;
}

export default function MomentForm(
  { cat, intent }: { cat : Ustensil, intent: string }
) {
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

  const router = useRouter();

  const onSubmit: SubmitHandler<Inputs> = async ({ label }) => {

    switch (intent) {
      case (INTENT.create):
        try {
          await createUstensil({ label });
          router.push("/recettes/ustensils")

        } catch (error) {
          console.error(error);
        }

      case (INTENT.update):
        try {
          await updateUstensil({ id: cat.id!, label });
          router.push("/recettes/ustensils");

        } catch (error) {
          console.error(error);
        }
    }
  }

  return (
    <div className="cats__container">
      <h3 className='cats__title'>{intent === 'create' ? 'Ajouter' : 'Editer'} un ustensil</h3>
      <form className="cat__form" onSubmit={handleSubmit(onSubmit)}>
        <label className='cat__form__label'>Label</label>
        <input
          className="cat__form__field"
          type="text"
          placeholder="Poêle, four..."
          {...register("label")}
          defaultValue={cat.label}
        />
        <input type="submit" className="cat__form__field" />
      </form>
      <BackBtn url="ustensils" label="ustensils" />
    </div>
  )
}