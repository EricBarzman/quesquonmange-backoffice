'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";

import './plat.css'

import { Cuisson, CUISSONS } from "@/constants/cuissons";
import { Saison, SAISONS } from "@/constants/saisons";

import { Moment_journee, Type_plat } from "@/types/recettes.types";
import { createPlat } from "@/hooks/plats";


interface Inputs {
  label: string;
  saisons: Saison[];
  cuissons: Cuisson[];
  type_plat_id: number;
  ingredients_id: number[];
  moments_journee_id: number[];
  couleurs_plat_id: number[];
  regimes_alimentaire_id: number[];
  saveurs_id: number[];
  ustensils_id: number[];
}


export default function AddPlatForm({
  all_types_plat,
  all_moments_journee
}: {
  all_types_plat: Type_plat[],
  all_moments_journee: Moment_journee[]
}) {

  const [moments_journee_id, set_moments_journee_id] = useState<number[]>([]);
  const [cuissons, setCuissons] = useState<Cuisson[]>([])
  const [saisons, setSaisons] = useState<Saison[]>([])
  const [moments_journee, set_moments_journee] = useState<Moment_journee[]>([])

  function handleMomentChange(e: any) {
    // Remove
    if (!e.target.checked) {
      set_moments_journee_id(moments_journee_id.filter(id => id !== e.target.value))
    }
    // Add
    if (e.target.checked)
      set_moments_journee_id([...moments_journee_id, e.target.value])
  }

  function handleSaisonChange(e: any) {
    if (!e.target.checked)
      setSaisons(saisons.filter(id => id !== e.target.value))

    if (e.target.checked)
      setSaisons([...saisons, e.target.value])
  }

  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

  const router = useRouter();

  const onSubmit: SubmitHandler<Inputs> = async ({
    label,
    type_plat_id,
  }) => {

    try {
      console.log({
        label,
        cuissons,
        saisons,
        type_plat_id,
      })
      await createPlat({
        label,
        cuissons,
        saisons,
        type_plat_id,
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
            {all_types_plat.map(plat => (
              <option key={plat.id} value={plat.id!}>
                {plat.label[0].toUpperCase() + plat.label.substring(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Moments de la journée */}
        <div className="cat__form__container">
          <label className='cat__form__label'>Quel repas ?</label>
          <select
            defaultValue={""}
            onChange={(e: any) => setSaisons([...saisons, e.target.value])}
            className="cat__form__field"
          >
            <option disabled value="">-- Choisir un repas --</option>
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

        <input type="submit" className="cat__form__field" />
      </form>
      <Link className="button cats__btn" href="/recettes/plats">Retour aux plats</Link>
    </div>
  )
}