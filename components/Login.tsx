"use client";
import React from "react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Login = () => {
  const { status } = useSession();

  return (
    <>
      {status === "authenticated" ? (
        <div className="flex justify-end gap-4">
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
