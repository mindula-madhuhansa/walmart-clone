"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Grid2X2,
  Heart,
  LayoutGrid,
  Search,
  ShoppingCart,
  User,
} from "lucide-react";
import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store";
import getCartTotal from "@/lib/getCartTotal";

function Header() {
  const router = useRouter();
  const cart = useCartStore((state) => state.cart);
  const total = getCartTotal(cart);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const input = e.currentTarget.input.value;
    router.push(`/search?q=${input}`);
  };
  return (
    <header className="flex flex-col md:flex-row items-center bg-walmart px-10 py-7 space-x-5">
      <Link href={"/"} className="mb-5 md:mb-0">
        <Image
          src="https://i.imgur.com/5V4wehM.png"
          alt="Walmart Logo"
          height={150}
          width={150}
        />
      </Link>

      <form
        onSubmit={handleSubmit}
        className="flex items-center bg-white rounded-full w-full flex-1"
      >
        <input
          name="input"
          type="text"
          placeholder="Search Everything..."
          className="flex-1 px-4 rounded-l-full outline-none placeholder:text-xs text-black"
        />
        <button type="submit">
          <Search className="rounded-full h-10 w-10 px-2 bg-yellow-400 cursor-pointer" />
        </button>
      </form>

      <div className="flex space-x-5 mt-5 md:mt-0">
        <Link href={"/"} className="navItems hidden xl:flex">
          <Grid2X2 size={20} />
          <p>Departments</p>
        </Link>

        <Link href={"/"} className="navItems hidden xl:flex">
          <LayoutGrid size={20} />
          <p>Services</p>
        </Link>

        <Link href={"/"} className="navItems">
          <Heart size={20} />
          <div>
            <p className="text-xs font-extralight">Recorder</p>
            <p>My Items</p>
          </div>
        </Link>

        <Link href={"/"} className="navItems">
          <User size={20} />
          <div>
            <p className="text-xs font-extralight">Sign In</p>
            <p>Account</p>
          </div>
        </Link>

        <Link href={"/basket"} className="navItems">
          <ShoppingCart size={20} />
          <div>
            <p className="text-xs font-extralight">
              {cart.length > 0 ? `${cart.length} items` : "No items"}
            </p>
            <p>{cart.length > 0 ? `${total}` : "USD 0.00"}</p>
          </div>
        </Link>
      </div>
    </header>
  );
}

export default Header;
