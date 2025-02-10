import Image from "next/image";
import Link from "next/link";
import React from "react";
import "../../styles/globals.css";
const ProtectedNavbar = () => {
  return (
    <div>
      <nav className="p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/logo.svg" alt="Virtual Vogue" width={80} height={80} className="object-contain" />
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/home" className="text-gray-800 hover:text-gray-600 transition text-[20px] bebas-font">
              HOME
            </Link>
            <Link href="/about" className="text-gray-800 hover:text-gray-600 transition  text-[20px] bebas-font">
              ABOUT
            </Link>
            <Link href="/contact" className="text-gray-800 hover:text-gray-600 transition  text-[20px] bebas-font">
              CONTACT
            </Link>
            <Link href="/signin" className="text-gray-800 hover:text-gray-600 transition text-[20px] bebas-font">
              LOGIN
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default ProtectedNavbar;
