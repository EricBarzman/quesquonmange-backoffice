import OneIngredientTable from "@/components/ingredients/OneIngredientTable";
import { getIngredientById } from "@/hooks/ingredients";
import Link from "next/link";

async function IngredientPage(props: { params: { id: string } }) {
  const { params : { id } } = props;
  const ingredient = await getIngredientById(parseInt(id));

  return (
    <div className="ingredients__right__container">
      <OneIngredientTable ingredient={ingredient} />
      <Link className="ingredients__button" href="/recettes/ingredients">Retour au tableau</Link>
    </div>
  )
}

export default IngredientPage