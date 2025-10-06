import Link from "next/link";

import { Saveur } from "@/types/recettes.types";
import './saveurs-table.css';

export default function SaveursTable({ saveurs }: { saveurs: Saveur[] }) {

  return (
    <table className="saveurs__table">
      <thead>
        <tr>
          <th className="saveurs__table__cell">ID</th>
          <th className="saveurs__table__cell">Label</th>
          <th className="saveurs__table__cell">Lien</th>
        </tr>
      </thead>
      <tbody>
        {saveurs.map(saveur => (
          <tr key={saveur.id}>
            <td className="saveurs__table__cell">{saveur.id}</td>
            <td className="saveurs__table__cell">{saveur.label}</td>
            <td className="saveurs__table__cell saveurs__table__cell--link">
              <Link href={`/recettes/saveurs/${saveur.id}`}>Voir</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}