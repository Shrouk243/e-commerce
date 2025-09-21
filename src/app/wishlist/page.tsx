
"use client"
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';
import getLoggedUserWishlist from '@/wishlistActions/getUserWishlist';
import RemoveItemFromWishlist from '@/wishlistActions/removeToWishlist';
import { WishlistContext } from '@/context/WishlistContext';
import { ProductType } from '@/types/Product.type';
import Image from 'next/image';

export default function Wishlist() {

   const contextwish = useContext(WishlistContext);
  
    if(!contextwish) throw new Error("Not Exist")
  const { numberofwishlistitem:_, setnumberofwishlistitem } = contextwish

  const [products, setProducts] = useState<ProductType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [disableRemove, setDisableRemove] = useState(false);

  async function fetchWishlist() {
    setIsLoading(true);
    try {
      const res = await getLoggedUserWishlist();

      if (res?.status === "success") {
        setProducts(res.data);
        setnumberofwishlistitem(res.count ?? res.data.length);
      } else {
        toast.error("Failed to fetch wishlist", { position: "top-center", duration: 3000 });
      }
    } catch {
      toast.error("Failed to load wishlist", { position: "top-center", duration: 3000 });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleRemoveFromWishlist(id: string) {
    setDisableRemove(true);
    try {
      const res = await RemoveItemFromWishlist(id);
      if (res?.status === "success") {
        const updatedProducts = products.filter(p => p.id !== id);
        setProducts(updatedProducts);
        setnumberofwishlistitem(updatedProducts.length);

        toast.success("Product removed successfully", { position: "top-center", duration: 3000 });
      } else {
        toast.error(res?.message ?? "Could not remove product", { position: "top-center", duration: 3000 });
      }
    } catch {
      toast.error("An error occurred while removing product", { position: "top-center", duration: 3000 });
    } finally {
      setDisableRemove(false);
    }
  }

  useEffect(() => { fetchWishlist(); }, []);

  if (isLoading) {
    return <h1 className='text-center text-3xl font-bold my-12 text-emerald-600'>Loading...</h1>;
  }

  return (
    <>
      {products.length > 0 ? (
        <div className='w-2/3 mx-auto my-12'>
    

          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <h1 className='text-2xl font-bold my-5 text-emerald-700 text-center'>
              Wishlist ({products.length} items)
            </h1>
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th className="px-16 py-3">Image</th>
                  <th className="px-6 py-3">Product</th>
                  <th className="px-6 py-3">Price</th>
                  <th className="px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="bg-white border-b hover:bg-gray-50">
                    <td className="p-4">
                      <Image
                        src={product.imageCover}
                        className="w-16 md:w-32"
                        alt={product.title}
                        width={150}
                        height={150}
                      />
                    </td>
                    <td className="px-6 py-4 font-semibold">{product.title}</td>
                    <td className="px-6 py-4 font-semibold">{product.price} EGP</td>
                    <td className="px-6 py-4">
                      <button
                        disabled={disableRemove}
                        onClick={() => handleRemoveFromWishlist(product.id)}
                        className='text-red-700 cursor-pointer font-semibold disabled:bg-slate-300 disabled:font-semibold disabled:rounded-2xl disabled:text-white disabled:p-3 '
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <h1 className='text-center text-3xl font-bold my-12 text-red-600'>
          No products added yet!
        </h1>
      )}
    </>
  )
}





