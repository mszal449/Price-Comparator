"use client";
import React, { useEffect, useState } from "react";
import Logo from "./Logo";
import { User } from "@supabase/supabase-js";
import Link from "next/link";
import SignOutButton from "./SignOutButton";

interface NavbarProps {
  initialUser: User | null;
}

const Navbar = ({ initialUser }: NavbarProps) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setUser(initialUser);
  });

  return (
    <div className="nav border-gray top-0 z-[20] mx-auto flex w-full items-center justify-between p-4">
      <div className="flex items-center justify-start gap-4">
        <Logo />
        <nav className="flex w-full items-center justify-between">
          <div className="flex items-center gap-4">
            <Link className={`navbar-element`} href="/">
              Strona główna
            </Link>
            <Link className={`navbar-element`} href="/report">
              Przeglądaj ceny
            </Link>
          </div>
        </nav>
      </div>
      {user?.email ? (
        <div className="flex items-center gap-4">
          <Link className="navbar-element" href={"/"}>
            {user?.email}
          </Link>
          <SignOutButton />
        </div>
      ) : (
        <Link className="navbar-element" href={"/auth/login"}>
          Zaloguj
        </Link>
      )}
    </div>
  );
};

export default Navbar;
