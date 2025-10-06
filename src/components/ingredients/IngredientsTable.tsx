import { Ingredient } from "@/types/recettes.types";
import './ingredientsTable.css';
import Link from "next/link";

function IngredientsTable({ ingredients }: { ingredients: Ingredient[] }) {
  return (
    <table className="ingredients__table__table">
      <thead>
        <tr>
          <th className="ingredients__table__cell">ID</th>
          <th className="ingredients__table__cell">Label</th>
          <th className="ingredients__table__cell">Lien</th>
        </tr>
      </thead>
      <tbody>
        {ingredients.map(ingredient => (
          <tr key={ingredient.id}>
            <td className="ingredients__table__cell">{ingredient.id}</td>
            <td className="ingredients__table__cell">{ingredient.label}</td>
            <td className="ingredients__table__cell ingredients__table__cell--link">
              <Link href={`/recettes/ingredients/${ingredient.id}`}>Voir</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default IngredientsTable