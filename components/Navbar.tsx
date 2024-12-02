import React from "react";
import Logo from "./Logo";
import Nav from "./Nav";
import Login from "./Login";

const Navbar = () => {
  return (
    <div className="nav border-gray top-0 z-[20] mx-auto flex w-full items-center justify-between p-4">
      <div className="flex items-center justify-start gap-4">
        <Logo />
        <Nav />
      </div>
      <Login />
    </div>
  );
};

export default Navbar;
