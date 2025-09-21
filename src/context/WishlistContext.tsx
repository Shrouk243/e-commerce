
//    "use client";

// import getMyToken from "@/utilities/getMyToken";
// import getLoggedUserWishlist from "@/wishlistActions/getUserWishlist";
// import React, { createContext, useEffect, useState, ReactNode } from "react";

// // 1. Define the type for the context
// interface CartContextType {
//   numberofcartitem: number;
//   setnumberofwishlistitem: React.Dispatch<React.SetStateAction<number>>;
// }

// // 2. Create the context with default value as undefined
// export const WishlistContext = createContext<CartContextType | undefined>(undefined);

// // 3. Define props type for the provider
// interface WishlistContextProviderProps {
//   children: ReactNode;
// }

// // 4. Implement the provider component
// export default function WishlistContextProvider({ children }: WishlistContextProviderProps) {
//   const [token, settoken] = useState<string | null>("");
//   const [numberofwishlistitem, setnumberofwishlistitem] = useState(0);

//   async function getTheToken() {
//     const token = await getMyToken();
//     settoken(token);
//   }

//   async function getUserWishlist() {
//     try {
//       let res = await getLoggedUserWishlist();

//       if (res.status === "success") {
//         let sum = 0;
//         res.data.products.forEach((product: { count: number }) => {
//           sum += product.count;
//         });
//         setnumberofwishlistitem(sum);
//       }
//     } catch (err) {
//     }
//   }

//   useEffect(() => {
//     getUserWishlist();
//   }, []);

//   return (
//     <WishlistContext.Provider value={{numberofwishlistitem , setnumberofwishlistitem }}>
//       {children}
//     </WishlistContext.Provider>
//   );
// }







"use client";

import getMyToken from "@/utilities/getMyToken";
import getLoggedUserWishlist from "@/wishlistActions/getUserWishlist";
import React, { createContext, useEffect, useState, ReactNode } from "react";

// 1. Define the type for the context
interface WishlistContextType {
  numberofwishlistitem: number;
  setnumberofwishlistitem: React.Dispatch<React.SetStateAction<number>>;
}

// 2. Create the context with default value as undefined
export const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

// 3. Define props type for the provider
interface WishlistContextProviderProps {
  children: ReactNode;
}

// 4. Implement the provider component
export default function WishlistContextProvider({ children }: WishlistContextProviderProps) {
  const [_token, settoken] = useState<string | null>("");
  const [numberofwishlistitem, setnumberofwishlistitem] = useState<number>(0);

  async function _getTheToken() {
    const token = await getMyToken();
    settoken(token);
  }

  async function getUserWishlist() {
    try {
      const res = await getLoggedUserWishlist();

      if (res.status === "success") {
        let sum = 0;
        res.data.products.forEach((product: { count: number }) => {
          sum += product.count;
        });
        setnumberofwishlistitem(sum);
      }
    } catch {
    }
  }

  useEffect(() => {
    getUserWishlist();
  }, []);

  return (
    <WishlistContext.Provider value={{ numberofwishlistitem, setnumberofwishlistitem }}>
      {children}
    </WishlistContext.Provider>
  );
}
