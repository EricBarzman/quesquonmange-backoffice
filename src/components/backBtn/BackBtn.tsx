import Link from 'next/link'

function BackBtn({ url, label }: { url: string, label: string }) {
  return (
    <Link className="button cats__btn" href={`/recettes/${url}`}>Retour aux {label}</Link>
  )
}

export default BackBtn