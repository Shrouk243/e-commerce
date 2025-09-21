
   "use client";

import getLoggedUserCart from "@/CartActions/getUserCart.action";
import getMyToken from "@/utilities/getMyToken";
import React, { createContext, useEffect, useState, ReactNode } from "react";

// 1. Define the type for the context
interface CartContextType {
  numberofcartitem: number;
  setnumberofcartitem: React.Dispatch<React.SetStateAction<number>>;
  
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartContextProviderProps {
  children: ReactNode;
}

export default function CartContextProvider({ children }: CartContextProviderProps) {
  const [_token, settoken] = useState<string | null>("");
  const [numberofcartitem, setnumberofcartitem] = useState(0);

  async function _getTheToken() {
    const token = await getMyToken();
    settoken(token);
  }

  async function getUserCart() {
    try {
      const res = await getLoggedUserCart();

      if (res.status === "success") {
        let sum = 0;
        res.data.products.forEach((product: { count: number }) => {
          sum += product.count;
        });
        setnumberofcartitem(sum);
      }
    } catch  {
    }
  }

  useEffect(() => {
    getUserCart();
  }, []);

  return (
    <CartContext.Provider value={{ numberofcartitem, setnumberofcartitem 
 }}>
      {children}
    </CartContext.Provider>
  );
}
