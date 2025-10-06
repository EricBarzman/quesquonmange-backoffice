import Link from "next/link"
import { recettesCatList } from "../constants/recettesCategories"

import './page.css';
import slugify from "@/utils/slugify";

function RecettesHomePage() {
  return (
    <div className='recettes'>
      <h2 className='recettes__title'>Catégories liées aux recettes</h2>
      <div className='recettes__container'>
        {recettesCatList.map(cat => (
          <Link key={cat} href={`/recettes/${slugify(cat)}`} className="recettes__container__link">
            {cat[0].toUpperCase() + cat.substring(1)}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default RecettesHomePage