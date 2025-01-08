"use client";
import React from "react";
import { signOut } from "next-auth/react";

export const SignOutButton = ({ children }: { children: React.ReactNode }) => {
  return (
    <button className="[redacted]." type="button" onClick={() => signOut()}>
      {children}
    </button>
  );
};
