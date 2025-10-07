'use client';

import Link from 'next/link';
import './header.css';
import { logout } from '@/hooks/auth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getUser } from '@/hooks/auth';
import { User } from '@supabase/supabase-js';

export default function Header() {

  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getUser()
      .then(user => setUser(user)); 
  }, [])
  
  const logOut = async () => {
    if (!confirm("Êtes-vous sûr de vouloir vous déconnecter ?")) return;

    await logout();
    router.push('/auth');
  }

  return (
    <header className='header'>
      <nav className='header__nav'>
        <Link className='header__nav__link' href="/">Home</Link>
        <div className='header__nav__cat'>
          <Link href="/recettes" className='header__nav__link header__nav__link--center'>Recettes</Link>
          <Link href="/users" className='header__nav__link'>Utilisateurs</Link>
        </div>
        <div className='header__nav__right'>
          {user && user.email}
          <div onClick={logOut} className='header__nav__link'>Se déconnecter</div>
        </div>
      </nav>
    </header>
  )
}