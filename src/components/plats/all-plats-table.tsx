import Link from "next/link";

import { PlatToSend } from "@/types/recettes.types";
import './plat.css';

export default function AllPlatsTable({ cats }: { cats: PlatToSend[] }) {

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
              <Link href={`/recettes/plats/${cat.id}`}>Voir</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}