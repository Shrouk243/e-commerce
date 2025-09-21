import getProducts from '@/api/products.api'
import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from 'next/link';
import Image from 'next/image';
import { ProductType } from '@/types/Product.type';
import AddBtn from '../AddBtn/AddBtn';
import Addwishlist from '../AddBtn/Addwishlist';


export default async function AllProducts() {
       const data = await getProducts()
    
  return (<>
   <div className=" container w-[80%] mx-auto my-12">


     <div className="flex flex-wrap">
   {data.map((currentProduct :ProductType) => (

   <div className=' w-full md:w-1/2 lg:w-1/4 xl:w-1/5 '  key={currentProduct.id} >
   <div className="prod p-4 ">
<Card className='gap-2 p-2'>
      <Link href={`/products/${currentProduct.id}`}>

          <CardHeader>

    <CardTitle>
      <Image src={currentProduct.imageCover} alt="" width={100} height={100} /></CardTitle>
    <CardDescription className='text-emerald-500'>{currentProduct.category.name}</CardDescription>
      </CardHeader>

  <CardContent>
    <p className='font-bold line-clamp-2'>{currentProduct.title}</p>
  </CardContent>
  <CardFooter>
    <div className="flex justify-between w-full">
<span>{currentProduct.price}EGP</span>
<span>{currentProduct.ratingsAverage}<i className='fas fa-star text-yellow-500'></i></span>
    </div>
  </CardFooter>
      </Link>
      <Addwishlist id={currentProduct.id}/>
      <AddBtn id={currentProduct.id}/>
    </Card>
     
    
   </div>

    </div>
  ))}
    </div>
    </div>
  </>  )
}
