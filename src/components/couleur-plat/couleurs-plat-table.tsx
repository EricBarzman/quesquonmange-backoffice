import Link from "next/link";

import { Couleur_plat } from "@/types/recettes.types";
import './couleur-plat-table.css';

export default function CouleursPlatTable({ cats }: { cats: Couleur_plat[] }) {

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
              <Link href={`/recettes/couleurs-plat/${cat.id}`}>Voir</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}