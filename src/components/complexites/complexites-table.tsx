import Link from "next/link";

import { Complexite } from "@/types/recettes.types";
import './complexites-table.css';

export default function ComplexitesTable({ complexites }: { complexites: Complexite[] }) {

  return (
    <table className="complexites__table">
      <thead>
        <tr>
          <th className="complexites__table__cell">ID</th>
          <th className="complexites__table__cell">Label</th>
          <th className="complexites__table__cell">Lien</th>
        </tr>
      </thead>
      <tbody>
        {complexites.map(complexite => (
          <tr key={complexite.id}>
            <td className="complexites__table__cell">{complexite.id}</td>
            <td className="complexites__table__cell">{complexite.label}</td>
            <td className="complexites__table__cell complexites__table__cell--link">
              <Link href={`/recettes/complexites/${complexite.id}`}>Voir</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}