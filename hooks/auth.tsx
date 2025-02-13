"use client";

import React, { useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/navigation"; // ✅ Using next/navigation for App Router

const Auth = () => {
  const { user, error, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return; // Wait until authentication status is determined

    if (user) {
      // If logged in and on "/", redirect to "/gender-fit"
      if (window.location.pathname === "/") {
        router.push("/gender-fit");
      }
    } else {
      // If logged out and not on "/", redirect to "/"
      if (window.location.pathname !== "/") {
        router.push("/");
      }
    }
  }, [user, isLoading]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return <div></div>;
};

export default Auth;
