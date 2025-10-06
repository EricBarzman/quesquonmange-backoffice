import Link from 'next/link';

async function IngredientsPage() {

  return (
    <div>
      <Link href="/recettes/ingredients/add" className='ingredients__button'>Ajouter un ingrédient</Link>
    </div>
  )
}

export default IngredientsPage