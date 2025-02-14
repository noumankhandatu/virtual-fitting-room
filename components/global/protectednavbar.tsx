"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import Loader from "../loader";

const ProtectedNavbar = () => {
  const { user, isLoading } = useUser();
  const [open, setOpen] = useState(false); // State to toggle profile popup

  if (isLoading) return <Loader />;

  return (
    <div>
      <nav className="p-4">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <Image src="/logo.svg" alt="Virtual Vogue" width={80} height={80} className="object-contain" />

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/gender-fit" className="text-gray-800 hover:text-gray-600 transition text-[20px] bebas-font">
              Gender Fit
            </Link>

            {/* Profile Dropdown */}
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <button>
                  <Avatar className="cursor-pointer">
                    <AvatarImage src={user?.picture || "https://github.com/shadcn.png"} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </button>
              </PopoverTrigger>

              <PopoverContent className="w-64 p-4">
                <div className="flex flex-col items-center text-center">
                  {/* User Avatar */}
                  <Avatar className="w-16 h-16 mb-2">
                    <AvatarImage src={user?.picture || "https://github.com/shadcn.png"} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>

                  {/* User Details */}
                  <p className="text-lg font-semibold">{user?.name}</p>
                  <p className="text-sm text-gray-500 truncate w-48">{user?.email}</p>

                  {/* Logout Button */}
                  <Button className="w-full mt-4 bg-red-500 hover:bg-red-600" asChild>
                    <Link href="/api/auth/logout">Logout</Link>
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default ProtectedNavbar;
