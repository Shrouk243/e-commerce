
"use server"
import getMyToken from "@/utilities/getMyToken"


export default async function getLoggedUserCart () {

const token = await getMyToken ()
if (!token) {
throw new Error("Please Login To be able see Cart!")
}

  const res = await  fetch (` https://ecommerce.routemisr.com/api/v1/cart ` , {
        method: "GET" ,
        headers :{
            token ,
            "content-type" : "application/json"
        },
    });
    const payload = await res.json();
    return payload 
}