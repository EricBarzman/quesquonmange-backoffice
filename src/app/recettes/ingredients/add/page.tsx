import AddIngredientForm from '@/components/ingredients/AddIngredientForm'
import Link from 'next/link'

function AddIngredient() {
  return (
    <div>
      <AddIngredientForm />
      <Link className="ingredients__button" href="/recettes/ingredients">Retour au tableau</Link>
    </div>
  )
}

export default AddIngredient