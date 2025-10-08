import OneIngredientTable from "@/components/ingredients/one-ingredient-table";
import { getIngredientById } from "@/hooks/ingredients";

export default async function IngredientPage({ params }: { params: { id: string } }) {
  const id = (await params).id
  const ingredient = await getIngredientById(parseInt(id));

  return (
    <OneIngredientTable cat={ingredient} />
  )
}