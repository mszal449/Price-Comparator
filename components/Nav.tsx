"use client";
import Link from "next/link";
import React, { useState } from "react";
import { usePathname } from "next/navigation";

const NavLinks = () => {
  const pathname = usePathname();

  return (
    <>
      <Link
        className={`navbar-element ${pathname === "/home" ? "navbar-active" : ""}`}
        href="/home"
      >
        Strona główna
      </Link>
      <Link
        className={`navbar-element ${pathname === "/browse" ? "navbar-active" : ""}`}
        href="/browse"
      >
        Przeglądaj ceny
      </Link>
    </>
  );
};

const Nav = () => {
  return (
    <nav className="flex justify-start overflow-hidden">
      <div className="justify-end gap-4 md:flex">
        <NavLinks />
      </div>
    </nav>
  );
};

export default Nav;
