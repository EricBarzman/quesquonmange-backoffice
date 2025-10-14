'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";

import './plat.css'

import { Cuisson, CUISSONS } from "@/constants/cuissons";
import { Saison, SAISONS } from "@/constants/saisons";

import { Couleur_plat, Ingredient, IngredientWithQuantityAndUnity, Regime_alimentaire, Repas, Saveur, Type_plat, Ustensil } from "@/types/recettes.types";
import { createPlat } from "@/hooks/plats";
import IngredientModal from "./ingredients-modal";


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
  couleurs,
  regimes,
  saveurs,
  ingredients,
  ustensils,
}: {
  types_plat: Type_plat[],
  repas: Repas[],
  couleurs: Couleur_plat[],
  regimes: Regime_alimentaire[],
  saveurs: Saveur[],
  ingredients: Ingredient[],
  ustensils: Ustensil[],
}) {

  const [chosenRepas, setChosenRepas] = useState<Repas[]>([]);
  const [chosenCouleurs, setChosenCouleurs] = useState<Couleur_plat[]>([]);
  const [chosenRegimes, setChosenRegimes] = useState<Regime_alimentaire[]>([]);
  const [chosenSaveurs, setChosenSaveurs] = useState<Saveur[]>([]);
  const [chosenUstensils, setChosenUstensils] = useState<Ustensil[]>([]);

  const [chosenIngredientsWithDetails, setChosenIngredientsWithDetails] = useState<IngredientWithQuantityAndUnity[]>([]);
  const [showModalIngredient, setShowModalIngredient] = useState(false);

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

  function handleRegimeChange(e: any) {
    const targetRegime = regimes.find(el => el.id === parseInt(e.target.value));
    if (targetRegime) setChosenRegimes([...chosenRegimes, targetRegime])
  }

  function handleUstensilChange(e: any) {
    const target = ustensils.find(el => el.id === parseInt(e.target.value));
    if (target) setChosenUstensils([...chosenUstensils, target])
  }

  function handleSaveurChange(e: any) {
    const target = saveurs.find(el => el.id === parseInt(e.target.value));
    if (target) setChosenSaveurs([...chosenSaveurs, target])
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
        list_repas_id: chosenRepas.map(repas => repas.id!),
        couleurs_id: chosenCouleurs.map(couleur => couleur.id!),
        regimes_alimentaire: chosenRegimes.map(regime => regime.id!),
        saveurs: chosenSaveurs.map(el => el.id!),
        ustensils: chosenUstensils.map(el => el.id!),
        ingredients: chosenIngredientsWithDetails,
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
              <option key={cuisson} disabled={cuissons.includes(cuisson)} value={cuisson}>
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
              <option key={saison} disabled={saisons.includes(saison)} value={saison}>
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
            <option disabled value="">-- Choisir des repas --</option>
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
            <option disabled value="">-- Choisir des couleurs --</option>
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

        {/* Régimes */}
        <div className="cat__form__container">
          <label className='cat__form__label'>Régimes</label>
          <select
            defaultValue={""}
            onChange={handleRegimeChange}
            className="cat__form__field"
          >
            <option disabled value="">-- Choisir des régimes --</option>
            {regimes.map(regime => (
              <option key={regime.id} disabled={chosenRegimes.includes(regime)} value={regime.id!}>
                {regime.label[0].toUpperCase() + regime.label.substring(1)}
              </option>
            ))}
          </select>

          <ul className="cat__form__multiple-choices">
            {chosenRegimes.map(regime => (
              <button
                value={regime.id!}
                onClick={(e: any) => setChosenRegimes(chosenRegimes.filter(el => el.id !== parseInt(e.target.value)))}
                key={regime.label}
                className="cat__form__multiple-choices__option"
              >
                {regime.label[0].toUpperCase() + regime.label.substring(1)}
              </button>
            ))}
          </ul>
        </div>

        {/* Saveurs */}
        <div className="cat__form__container">
          <label className='cat__form__label'>Saveurs</label>
          <select
            defaultValue={""}
            onChange={handleSaveurChange}
            className="cat__form__field"
          >
            <option disabled value="">-- Choisir des saveurs --</option>
            {saveurs.map(saveur => (
              <option key={saveur.id} disabled={chosenSaveurs.includes(saveur)} value={saveur.id!}>
                {saveur.label[0].toUpperCase() + saveur.label.substring(1)}
              </option>
            ))}
          </select>

          <ul className="cat__form__multiple-choices">
            {chosenSaveurs.map(saveur => (
              <button
                value={saveur.id!}
                onClick={(e: any) => setChosenSaveurs(chosenSaveurs.filter(el => el.id !== parseInt(e.target.value)))}
                key={saveur.label}
                className="cat__form__multiple-choices__option"
              >
                {saveur.label[0].toUpperCase() + saveur.label.substring(1)}
              </button>
            ))}
          </ul>
        </div>

        {/* Ustensils */}
        <div className="cat__form__container">
          <label className='cat__form__label'>Ustensils</label>
          <select
            defaultValue={""}
            onChange={handleUstensilChange}
            className="cat__form__field"
          >
            <option disabled value="">-- Choisir des ustensils --</option>
            {ustensils.map(us => (
              <option key={us.id} disabled={chosenUstensils.includes(us)} value={us.id!}>
                {us.label[0].toUpperCase() + us.label.substring(1)}
              </option>
            ))}
          </select>

          <ul className="cat__form__multiple-choices">
            {chosenUstensils.map(ustensil => (
              <button
                value={ustensil.id!}
                onClick={(e: any) => setChosenUstensils(chosenUstensils.filter(el => el.id !== parseInt(e.target.value)))}
                key={ustensil.label}
                className="cat__form__multiple-choices__option"
              >
                {ustensil.label[0].toUpperCase() + ustensil.label.substring(1)}
              </button>
            ))}
          </ul>
        </div>

        {/* Ingredients */}
        <div className="cat__form__container">
          <label className='cat__form__label'>Liste des ingrédients</label>
          <button
            className="button cats__btn"
            type="button"
            onClick={() => setShowModalIngredient(true)}
          >
            Ajouter un ingrédient
          </button>

          <ul className="cat__form__multiple-choices">
            {chosenIngredientsWithDetails.map(ingredientWithDetail => (
              <button
                value={ingredientWithDetail.ingredient.id!}
                onClick={(e: any) => setChosenIngredientsWithDetails(
                  chosenIngredientsWithDetails.filter(el => el.ingredient.id !== parseInt(e.target.value))
                )}
                key={ingredientWithDetail.ingredient.label}
                className="cat__form__multiple-choices__option"
              >
                {ingredientWithDetail.quantité} {ingredientWithDetail.unité} {ingredientWithDetail.ingredient.label[0].toUpperCase() + ingredientWithDetail.ingredient.label.substring(1)}
              </button>
            ))}
          </ul>
        </div>

        {/* Modal ingredients */}
        {showModalIngredient && 
        <IngredientModal
          setChosenIngredientsWithDetails={setChosenIngredientsWithDetails}
          setShowModalIngredient={setShowModalIngredient}
          ingredients={ingredients}
          chosenIngredientsWithDetails={chosenIngredientsWithDetails}
        />}

        <input type="submit" className="cat__form__field" />
      </form>
      <Link className="button cats__btn" href="/recettes/plats">Retour aux plats</Link>
    </div>
  )
}