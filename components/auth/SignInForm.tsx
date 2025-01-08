// File: /components/auth/SignInForm.tsx
"use client";
import React, { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const SignInForm = () => {
  const { status } = useSession();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError(res.error);
    } else {
      router.push("/raport");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
      <div className="flex flex-col gap-2">
        <label className="text-lg">
          Email
          <input
            name="email"
            type="email"
            className="mt-1 w-full rounded-md border border-gray-800 bg-black p-2 text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-lg">
          Password
          <input
            name="password"
            type="password"
            className="mt-1 w-full rounded-md border border-gray-800 bg-black p-2 text-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <button
        type="submit"
        className="mt-4 rounded-md bg-purple-600 p-2 text-white duration-150 ease-in hover:bg-purple-700"
      >
        Sign In
      </button>
    </form>
  );
};

export default SignInForm;
