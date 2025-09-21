"use client"
import React, { useContext, useEffect, useState } from 'react'
import getLoggedUserCart from '@/CartActions/getUserCart.action';
import RemoveItemFromCart from '@/CartActions/removeCartItems';
import { toast } from 'sonner';
import UpdateCartQuantity from '@/CartActions/UpdateCartQuantity';
import { Button } from '@/components/ui/button';
import ClearCart from '@/CartActions/ClearCart';
import { CartContext } from '@/context/CartContext';
import { CartProductType } from './../../types/cart.type';
import Link from 'next/link';
import Image from 'next/image';






export default function Cart() {

const context = useContext(CartContext)

  if(!context) throw new Error("Not Exist")
const {numberofcartitem , setnumberofcartitem} = context;
  
const [products, setproducts] = useState([])
const [isLoading, setisLoading] = useState(true)
const [removeDesiable, setremoveDesiable] = useState(false)
const [updateDesiable, setupdateDesiable] = useState(false)
const [loadingUpdate, setloadingUpdate] = useState(false)
const [currentId, setcurrentId] = useState("")
const [total, settotal] = useState(0)
const [cartId, setcartId] = useState("")



  async function getuserCart(){
   try{
     const res = await getLoggedUserCart()
    settotal(res.data.totalCartPrice);
     if (res.status === "success"){
    setcartId(res.cartId)
       setproducts(res.data.products)
       setisLoading(false)
     }
   }catch{
    setisLoading(false)
    
   }
    
  }



async function deleteUserCart(id:string){
setremoveDesiable(true)
setupdateDesiable(true)
     const res = await RemoveItemFromCart(id)

      if (res.status === "success"){
        
        setproducts(res.data.products)
         toast.success ("Product Deleted Successfully" , {position:'top-center' ,duration :3000 
         });
         let sum = 0;
           res.data.products.forEach((product :CartProductType) => {
            sum += product.count
           });
                    getuserCart()
           setnumberofcartitem(sum)
         setremoveDesiable(false)
         setupdateDesiable(false)


        }else
         {
             toast.error ("Can’t Delete this Product now" , {position:'top-center' ,duration :3000 } );
                 setremoveDesiable(false)
                 setupdateDesiable(false)

        }

    }

async function updateProduct(id : string , count:string , sign:string){
  setcurrentId(id)
  setloadingUpdate(true)
   setupdateDesiable(true)
   setremoveDesiable(true)
     const res = await UpdateCartQuantity(id, count)
     
     if (res.status === "success"){
       setproducts(res.data.products)
       toast.success ("Quantity Updated Successfully" , {position:'top-center' ,duration :3000 
         });   

         if (sign === "+"){
           setnumberofcartitem(numberofcartitem +1)
         } else if (sign === "-") {
                     setnumberofcartitem(numberofcartitem -1)

         }
         getuserCart()
           setloadingUpdate(false)
          setupdateDesiable(false)
             setremoveDesiable(false)


     }else
         {
             toast.error ("Can’t Update Quantity" , {position:'top-center' ,duration :3000 } );
              setloadingUpdate(false)
             setupdateDesiable(false)
            setremoveDesiable(false)


        }
    };   

async function Clear(){
     const res = await ClearCart()

      if (res.message === "success"){
        setproducts([])
      }
    }

useEffect(() => {
  getuserCart()
}, [])

if (isLoading) {
  return <h1 className='text-center text-3xl font-bold my-12 text-red-600' > Loading..... </h1>
}  

  return (
<>
{products.length > 0 ? (
  <div className='w-2/3 mx-auto my-12'>
    <div className="flex justify-end"><Button 
    onClick={() => Clear()}
    className='cursor-pointer my-4 bg-red-600 hover:bg-red-700'>Clear Cart Items</Button></div>
<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
  <h1 className='text-2xl font-bold my-5 text-emerald-700 text-center '>Total Cart Price : {total}</h1>
  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="px-16 py-3">
          Image
        </th>
        <th scope="col" className="px-6 py-3">
          Product
        </th>
        <th scope="col" className="px-6 py-3">
          Qty
        </th>
        <th scope="col" className="px-6 py-3">
          Price
        </th>
        <th scope="col" className="px-6 py-3">
          Action
        </th>
      </tr>
    </thead>
    <tbody>
    {products.map((product :CartProductType ) => <tr key={product._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
        <td className="p-4">
          <Image src={product.product.imageCover}
           className="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch"
           width={150}
           height={150}
           />
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
          {product.product.title}
        </td>
        <td className="px-6 py-4">
          <div className="flex items-center">
            <button
            disabled = {updateDesiable}
            onClick={() => updateProduct(product.product.id , `${product.count - 1}` ,"-")}
            className="inline-flex items-center justify-center p-1 me-3 text-sm
             font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none
              hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400
               dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700
                disabled:bg-slate-200 disabled:font-semibold disabled:rounded-2xl disabled:text-white disabled:p-1
               " type="button">
              <span className="sr-only">Quantity button</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
              </svg>
            </button>
            <div>
{product.product.id === currentId ? (loadingUpdate? ( <i className='fas fa-spinner fa-spin'></i>
) : ( <span>{product.count}</span>
)) : (  <span>{product.count}</span>
)}

            </div>
            <button 
               disabled = {updateDesiable}

                onClick={() => updateProduct(product.product.id , `${product.count + 1}` , "+")}

            className="inline-flex items-center justify-center
             h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500
              bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4
               focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600
                dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700
                 disabled:bg-slate-200 disabled:font-semibold disabled:rounded-2xl disabled:text-white disabled:p-1
                " type="button">
              <span className="sr-only">Quantity button</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
              </svg>
            </button>
          </div>
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
          {product.price * product.count} EGP
        </td>
        <td className="px-6 py-4">
          <button
           disabled={removeDesiable}
            onClick={() =>deleteUserCart(product.product.id) } 
            className='text-red-700 font-semibold cursor-pointer
             disabled:bg-slate-200 disabled:font-semibold disabled:rounded-2xl disabled:text-white disabled:p-3'>
              Remove</button>
        </td>
      </tr>)}
    </tbody>
  </table>
  <Link href={`/checkout/${cartId}`}> <Button className='w-full cursor-pointer bg-sky-800 my-4 p-3 hover:bg-sky-900'>Check Out</Button>
  </Link>
  <Link href={`/cach/${cartId}`}> <Button className='w-full cursor-pointer bg-red-700 my-2 p-3 hover:bg-red-900'>Cach </Button>
  </Link>
</div>

</div>)
 : (<h1 className='text-center text-3xl font-bold my-12 text-red-600' > No products add yet! </h1>)}

</>
  )
}










