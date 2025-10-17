'use client';

import Link from "next/link";

import { Ingredient } from "@/types/recettes.types";
import './ingredient.css';
import { useEffect, useState } from "react";

import { RESULT_PER_PAGE } from "@/constants/resultsPerPage";


export default function IngredientsTable({ cats }: { cats: Ingredient[] }) {

  const nbrPages = Math.ceil(cats.length / RESULT_PER_PAGE);

  const [catsOnPage, setCatsOnPage] = useState<Ingredient[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCatsOnPage(cats.slice(0, RESULT_PER_PAGE * currentPage));
  }, [cats])

  useEffect(() => {
    setCatsOnPage(cats.slice(RESULT_PER_PAGE * (currentPage - 1), RESULT_PER_PAGE * currentPage));
    window.scroll(0, 0);
  }, [currentPage])

  return (
    <>
      <h3 className="pagination__counter">Page : {currentPage}</h3>
      <table className="cats__table">
        <thead>
          <tr>
            <th className="cats__table__cell">ID</th>
            <th className="cats__table__cell">Label</th>
            <th className="cats__table__cell">Lien</th>
          </tr>
        </thead>
        <tbody>
          {catsOnPage.map(cat => (
            <tr key={cat.id}>
              <td className="cats__table__cell">{cat.id}</td>
              <td className="cats__table__cell">{cat.label}</td>
              <td className="cats__table__cell cats__table__cell--link">
                <Link href={`/recettes/ingredients/${cat.id}`}>Voir</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination__container">
        {currentPage > 1 && (
          <div
            onClick={() => setCurrentPage(currentPage - 1)}
            className="pagination__arrow"
          >
            {"<-"}
          </div>
        )}
        {Array.from({ length: nbrPages }).map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`pagination__btn ${index + 1 === currentPage ? "pagination__btn--here" : ""}`}
          >
            {index + 1}
          </div>
        ))}
        {currentPage < nbrPages && (
          <div
            onClick={() => setCurrentPage(currentPage + 1)}
            className="pagination__arrow"
          >
            {"->"}
          </div>
        )}
      </div>
    </>
  )
}