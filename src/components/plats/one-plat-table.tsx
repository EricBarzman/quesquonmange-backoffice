'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";

import { PlatComplet } from "@/types/recettes.types"
import { deletePlat } from "@/hooks/plats";

import './plat.css'

export default function OnePlatTable({ cat }: { cat: PlatComplet }) {

  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cet article ?")) return;

    try {
      alert("Fonction à définir")
      // await deleteIngredient(cat.id!);
      // alert("Plat supprimée");
      // router.push("/recettes/ingredients");

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
            <th className="cats__table__cell">Type de cuisson</th>
            <th className="cats__table__cell">Régimes alimentaires</th>
            <th className="cats__table__cell">Types de repas</th>
            <th className="cats__table__cell">Couleurs du plat</th>
            <th className="cats__table__cell">Type de plat</th>
            <th className="cats__table__cell">Saisons</th>
            <th className="cats__table__cell">Saveurs</th>
            <th className="cats__table__cell">Ustensils</th>
            <th className="cats__table__cell">Ingredients</th>
          </tr>
        </thead>
        <tbody>
          <tr key={cat.id}>
            <td className="cats__table__cell">{cat.id}</td>
            <td className="cats__table__cell">{cat.label}</td>

            {/* Convertit la date en string */}
            <td className="cats__table__cell">{(new Date(cat.created_at)).toDateString()}</td>

            {/* Enumère les cuissons */}
            <td className="cats__table__cell">
              {cat.cuisson !== null ? cat.cuisson.map(el => (<span key={el} className="cats__table__mini-element">{el}</span>)) : <></>}
            </td>

            {/* Régimes */}
            <td className="cats__table__cell">
              {cat.regimes_alimentaire !== null
                ? cat.regimes_alimentaire.map(el => (
                  <span key={el.id} className="cats__table__mini-element">{el.label}</span>
                ))
                : <></>
              }
            </td>

            {/* Types de repas */}
            <td className="cats__table__cell">
              {cat.repas !== null
                ? cat.repas.map(el => (
                  <span key={el.id} className="cats__table__mini-element">{el.label}</span>
                ))
                : <></>
              }
            </td>

            {/* Couleurs */}
            <td className="cats__table__cell">
              {cat.couleurs_plat !== null
                ? cat.couleurs_plat.map(el => (
                  <span key={el.id} className="cats__table__mini-element">{el.label}</span>
                ))
                : <></>
              }
            </td>

            {/* Type de plat (entrée etc) */}
            <td className="cats__table__cell">{cat.type_plat.label}</td>

            {/* Saisons */}
            <td className="cats__table__cell">
            {cat.saison !== null
              ? cat.saison.map(el => (
                <span key={el} className="cats__table__mini-element">{el}</span>
              ))
              : <></>
            }
            </td>

            {/* Saveurs */}
            <td className="cats__table__cell">
            {cat.saveurs !== null
              ? cat.saveurs.map(el => (
                <span key={el.id} className="cats__table__mini-element">{el.label}</span>
              ))
              : <></>
            }
            </td>

            {/* Ustensils */}
            <td className="cats__table__cell">
            {cat.ustensils !== null
              ? cat.ustensils.map(el => (
                <span key={el.id} className="cats__table__mini-element">{el.label}</span>
              ))
              : <></>
            }
            </td>

            {/* Ingredients */}
            <td className="cats__table__cell">
            {cat.ingredients !== null
              ? cat.ingredients.map((el, idx) => (
                <span key={el.ingredient.id}>
                  {el.quantité} {el.unité} {el.ingredient.label} {idx !== cat.ingredients.length - 1 && ','}
                </span>
              ))
              : <></>
            }
            </td>
          </tr>
        </tbody>
      </table>
      <div className="cats__one-cat__options">
        <Link className="cats__table__editbtn" href={`/recettes/ingredients/edit/${cat.id}`}>
          Editer
        </Link>
        <div className="cats__table__deleteBtn" onClick={handleDelete}>Supprimer</div>
        <Link className="button" href="/recettes/plats">Retour aux plats</Link>
      </div>
    </div >
  )
}