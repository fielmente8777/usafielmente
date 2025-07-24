"use client";
import { usePathname } from "next/navigation";
import LandingHeader from "./LandingHeader";
// import Header2 from "./header2";
import React from "react";

const NavBar = () => {
  const pathname = usePathname();

  let HeaderComponent = LandingHeader;

  if (pathname === "/thank-you/") {
    return null;
  }

  return <>{HeaderComponent && <HeaderComponent />}</>;
};

export default NavBar;
