'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";

import { Saveur } from "@/types/recettes.types"


export default function OneSaveurTable({ saveur }: { saveur: Saveur }) {

  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cet article ?")) return;

    try {
      // await deletesaveur(saveur.id);
      alert("Saveur supprimée");
      router.push("/recettes/saveurs");
      
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <table className="onesaveur__table__table">
        <thead>
          <tr>
            <th className="saveurs__table__cell">ID</th>
            <th className="saveurs__table__cell">Label</th>
          </tr>
        </thead>
        <tbody>
          <tr key={saveur.id}>
            <td className="saveurs__table__cell">{saveur.id}</td>
            <td className="saveurs__table__cell">{saveur.label}</td>
          </tr>
        </tbody>
      </table>
      <Link className="saveurs__table__editbtn" href={`/recettes/saveurs/edit/${saveur.id}`}>
        Editer
      </Link>
      <div className="saveurs__table__deleteBtn" onClick={handleDelete}>Supprimer</div>
    </>
  )
}