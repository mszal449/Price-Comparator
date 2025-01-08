"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { signOut } from "next-auth/react";
import { useEffect } from "react";

const Login = () => {
  const { data: session, status } = useSession();

  useEffect(() => {}, [status]);

  return (
    <>
      {session ? (
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
function UseEffect() {
  throw new Error("Function not implemented.");
}
