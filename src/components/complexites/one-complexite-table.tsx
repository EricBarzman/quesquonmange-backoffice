'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";

import { Complexite } from "@/types/recettes.types"

import './complexites-table.css'
import { deleteComplexite } from "@/hooks/complexites";


export default function OneComplexiteTable({ complexite }: { complexite: Complexite }) {

  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cet article ?")) return;

    try {
      await deleteComplexite(complexite.id!);
      alert("Complexite supprimée");
      router.push("/recettes/complexites");
      
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="complexites__container">
      <table className="complexites__one-complexite__table">
        <thead>
          <tr>
            <th className="complexites__table__cell">ID</th>
            <th className="complexites__table__cell">Label</th>
            <th className="complexites__table__cell">Created_at</th>
          </tr>
        </thead>
        <tbody>
          <tr key={complexite.id}>
            <td className="complexites__table__cell">{complexite.id}</td>
            <td className="complexites__table__cell">{complexite.label}</td>
            {/* Convertit la date en string */}
            <td className="complexites__table__cell">{(new Date(complexite.created_at)).toDateString()}</td>
          </tr>
        </tbody>
      </table>
      <div className="complexites__one-complexite__options">
        <Link className="complexites__table__editbtn" href={`/recettes/complexites/edit/${complexite.id}`}>
          Editer
        </Link>
        <div className="complexites__table__deleteBtn" onClick={handleDelete}>Supprimer</div>
        <Link className="button" href="/recettes/complexites">Retour aux complexites</Link>
      </div>
    </div>
  )
}