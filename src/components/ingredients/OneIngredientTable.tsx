'use client';

import { Ingredient } from "@/types/recettes.types"
import Link from "next/link";

function OneIngredientTable({ ingredient }: { ingredient: Ingredient }) {

  const handleDelete = () => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cet article ?")) {
      return;
    }

    alert("done");
  };

  return (
    <>
      <table className="oneingredient__table__table">
        <thead>
          <tr>
            <th className="ingredients__table__cell">ID</th>
            <th className="ingredients__table__cell">Label</th>
            <th className="ingredients__table__cell">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr key={ingredient.id}>
            <td className="ingredients__table__cell">{ingredient.id}</td>
            <td className="ingredients__table__cell">{ingredient.label}</td>
            <td className="ingredients__table__cell">{ingredient.description}</td>
          </tr>
        </tbody>
      </table>
      <Link className="ingredients__table__editbtn" href={`/recettes/ingredients/edit/${ingredient.id}`}>
        Editer
      </Link>
      <div className="ingredients__table__deleteBtn" onClick={handleDelete}>Supprimer</div>
    </>
  )
}

export default OneIngredientTable