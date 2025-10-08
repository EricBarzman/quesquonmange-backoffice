import Link from "next/link";

import { Ingredient } from "@/types/recettes.types";
import './ingredient.css';

export default function IngredientsTable({ cats }: { cats: Ingredient[] }) {

  return (
    <table className="cats__table">
      <thead>
        <tr>
          <th className="cats__table__cell">ID</th>
          <th className="cats__table__cell">Label</th>
          <th className="cats__table__cell">Lien</th>
        </tr>
      </thead>
      <tbody>
        {cats.map(cat => (
          <tr key={cat.id}>
            <td className="cats__table__cell">{cat.id}</td>
            <td className="cats__table__cell">{cat.label}</td>
            <td className="cats__table__cell cats__table__cell--link">
              <Link href={`/recettes/ingredients/${cat.id}`}>Voir</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}