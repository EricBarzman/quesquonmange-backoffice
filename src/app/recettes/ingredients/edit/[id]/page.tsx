import { INTENT } from "@/constants/editIntent"
import IngredientForm from "@/components/ingredients/ingredient-form";
import { getIngredientById } from "@/hooks/ingredients"
import { Ingredient } from "@/types/recettes.types";

export default async function EditIngredient({ params }: { params: { id: string } }) {

  const id = parseInt((await params).id);
  const ingredient: Ingredient = await getIngredientById(id);

  return (
    <IngredientForm cat={ingredient} intent={INTENT.update} />
  )
}