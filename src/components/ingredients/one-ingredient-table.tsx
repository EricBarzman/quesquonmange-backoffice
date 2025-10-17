'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";

import { Ingredient } from "@/types/recettes.types"
import { deleteIngredient } from "@/hooks/ingredients";

import './ingredient.css'

export default function OneIngredientTable({ cat }: { cat: Ingredient }) {

  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cet article ?")) return;

    try {
      await deleteIngredient(cat.id!);
      alert("Couleur supprimée");
      router.push("/recettes/ingredients");
      
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="cats__container">
      <table className="cats__one-cat__table">
        <thead>
          <tr>
            <th className="cats__table__cell">ID</th>
            <th className="cats__table__cell">Label</th>
            <th className="cats__table__cell">Desc.</th>
            <th className="cats__table__cell">Type</th>
            <th className="cats__table__cell">Created_at</th>
          </tr>
        </thead>
        <tbody>
          <tr key={cat.id}>
            <td className="cats__table__cell">{cat.id}</td>
            <td className="cats__table__cell">{cat.label}</td>
            <td className="cats__table__cell">{cat.description}</td>
            <td className="cats__table__cell">{cat.type_ingredient}</td>
            {/* Convertit la date en string */}
            <td className="cats__table__cell">{(new Date(cat.created_at)).toDateString()}</td>
          </tr>
        </tbody>
      </table>
      <div className="cats__one-cat__options">
        <Link className="cats__table__editbtn" href={`/recettes/ingredients/edit/${cat.id}`}>
          Editer
        </Link>
        <div className="cats__table__deleteBtn" onClick={handleDelete}>Supprimer</div>
        <Link className="button" href="/recettes/ingredients">Retour aux ingrédients</Link>
      </div>
    </div>
  )
}