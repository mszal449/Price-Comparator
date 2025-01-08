"use client";
import React, { useEffect } from "react";
import { useActionState } from "react";
import { requestSignIn } from "actions/request-sign-in";

const initState = { error: "" };

export const SignInForm = () => {
  const [fstate, action] = useActionState(requestSignIn, initState);

  useEffect(() => {
    const { error } = fstate;
    if (error) alert(error);
  }, [fstate]);

  return (
    <form action={action} className="flex flex-col items-center gap-4">
      <div className="flex flex-col gap-2">
        <label className="text-lg">
          Email
          <input
            name="email"
            type="email"
            className="mt-1 w-full rounded-md border border-gray-800 bg-black p-2 text-white"
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
          />
        </label>
      </div>
      <button
        type="submit"
        className="mt-4 rounded-md bg-purple-600 p-2 text-white duration-150 ease-in hover:bg-purple-700"
      >
        Sign In
      </button>
    </form>
  );
};
