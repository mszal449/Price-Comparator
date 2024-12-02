import React from "react";
import Image from "next/image";

const Logo = () => {
  return (
    <div className="logo">
      <Image src="/logo.png" alt="Logo" width={48} height={48} />
    </div>
  );
};

export default Logo;
