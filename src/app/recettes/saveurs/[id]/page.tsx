import Link from "next/link";
import OneSaveurTable from "@/components/saveurs/one-saveur-table";
import { getSaveurById } from "@/hooks/saveurs";

export default async function SaveurPage(props: { params: { id: string } }) {
  const { params } = props;
  const saveur = await getSaveurById(parseInt(await params.id));

  return (
    <div className="ingredients__right__container">
      <OneSaveurTable saveur={saveur} />
      <Link className="ingredients__button" href="/recettes/ingredients">Retour au tableau</Link>
    </div>
  )
}