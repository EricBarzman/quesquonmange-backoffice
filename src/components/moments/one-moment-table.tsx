'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";

import { Moment_journee } from "@/types/recettes.types"
import { deleteMomentAlimentaire } from "@/hooks/moment_journees";

import './moment.css'

export default function OneMomentTable({ cat }: { cat: Moment_journee }) {

  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cet article ?")) return;

    try {
      await deleteMomentAlimentaire(cat.id!);
      alert("Moment supprimé");
      router.push("/recettes/moments-journee");
      
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
            <th className="cats__table__cell">Created_at</th>
          </tr>
        </thead>
        <tbody>
          <tr key={cat.id}>
            <td className="cats__table__cell">{cat.id}</td>
            <td className="cats__table__cell">{cat.label}</td>
            {/* Convertit la date en string */}
            <td className="cats__table__cell">{(new Date(cat.created_at)).toDateString()}</td>
          </tr>
        </tbody>
      </table>
      <div className="cats__one-cat__options">
        <Link className="cats__table__editbtn" href={`/recettes/moments-journee/edit/${cat.id}`}>
          Editer
        </Link>
        <div className="cats__table__deleteBtn" onClick={handleDelete}>Supprimer</div>
        <Link className="button" href="/recettes/moments-journee">Retour aux moments de la journée</Link>
      </div>
    </div>
  )
}