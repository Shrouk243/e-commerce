

"use client";

import React, { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { WishlistContext } from "./../../../context/WishlistContext";
import AddToWishlist from "@/wishlistActions/addToWishlist";
import RemoveItemFromWishlist from "@/wishlistActions/removeToWishlist";

export default function AddBtn({ id }: { id: string }) {

  const contextwish = useContext(WishlistContext)

  if(!contextwish) throw new Error("Not Exist")


  const { numberofwishlistitem, setnumberofwishlistitem } = contextwish ;
  const [active, setActive] = useState(false); 
  async function checkAddToWishlist(id: string) {
    if (!active) {

      const res = await AddToWishlist(id);

      if (res.status === "success") {
        toast.success("Product Added Successfuly", { position: "top-center", duration: 2000 });
        setnumberofwishlistitem(numberofwishlistitem + 1);
        setActive(true);
      } else {
        toast.error(res.message, { position: "top-center", duration: 2000 });
      }
    } else {
      const res = await RemoveItemFromWishlist(id);

      if (res.status === "success") {
        toast.success("Product Removed Successfully", { position: "top-center", duration: 2000 });
        setnumberofwishlistitem(numberofwishlistitem - 1);
        setActive(false);
      } else {
        toast.error(res.message, { position: "top-center", duration: 2000 });
      }
    }
  }

  return (
    <Button
      onClick={() => checkAddToWishlist(id)}
      className="cursor-pointer bg-white hover:bg-white border-white"
    >
      <i className={`fa-regular fa-heart ${active ? "text-green-500" : "text-black"}`}></i>
    </Button>
  );
}
