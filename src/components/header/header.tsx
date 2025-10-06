'use client';

import Link from 'next/link';
import './header.css';

export default function Header() {
  return (
    <header className='header'>
      <nav className='header__nav'>
        <Link className='header__nav__link' href="/">Home</Link>
        <div className='header__nav__cat'>
          <Link href="/recettes" className='header__nav__link header__nav__link--center'>Recettes</Link>
          <Link href="/users" className='header__nav__link'>Utilisateurs</Link>
        </div>
        <Link href="/" className='header__nav__link'>Sign out</Link>
      </nav>
    </header>
  )
}