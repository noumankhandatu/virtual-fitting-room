"use client";

import Welcome from "@/sections/welcome";
import "../styles/globals.css";
import useAuthRedirect from "@/hooks/useAuthRedirect";

const Page = () => {
  const { isLoading } = useAuthRedirect();

  if (isLoading) return <p>Loading...</p>;

  return <Welcome />;
};

export default Page;
