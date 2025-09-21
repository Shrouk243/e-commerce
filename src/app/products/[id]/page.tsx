import selectedProduct from '@/api/SelectedProduct';
import AddBtn from '@/app/_components/AddBtn/AddBtn';
import getRealatedProducts from '@/productcategoryactions/realatedProducts.action';
import React from 'react'
import { ProductType } from './../../../types/Product.type';
import Image from 'next/image';

export default async function ProductDetails({params} : {params : Promise<{id : string}>}) {
    const {id} = await params;

const data = await selectedProduct(id);

if(!data) return <h1>No Products Here</h1>

const RealatedProducts = await getRealatedProducts(data.category._id)

  return (
<>
<div className="container w-full lg:w-[60%] mx-auto p-4 flex">
<div className="w-1/4">
<div className="p-4">
<Image src={data.imageCover} className='w-full' alt="" 
width={150}
height={150}
/>
</div>
</div>
<div className="w-3/4">
<div className="p-4">
  <h1 className='text-2xl font-bold mb-2'>{data.title}</h1>
  <p>{data.description}</p>
  <p className='text-emerald-600 my-3'>{data.category.name}</p>
      <div className="flex justify-between w-full my-4">
<span>{data.price}EGP</span>
<span>{data.ratingsAverage}<i className='fas fa-star text-yellow-500'></i></span>
    </div>
    <AddBtn  id={data.id}/>
</div>
</div>

</div>






<div className="flex flex-wrap w-[80%] mx-auto p-4">
  {RealatedProducts?.data?.length > 0 ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {RealatedProducts.data.map((currentProduct: ProductType) => (
        <div
          key={currentProduct.id}
          className="border rounded-lg p-4 flex flex-col"
        >
          <div className="h-48">
            <Image
              src={currentProduct.imageCover}
              className="w-full h-full object-cover rounded-md"
              alt={currentProduct.title}
              width={150}
              height={150}
            />
          </div>
          <div className="p-4 flex flex-col">
            <h3 className="text-lg font-bold mb-2 truncate">{currentProduct.title}</h3>
            <p className="text-gray-600 text-sm line-clamp-2">{currentProduct.description}</p>
            <p className="text-emerald-600 my-2">{currentProduct.category.name}</p>
            <div className="flex justify-between w-full my-3">
              <span className="text-base">{currentProduct.price} EGP</span>
              <span className="flex items-center">
                {currentProduct.ratingsAverage}{' '}
                <i className="fas fa-star text-yellow-500 ml-1"></i>
              </span>
            </div>
            <AddBtn id={currentProduct.id} />
          </div>
        </div>
      ))}
    </div>
  ) : (
    <p className="text-center text-gray-500">No related products found.</p>
  )}
</div>










</>

  )
}
