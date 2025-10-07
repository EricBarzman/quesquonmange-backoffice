'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";

import { Couleur_plat } from "@/types/recettes.types"
import { deleteCouleurPlat } from "@/hooks/couleurs_plat";

import './couleur-plat-table.css'

export default function OneSaveurTable({ cat }: { cat: Couleur_plat }) {

  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cet article ?")) return;

    try {
      await deleteCouleurPlat(cat.id!);
      alert("Couleur supprimée");
      router.push("/recettes/couleurs-plat");
      
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
        <Link className="cats__table__editbtn" href={`/recettes/couleurs-plat/edit/${cat.id}`}>
          Editer
        </Link>
        <div className="cats__table__deleteBtn" onClick={handleDelete}>Supprimer</div>
        <Link className="button" href="/recettes/couleurs-plat">Retour aux couleurs</Link>
      </div>
    </div>
  )
}