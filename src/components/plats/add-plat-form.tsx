'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";

import './plat.css'

import { Cuisson, CUISSONS } from "@/constants/cuissons";
import { Saison, SAISONS } from "@/constants/saisons";

import { Couleur_plat, Repas, Type_plat } from "@/types/recettes.types";
import { createPlat } from "@/hooks/plats";


interface Inputs {
  label: string;
  saisons: Saison[];
  cuissons: Cuisson[];
  ingredients_id: number[];
  type_plat_id: number;
  repas_id: number[];
  regimes_alimentaire_id: number[];
  saveurs_id: number[];
  ustensils_id: number[];
}


export default function AddPlatForm({
  types_plat,
  repas,
  couleurs
}: {
  types_plat: Type_plat[],
  repas: Repas[],
  couleurs: Couleur_plat[],
}) {

  const [chosenRepas, setChosenRepas] = useState<Repas[]>([]);
  const [chosenCouleurs, setChosenCouleurs] = useState<Couleur_plat[]>([]);
  const [cuissons, setCuissons] = useState<Cuisson[]>([])
  const [saisons, setSaisons] = useState<Saison[]>([])
  
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

  function handleRepasChange(e: any) {
    const targetRepas = repas.find(rep => rep.id === parseInt(e.target.value));
    if (targetRepas) setChosenRepas([...chosenRepas, targetRepas])
  }

  function handleCouleurChange(e: any) {
    const targetCouleur = couleurs.find(it => it.id === parseInt(e.target.value));
    if (targetCouleur) setChosenCouleurs([...chosenCouleurs, targetCouleur])
  }

  const router = useRouter();

  const onSubmit: SubmitHandler<Inputs> = async ({
    label,
    type_plat_id,
  }) => {

    try {
      await createPlat({
        label,
        cuissons,
        saisons,
        type_plat_id,
        list_repas_id : chosenRepas.map(repas => repas.id!),
        couleurs_id : chosenCouleurs.map(couleur => couleur.id!),
      });
      // router.push("/recettes/plats")

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="cats__container">
      <h3 className='cats__title'>Créer un plat</h3>
      <form className="cat__form" onSubmit={handleSubmit(onSubmit)}>

        {/* Label */}
        <div className="cat__form__container">
          <label className='cat__form__label'>Label</label>
          <input
            className="cat__form__field"
            type="text"
            placeholder="Tomate, riz..."
            {...register("label")}
          />
        </div>

        {/* Cuisson */}
        <div className="cat__form__container">
          <label className='cat__form__label'>Cuisson</label>
          <select
            defaultValue={""}
            onChange={(e: any) => setCuissons([...cuissons, e.target.value])}
            className="cat__form__field"
          >
            <option disabled value="">-- Choisir un type de cuisson --</option>
            {CUISSONS.map(cuisson => (
              <option disabled={cuissons.includes(cuisson)} value={cuisson}>
                {cuisson[0].toUpperCase() + cuisson.substring(1)}
              </option>
            ))}
          </select>

          <ul className="cat__form__multiple-choices">
            {cuissons.map(cuisson => (
              <button
                value={cuisson}
                onClick={(e: any) => setCuissons(cuissons.filter(cuisson => cuisson !== e.target.value))}
                key={cuisson}
                className="cat__form__multiple-choices__option"
              >
                {cuisson[0].toUpperCase() + cuisson.substring(1)}
              </button>
            ))}
          </ul>
        </div>

        {/* Saisons */}
        <div className="cat__form__container">
          <label className='cat__form__label'>Saisons</label>
          <select
            defaultValue={""}
            onChange={(e: any) => setSaisons([...saisons, e.target.value])}
            className="cat__form__field"
          >
            <option disabled value="">-- Choisir une saison --</option>
            {SAISONS.map(saison => (
              <option disabled={saisons.includes(saison)} value={saison}>
                {saison[0].toUpperCase() + saison.substring(1)}
              </option>
            ))}
          </select>
          
          <ul className="cat__form__multiple-choices">
            {saisons.map(saison => (
              <button
                value={saison}
                onClick={(e: any) => setSaisons(saisons.filter(label => label !== e.target.value))}
                key={saison}
                className="cat__form__multiple-choices__option"
              >
                {saison[0].toUpperCase() + saison.substring(1)}
              </button>
            ))}
          </ul>
        </div>

        {/* Type de plat */}
        <div className="cat__form__container">
          <label className='cat__form__label'>Type de plat</label>
          <select {...register("type_plat_id")} className="cat__form__field">
            <option disabled value="">-- Choisir --</option>
            {types_plat.map(plat => (
              <option key={plat.id} value={plat.id!}>
                {plat.label[0].toUpperCase() + plat.label.substring(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Repas */}
        <div className="cat__form__container">
          <label className='cat__form__label'>Quel repas ?</label>
          <select
            defaultValue={""}
            onChange={handleRepasChange}
            className="cat__form__field"
          >
            <option disabled value="">-- Choisir un repas --</option>
            {repas.map(oneRepas => (
              <option key={oneRepas.id} disabled={chosenRepas.includes(oneRepas)} value={oneRepas.id!}>
                {oneRepas.label[0].toUpperCase() + oneRepas.label.substring(1)}
              </option>
            ))}
          </select>
          
          <ul className="cat__form__multiple-choices">
            {chosenRepas.map(repas => (
              <button
                value={repas.id!}
                onClick={(e: any) => setChosenRepas(chosenRepas.filter(rep => rep.id !== parseInt(e.target.value)))}
                key={repas.label}
                className="cat__form__multiple-choices__option"
              >
                {repas.label[0].toUpperCase() + repas.label.substring(1)}
              </button>
            ))}
          </ul>
        </div>

        {/* Couleurs */}
        <div className="cat__form__container">
          <label className='cat__form__label'>Couleurs</label>
          <select
            defaultValue={""}
            onChange={handleCouleurChange}
            className="cat__form__field"
          >
            <option disabled value="">-- Choisir une couleur --</option>
            {couleurs.map(couleur => (
              <option key={couleur.id} disabled={chosenCouleurs.includes(couleur)} value={couleur.id!}>
                {couleur.label[0].toUpperCase() + couleur.label.substring(1)}
              </option>
            ))}
          </select>
          
          <ul className="cat__form__multiple-choices">
            {chosenCouleurs.map(couleur => (
              <button
                value={couleur.id!}
                onClick={(e: any) => setChosenCouleurs(chosenCouleurs.filter(it => it.id !== parseInt(e.target.value)))}
                key={couleur.label}
                className="cat__form__multiple-choices__option"
              >
                {couleur.label[0].toUpperCase() + couleur.label.substring(1)}
              </button>
            ))}
          </ul>
        </div>

        <input type="submit" className="cat__form__field" />
      </form>
      <Link className="button cats__btn" href="/recettes/plats">Retour aux plats</Link>
    </div>
  )
}