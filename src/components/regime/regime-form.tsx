'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

import { INTENT } from "@/constants/editIntent";
import './regime.css'

import { createRegimeAlimentaire, updateRegimeAlimentaire } from "@/hooks/regimes_alimentaire";
import { Regime_alimentaire } from "@/types/recettes.types";
import BackBtn from "../backBtn/BackBtn";

interface Inputs {
  label: string;
}

export default function CouleurPlatForm(
  { cat, intent }: { cat : Regime_alimentaire, intent: string }
) {
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

  const router = useRouter();

  const onSubmit: SubmitHandler<Inputs> = async ({ label }) => {

    switch (intent) {
      case (INTENT.create):
        try {
          await createRegimeAlimentaire({ label });
          router.push("/recettes/regimes-alimentaire")

        } catch (error) {
          console.error(error);
        }

      case (INTENT.update):
        try {
          await updateRegimeAlimentaire({ id: cat.id!, label });
          router.push("/recettes/regimes-alimentaire");

        } catch (error) {
          console.error(error);
        }
    }
  }

  return (
    <div className="cats__container">
      <h3 className='cats__title'>{intent === 'create' ? 'Ajouter' : 'Editer'} un régime</h3>
      <form className="cat__form" onSubmit={handleSubmit(onSubmit)}>
        <label className='cat__form__label'>Label</label>
        <input
          className="cat__form__field"
          type="text"
          placeholder="Végétarien, omnivore..."
          {...register("label")}
          defaultValue={cat.label}
        />
        <input type="submit" className="cat__form__field" />
      </form>
      <BackBtn url="regimes-alimentaire" label="régimes" />
    </div>
  )
}