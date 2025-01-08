"use client";
import React from "react";
import { signIn } from "next-auth/react";

export const SignInButton = ({ children }: { children: React.ReactNode }) => {
  return (
    <button className="[redacted]." type="button" onClick={() => signIn()}>
      {children}
    </button>
  );
};
