
"use client";
import React, { useContext, useState } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { CartContext } from "@/context/CartContext";

export default function Navbar() {
 const context = useContext(CartContext)

  if(!context) throw new Error("Not Exist")
const {numberofcartitem , setnumberofcartitem} = context


  const { data: session, status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  function logout() {
    signOut({ callbackUrl: "/login" });
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav className="bg-emerald-600 text-white">
        <div className="container w-full lg:w-[80%] flex-col lg:flex-row gap-4 mx-auto p-4 flex justify-between items-center">
          <div className="flex justify-between items-center w-full lg:hidden">
            <Link href="/">
              <i className="fa-solid fa-cart-shopping text-2xl"></i> Freshcart
            </Link>
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              <i
                className={`fa-solid ${isMenuOpen ? "fa-times" : "fa-bars"} text-2xl`}
              ></i>
            </button>
          </div>

          <div
            className={`left ${
              isMenuOpen ? "block" : "hidden"
            } lg:flex lg:w-auto w-full`}
          >
            <ul className="flex flex-col lg:flex-row gap-2 lg:gap-6 items-center">
              <li className="hidden lg:block">
                <Link href="/">
                  <i className="fa-solid fa-cart-shopping text-2xl"></i> Freshcart
                </Link>
              </li>
              <li>
                <Link href="/">Home</Link>
              </li>
              {session && (
                <li>
                  <Link className="relative" href="/cart">
                    Cart
                    {numberofcartitem > 0 && (
                      <span className="absolute top-[-10px] end-[-10px] flex size-5 bg-white text-emerald-700 rounded-full justify-center items-center">
                        {numberofcartitem}
                      </span>
                    )}
                  </Link>
                </li>
              )}
              <li>
                <Link href="/wishlist">
                  <i className="fa-regular fa-heart"></i>
                </Link>
              </li>
              <li>
                <Link href="/products">Products</Link>
              </li>
              <li>
                <Link href="/categories">Categories</Link>
              </li>
              <li>
                <Link href="/brands">Brands</Link>
              </li>
            </ul>
          </div>

          <div
            className={`right ${
              isMenuOpen ? "block" : "hidden"
            } lg:flex lg:w-auto w-full`}
          >
            <ul className="flex flex-col lg:flex-row gap-4 items-center">
              {!session ? (
                <>
                  <li>
                    <i className="fab fa-facebook"></i>
                  </li>
                  <li>
                    <i className="fab fa-twitter"></i>
                  </li>
                  <li>
                    <i className="fab fa-instagram"></i>
                  </li>
                  <li>
                    <i className="fab fa-tiktok"></i>
                  </li>
                  <li>
                    <i className="fab fa-linkedin"></i>
                  </li>
                  <li>
                    <Link href="/register">Register</Link>
                  </li>
                  <li>
                    <Link href="/login">Login</Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <span className="cursor-pointer" onClick={logout}>
                      Signout
                    </span>
                  </li>
                  {session && <li>Hi {session?.user.name}</li>}
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}