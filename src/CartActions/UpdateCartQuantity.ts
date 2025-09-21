"use server"

import getMyToken from "@/utilities/getMyToken"


export default async function UpdateCartQuantity (id:string , count:string ) {

const token = await getMyToken ()
if (!token) {
throw new Error("Please Login First!")
}

  const res = await  fetch (` https://ecommerce.routemisr.com/api/v1/cart/${id} ` , {
        method: "PUT" ,
        headers :{
            token ,
            "content-type" : "application/json"
        },
            body: JSON.stringify({ count }),

    });
    const payload = await res.json();
    return payload 
}