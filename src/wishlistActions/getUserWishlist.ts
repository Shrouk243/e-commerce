
// "use server"
// import getMyToken from "@/utilities/getMyToken"


// export default async function getLoggedUserWishlist () {

// let token = await getMyToken ()
// if (!token) {
// throw new Error("Please Login To be able see Wishlist!")
// }

//   let res = await  fetch (` https://ecommerce.routemisr.com/api/v1/wishlist ` , {
//         method: "GET" ,
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

export default async function getLoggedUserWishlist() {
  try {
    const token = await getMyToken();

    if (!token) {
      throw new Error("Please login to view wishlist");
    }

    const res = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
      method: "GET",
      headers: {
        token,
      },
      cache: "no-store", 
    });

    if (!res.ok) {
      throw new Error("Failed to fetch wishlist");
    }

    const payload = await res.json();

    return payload;}
  // } catch (err:unknown) {
  //   return { status: "error", message: err.message || "Something went wrong" };
  // }
  catch (err: unknown) {
    let message = "Something went wrong";
    if (err instanceof Error) message = err.message;
    return { status: "error", message };
  }
}



