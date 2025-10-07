'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

import { INTENT } from "@/constants/editIntent";

import { createComplexite, updateComplexite } from "@/hooks/complexites";
import { Complexite } from "@/types/recettes.types";

interface Inputs {
  label: string;
}

export default function ComplexiteForm(
  { complexite, intent }: { complexite: Complexite, intent: string }
) {
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

  const router = useRouter();

  const onSubmit: SubmitHandler<Inputs> = async ({ label }) => {

    switch (intent) {
      case (INTENT.create):
        try {
          await createComplexite({ label });
          router.push("/recettes/complexites")

        } catch (error) {
          console.error(error);
        }

      case (INTENT.update):
        try {
          await updateComplexite({ id: complexite.id!, label });
          router.push("/recettes/complexites");

        } catch (error) {
          console.error(error);
        }
    }
  }

  return (
    <div className="complexites__container">
      <h3 className='complexites__title'>{intent === 'create' ? 'Ajouter' : 'Editer'} une complexite</h3>
      <form className="complexite__form" onSubmit={handleSubmit(onSubmit)}>
        <label className='complexite__form__label'>Label</label>
        <input
          className="complexite__form__field"
          type="text"
          placeholder="Facile..."
          {...register("label")}
          defaultValue={complexite.label}
        />
        <input type="submit" className="complexite__form__field" />
      </form>
      <Link className="button complexites__btn" href="/recettes/complexites">Retour aux complexites</Link>
    </div>
  )
}