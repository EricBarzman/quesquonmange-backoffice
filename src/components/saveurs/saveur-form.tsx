'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

import { INTENT } from "@/constants/editIntent";

import { createSaveur, updateSaveur } from "@/hooks/saveurs";
import { Saveur } from "@/types/recettes.types";

interface Inputs {
  label: string;
}

export default function SaveurForm(
  { saveur, intent }: { saveur: Saveur, intent: string }
) {
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

  const router = useRouter();

  const onSubmit: SubmitHandler<Inputs> = async ({ label }) => {

    switch (intent) {
      case (INTENT.create):
        try {
          await createSaveur({ label });
          router.push("/recettes/saveurs")

        } catch (error) {
          console.error(error);
        }

      case (INTENT.update):
        try {
          await updateSaveur({ id: saveur.id!, label });
          router.push("/recettes/saveurs");

        } catch (error) {
          console.error(error);
        }
    }
  }

  return (
    <div className="saveurs__container">
      <h3 className='saveurs__title'>{intent === 'create' ? 'Ajouter' : 'Editer'} une saveur</h3>
      <form className="saveur__form" onSubmit={handleSubmit(onSubmit)}>
        <label className='saveur__form__label'>Label</label>
        <input
          className="saveur__form__field"
          type="text"
          placeholder="Doux, sucré..."
          {...register("label")}
          defaultValue={saveur.label}
        />
        <input type="submit" className="saveur__form__field" />
      </form>
      <Link className="button saveurs__btn" href="/recettes/saveurs">Retour aux saveurs</Link>
    </div>
  )
}