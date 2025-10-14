import { Ingredient, IngredientWithQuantityAndUnity } from "@/types/recettes.types"
import { Dispatch, SetStateAction, useState } from "react"

function IngredientModal({
  ingredients,
  chosenIngredientsWithDetails,
  setShowModalIngredient,
  setChosenIngredientsWithDetails,
}: {
  ingredients: Ingredient[],
  chosenIngredientsWithDetails: IngredientWithQuantityAndUnity[],
  setShowModalIngredient: Dispatch<SetStateAction<boolean>>,
  setChosenIngredientsWithDetails: Dispatch<SetStateAction<IngredientWithQuantityAndUnity[]>>
}) {

  const [targetIngredientId, setTargetIngredientId] = useState<number | null>(null);

  const [quantité, setQuantité] = useState(0);
  const [unité, setUnité] = useState('');

  function resetAndCloseModal() {
    setTargetIngredientId(null);
    setQuantité(0);
    setUnité('');
    setShowModalIngredient(false);
  }

  function createIngredient() {
    const targetIngredient = ingredients.find(ingredient => ingredient.id === targetIngredientId);
    if (!targetIngredient) return;

    const ingredientWithDetail: IngredientWithQuantityAndUnity = {
      ingredient: targetIngredient,
      quantité,
      unité,
    }
    setChosenIngredientsWithDetails([...chosenIngredientsWithDetails, ingredientWithDetail]);
    resetAndCloseModal();
  }

  return (
    <div className="modal">
      <div className="modal__container">
        <div className="modal__headline">
          <h3 className="modal__title">Créer un ingrédient</h3>
          <button className="modal__btn" onClick={resetAndCloseModal}>
            X
          </button>
        </div>

        <div className="modal__form">
          <select
            defaultValue={""}
            onChange={(e: any) => setTargetIngredientId(parseInt(e.target.value))}
            className="cat__form__field"
          >
            <option disabled value="">-- Choisir un ingrédient --</option>
            {ingredients.map(ingredient => (
              <option key={ingredient.id} value={ingredient.id!}>
                {ingredient.label[0].toUpperCase() + ingredient.label.substring(1)}
              </option>
            ))}
          </select>
          <label className="cat__form__label">Quantité</label>
          <input
            onChange={(e) => setQuantité(parseInt(e.target.value))}
            className="cat__form__field"
            type="number"
            placeholder="La quantité"
          />

          <label className="cat__form__label">Unité</label>
          <input
            className="cat__form__field"
            type="text"
            placeholder="Ex: feuille, kg, g..."
            onChange={(e) => setUnité(e.target.value)}
          />
        </div>
        <button
          type="button"
          className="button cats__btn"
          onClick={createIngredient}
        >
          Valider
        </button>

      </div>
    </div>
  )
}

export default IngredientModal