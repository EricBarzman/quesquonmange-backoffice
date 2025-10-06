import './IngredientForm.css'
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { createIngredient, updateIngredient } from '@/hooks/ingredients';
import { Ingredient } from '@/types/recettes.types';
import { INTENT } from '@/app/constants/editIntent';

interface Inputs {
  label: string;
  description: string;
}

export default function IngredientForm(
  {
    ingredient,
    id,
    intent
  }: {
    ingredient: Ingredient;
    id: number;
    intent: string;
  }) {

  const router = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async ({ label, description }) => {

    switch (intent) {
      case (INTENT.create):

        try {
          await createIngredient({ label, description });
          router.push("/recettes/ingredients")

        } catch (error) {
          console.error(error);

        }

      case (INTENT.update):
        try {
          console.log({ label, description })
          // await updateIngredient({ id, label, description });
          // router.push("/recettes/ingredients");

        } catch (error) {
          console.error(error);

        }
    }
  }

  return (
    <div className="addingredient__container">
      <form className="addingredient__form" onSubmit={handleSubmit(onSubmit)}>
        <label className='addingredient__form__label'>Label</label>
        <input
          className="addingredient__form__field"
          type="text"
          placeholder="Tomate, céleri..."
          {...register("label")}
          value={ingredient.label}
        />
        <label className='addingredient__form__label'>Description</label>
        <input
          className="addingredient__form__field"
          type="text"
          placeholder="Description..."
          {...register("description")}
          value={ingredient.description}
        />
        <input type="submit" className="addingredient__form__field" />
      </form>
    </div>
  )
}