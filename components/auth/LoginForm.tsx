"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const LoginForm = () => {
  const { status } = useSession();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = React.useState<string>("");
  const [passwordError, setPasswordError] = React.useState<string>("");
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/raport");
    }
  }, [status, router]);

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) {
      setEmailError("Email jest wymagany");
      return;
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("Hasło jest wymagane");
      return;
    } else {
      setPasswordError("");
    }

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setPasswordError("Niepoprawne dane logowania");
        return;
      }

      router.replace("/raport");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex h-screen flex-col items-center pt-20">
      <div className="pb-5 text-2xl">Logowanie</div>
      <form className="" action="#" onSubmit={submitForm}>
        <div className="pb-5">
          <h1 className="ml-1">Email</h1>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className={`rouned-sm border border-gray-800 bg-black p-1 ${emailError !== "" ? "border-red-500" : ""}`}
          />
          {emailError && <div className="text-red-500">{emailError}</div>}
        </div>
        <div className="pb-5">
          <h1 className="ml-1">Hasło</h1>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Hasło"
            className={`rouned-md border border-gray-800 bg-black p-1 ${passwordError !== "" ? "border-red-500" : ""}`}
          />
          {passwordError && <div className="text-red-500">{passwordError}</div>}
        </div>
        <div className="flex flex-col items-center">
          <button
            type="submit"
            className="mx-auto mb-4 rounded-md bg-purple-600 p-2 duration-150 ease-in hover:bg-purple-700"
          >
            Zaloguj się
          </button>
          <Link href="/" className="text-sm hover:underline">
            Nie pamiętasz hasła?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
