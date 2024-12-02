'use client';
import Link from 'next/link';
import React from 'react';

const Login = () => {
  const loggedIn = false;
  
  return (
    <>
      {loggedIn ? 
        <div className='flex gap-4 justify-end'>
          <Link href="/" className='navbar-element'>Konto</Link>
          <Link href="/" className='navbar-element  '> Wyloguj</Link>
        </div>
       : 
        <Link href="/" className='navbar-element'>Zaloguj</Link>
      }
    </>
  )
}

export default Login