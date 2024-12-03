"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { signOut } from "next-auth/react";

const Login = () => {
  const { data: session } = useSession();
  return (
    <>
      {session ? (
        <div className="flex justify-end gap-4">
          <Link href="/" className="navbar-element">
            Konto
          </Link>
          <button onClick={() => signOut()} className="navbar-element">
            Wyloguj
          </button>
        </div>
      ) : (
        <div className="flex gap-4">
          <Link href="/auth/login" className="navbar-element">
            Zaloguj
          </Link>
          <Link href="/auth/register" className="navbar-element">
            Zarejestruj
          </Link>
        </div>
      )}
    </>
  );
};

export default Login;
