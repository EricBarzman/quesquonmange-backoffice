'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";

import './plat.css'

import { Cuisson, CUISSONS } from "@/constants/cuissons";
import { Saison, SAISONS } from "@/constants/saisons";

import { Moment_journee, Type_plat } from "@/types/recettes.types";

import { createPlat } from "@/hooks/plats";
import { getAllTypesPlat } from "@/hooks/types_plat";
import { getMomentsAlimentaire } from "@/hooks/moment_journees";

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

export default function AddPlatForm() {

  const [all_types_plat, set_all_types_plat] = useState<Type_plat[]>([])
  const [all_moments_journee, set_all_moments_journee] = useState<Moment_journee[]>([]);

  const [moments_journee_id, set_moments_journee_id] = useState<number[]>([]);
  const [cuissons, setCuissons] = useState<Cuisson[]>([])
  const [saisons, setSaisons] = useState<Saison[]>([])

  useEffect(() => {
    getAllTypesPlat().then(list => set_all_types_plat(list));
    getMomentsAlimentaire().then(list => set_all_moments_journee(list));
  }, [])

  function handleMomentChange(e: any) {
    // Remove
    if (!e.target.checked) {
      set_moments_journee_id(moments_journee_id.filter(id => id !== e.target.value))
    }
    // Add
    if (e.target.checked)
      set_moments_journee_id([... moments_journee_id, e.target.value])
  }

  function handleCuissonChange(e: any) {
    // Remove
    if (!e.target.checked) {
      setCuissons(cuissons.filter(id => id !== e.target.value))
    }
    // Add
    if (e.target.checked)
      setCuissons([... cuissons, e.target.value])
  }

  function handleSaisonChange(e: any) {
    if (!e.target.checked)
      setSaisons(saisons.filter(id => id !== e.target.value))
    
    if (e.target.checked)
      setSaisons([... saisons, e.target.value])
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

        <label className='cat__form__label'>Label</label>
        <input
          className="cat__form__field"
          type="text"
          placeholder="Tomate, riz..."
          {...register("label")}
        />

        <label className='cat__form__label'>Cuisson</label>
        <div className="cat__form__choices">
          {CUISSONS.map(value => (
            <div key={value}>
              <label>{value}</label>
              <input
                type="checkbox"
                value={value}
                key={value}
                onChange={handleCuissonChange}
              />
            </div>
          ))}
        </div>

        <label className='cat__form__label'>Saison</label>
        <div className="cat__form__choices">
          {SAISONS.map(value => (
            <div key={value}>
              <label>{value}</label>
              <input
                type="checkbox"
                value={value}
                key={value}
                onChange={handleSaisonChange}
              />
            </div>
          ))}
        </div>
        {/* <select {...register("cuisson")} className="cat__form__field">
          <option value={undefined}>Toutes saisons</option>
          {SAISONS.map(value => (
            <option key={value} value={value}>{value[0].toUpperCase() + value.substring(1)}</option>
          ))}
        </select> */}

        <label className='cat__form__label'>Type de plat</label>
        <select {...register("type_plat_id")} className="cat__form__field">
          <option disabled value="">-- Choisir --</option>
          {all_types_plat.map(plat => (
            <option key={plat.id} value={plat.id!}>
              {plat.label[0].toUpperCase() + plat.label.substring(1)}
            </option>
          ))}
        </select>

        <label className='cat__form__label'>Moments de la journée</label>
        <div className="cat__form__choices">
          {all_moments_journee.map(moment => (
            <div key={moment.id}>
              <label>{moment.label}</label>
              <input
                //defaultChecked={movie.moments.includes(moment.id)}
                type="checkbox"
                value={moment.id!}
                key={moment.id}
                onChange={handleMomentChange}
              />
            </div>
          ))}
        </div>

        <input type="submit" className="cat__form__field" />
      </form>
      <Link className="button cats__btn" href="/recettes/plats">Retour aux plats</Link>
    </div>
  )
}