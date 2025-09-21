
"use server";

import getMyToken from "@/utilities/getMyToken";



export default async function AddToCart(id:string) {
try{
    const token = await getMyToken();

  if (!token) {
    throw new Error("Please login to be able to add product");
  }

  const res = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
    method: "POST",
    headers: {
      token,
            "content-type": "application/json",
    },
    body: JSON.stringify({ productId: id }),
  });

  if (!res.ok) {
    throw new Error("Failed to add product to cart");
  }

  const payload = await res.json();
  return payload;
} catch (err){
  return err
  
}
}