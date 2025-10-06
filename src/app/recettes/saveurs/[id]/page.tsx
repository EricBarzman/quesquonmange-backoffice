import Link from "next/link";
import OneIngredientTable from "@/components/ingredients/OneIngredientTable";
import { getIngredientById } from "@/hooks/ingredients";

async function IngredientPage(props: { params: { id: string } }) {
  const { params } = props;
  const ingredient = await getIngredientById(parseInt(await params.id));

  return (
    <div className="ingredients__right__container">
      <OneIngredientTable ingredient={ingredient} />
      <Link className="ingredients__button" href="/recettes/ingredients">Retour au tableau</Link>
    </div>
  )
}

export default IngredientPage