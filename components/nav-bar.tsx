import Link from "next/link";
import { Button } from "@/components/ui/button";

export function NavBar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-transparent">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-white text-3xl font-bold">
          <img src="/logo.svg" alt="" />
        </Link>
        <div className=" md:flex space-x-8 items-center">
          <Button
            onClick={() => (window.location.href = "/api/auth/login")}
            size="lg"
            className="bg-black text-white hover:bg-black/80 text-lg px-8 py-6 rounded-full bebas-font "
          >
            Login to Try-on!
          </Button>
        </div>
      </div>
    </nav>
  );
}
