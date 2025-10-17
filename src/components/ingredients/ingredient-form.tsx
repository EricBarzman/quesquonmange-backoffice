'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

import { INTENT } from "@/constants/editIntent";
import './ingredient.css'

import { createIngredient, updateIngredient } from "@/hooks/ingredients";
import { Ingredient } from "@/types/recettes.types";
import { TYPE_INGREDIENT, Type_ingredient } from "@/constants/types_ingredient";

interface Inputs {
  label: string;
  description: string;
  type_ingredient: Type_ingredient;
}

export default function CouleurPlatForm(
  { cat, intent }: { cat : Ingredient, intent: string }
) {
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

  const router = useRouter();

  const onSubmit: SubmitHandler<Inputs> = async ({ label, description, type_ingredient }) => {

    switch (intent) {
      case (INTENT.create):
        try {
          await createIngredient({ label, description, type_ingredient });
          router.push("/recettes/ingredients")

        } catch (error) {
          console.error(error);
        }

      case (INTENT.update):
        try {
          await updateIngredient({ id: cat.id!, label, description, type_ingredient });
          router.push("/recettes/ingredients");

        } catch (error) {
          console.error(error);
        }
    }
  }

  return (
    <div className="cats__container">
      <h3 className='cats__title'>{intent === 'create' ? 'Ajouter' : 'Editer'} un ingrédient</h3>
      <form className="cat__form" onSubmit={handleSubmit(onSubmit)}>
        <label className='cat__form__label'>Label</label>
        
        <input
          className="cat__form__field"
          type="text"
          placeholder="Tomate, riz..."
          {...register("label")}
          defaultValue={cat.label}
        />
        <label className='cat__form__label'>Description</label>
        
        <input
          className="cat__form__field"
          type="textarea"
          placeholder="Description..."
          {...register("description")}
          defaultValue={cat.description}
        />
        
        {/* Types d'ingrédients */}
        <div className="cat__form__container">
          <label className='cat__form__label'>Type d'ingrédient</label>
          <select {...register("type_ingredient")} className="cat__form__field">
            <option disabled value="">-- Choisir un type --</option>
            {TYPE_INGREDIENT.map(type_ingredient => (
              <option key={type_ingredient} value={type_ingredient}>
                {type_ingredient[0].toUpperCase() + type_ingredient.substring(1)}
              </option>
            ))}
          </select>
        </div>

        <input type="submit" className="cat__form__field" />
      </form>
      <Link className="button cats__btn" href="/recettes/ingredients">Retour aux ingrédients</Link>
    </div>
  )
}