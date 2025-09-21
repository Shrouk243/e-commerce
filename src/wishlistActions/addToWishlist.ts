
// "use server";

// import getMyToken from "@/utilities/getMyToken";



// export default async function AddToWishlist(id:string) {
// try{
//     const token = await getMyToken();

//   if (!token) {
//     throw new Error("Please login to be able to add product");
//   }

//   const res = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
    
//     method: "POST",
//     headers: {
//       token,
//             "content-type": "application/json",
//     },
//     body: JSON.stringify({ productId: id }),
//   });
//       console.log(res);


//   if (!res.ok) {
//     throw new Error("Failed to add product to wishlist");
//   }

//   let payload = await res.json();
//   return payload;
// } catch (err){
//     console.log(err);
//   return err
  
// }
// }



















"use server";

import getMyToken from "@/utilities/getMyToken";

export default async function AddToWishlist(id: string) {
  try {
    const token = await getMyToken();

    if (!token) {
      throw new Error("Please login to be able to add product");
    }

    const res = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
      method: "POST",
      headers: {
        token,
        "content-type": "application/json",
      },
      body: JSON.stringify({ productId: id }),
    });

    if (!res.ok) {
      throw new Error("Failed to add product to wishlist");
    }

    const payload = await res.json();
    return payload;
  } catch (err) {
    console.log(err);
    return err;
  }
}
