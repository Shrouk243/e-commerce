"use client"
import AddToCart from '@/CartActions/addToCart.action';
import { Button } from '@/components/ui/button'
import { CartContext } from '@/context/CartContext';
import React, { useContext } from 'react'
import { toast } from 'sonner';



export default function AddBtn({id} : {id :string}) {
  const context = useContext(CartContext)

  if(!context) throw new Error("Not Exist")
const {numberofcartitem , setnumberofcartitem} = context

async function checkAddToCart(id : string) {
   
  
    const res = await AddToCart(id)
   if (res.status === "success"){
    toast.success ("Product Added Successfully" , {position:'top-center' ,duration :2000 

    });
    setnumberofcartitem(numberofcartitem + 1)
   }else
    {
        toast.error (res.message , {position:'top-center' ,duration :2000 } )

}}

  return (
    <>
      <Button  onClick={() => checkAddToCart(id)} className='cursor-pointer w-full'>Add to cart</Button>

    </>
  )}

