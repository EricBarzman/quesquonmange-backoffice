'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";

import { Saveur } from "@/types/recettes.types"

import './saveurs-table.css'
import { deleteSaveur } from "@/hooks/saveurs";


export default function OneSaveurTable({ saveur }: { saveur: Saveur }) {

  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cet article ?")) return;

    try {
      await deleteSaveur(saveur.id!);
      alert("Saveur supprimée");
      router.push("/recettes/saveurs");
      
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="saveurs__container">
      <table className="saveurs__one-saveur__table">
        <thead>
          <tr>
            <th className="saveurs__table__cell">ID</th>
            <th className="saveurs__table__cell">Label</th>
            <th className="saveurs__table__cell">Created_at</th>
          </tr>
        </thead>
        <tbody>
          <tr key={saveur.id}>
            <td className="saveurs__table__cell">{saveur.id}</td>
            <td className="saveurs__table__cell">{saveur.label}</td>
            {/* Convertit la date en string */}
            <td className="saveurs__table__cell">{(new Date(saveur.created_at)).toDateString()}</td>
          </tr>
        </tbody>
      </table>
      <div className="saveurs__one-saveur__options">
        <Link className="saveurs__table__editbtn" href={`/recettes/saveurs/edit/${saveur.id}`}>
          Editer
        </Link>
        <div className="saveurs__table__deleteBtn" onClick={handleDelete}>Supprimer</div>
        <Link className="button" href="/recettes/saveurs">Retour aux saveurs</Link>
      </div>
    </div>
  )
}