'use client';

import './addIngredientForm.css'
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { createIngredient } from '@/hooks/ingredients';

interface Inputs {
  label: string;
  description: string;
}

function AddIngredientForm() {

  const router = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async ({ label, description }) => {
    try {
      const data = await createIngredient({ label, description });
      router.push("/recettes/ingredients")

    } catch (error) {
      console.error(error);

    }
  }

  return (
    <div className="addingredient__container">
      <h3 className='addingredient__title'>Ajouter un ingrédient</h3>
      <form className="addingredient__form" onSubmit={handleSubmit(onSubmit)}>
        <label className='addingredient__form__label'>Label</label>
        <input
          className="addingredient__form__field"
          type="text"
          placeholder="Tomate, céleri..."
          {...register("label")}
        />
        <label className='addingredient__form__label'>Description</label>
        <input
          className="addingredient__form__field"
          type="textarea"
          placeholder="Description..."
          {...register("description")}
        />
        <input type="submit" className="addingredient__form__field" />
      </form>
    </div>
  )
}

export default AddIngredientForm