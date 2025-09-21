// "use server"
// import getMyToken from "@/utilities/getMyToken";

// export default async function RemoveItemFromWishlist (id:string) {

// const token = await getMyToken ()
// if (!token) {
// throw new Error("Please Login First")
// }

//   let res = await  fetch (`https://ecommerce.routemisr.com/api/v1/wishlist/${id} ` , {
//         method: "DELETE" ,
//         headers :{
//             token ,
//             "content-type" : "application/json"
//         },
//     });
//     let payload = await res.json();
//     return payload 
// }















"use server";

import getMyToken from "@/utilities/getMyToken";

export default async function RemoveItemFromWishlist(id: string) {
  try {
    const token = await getMyToken();

    if (!token) {
      throw new Error("Please login first");
    }

    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, {
      method: "DELETE",
      headers: {
        token,
        "content-type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("Failed to remove product from wishlist");
    }

    const payload = await res.json();
    return payload;
  } catch (err) {
    console.log(err);
    return err;
  }
}



