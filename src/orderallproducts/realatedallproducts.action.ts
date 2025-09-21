"use server"

export default async function getRealatedAllProducts(){
const res =  await fetch(`https://ecommerce.routemisr.com/api/v1/orders/`)

const payload = await res.json();
return payload
}



