
import Image from "next/image";
import React from "react";
import { ProductType } from "./../../types/Product.type";
import AddBtn from "../_components/AddBtn/AddBtn";
import getRealatedAllProducts from "@/orderallproducts/realatedallproducts.action";
import Link from "next/link";

export default async function AllOrder() {
  let relatedProducts:
    | { data: { _id: string; cartItems: { product: ProductType }[] }[] }
    | null = null;
  let error: string | null = null;

  try {
    relatedProducts = await getRealatedAllProducts();
    console.log("Orders Data:", relatedProducts);
  } catch (err) {
    error = "Failed to load orders. Please try again later.";
    console.error("Error fetching orders:", err);
  }

  // رجّعنا المنتجات ومعاها orderId
  const productsWithOrder =
    relatedProducts?.data?.flatMap((order) =>
      order.cartItems?.map((item) => ({
        ...item.product,
        orderId: order._id, // نخزن الـ orderId مع كل product
      }))
    ) || [];

  return (
    <div className="flex flex-wrap w-4/5 mx-auto p-4">
      {error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : productsWithOrder.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full">
          {productsWithOrder.map(
            (currentProduct: ProductType & { orderId: string }) => (
              <div
                key={currentProduct._id}
                className="border rounded-lg p-4 flex flex-col bg-white shadow-sm hover:shadow-md transition"
              >
                {/* Product Image */}
                <div className="relative h-48 w-full mb-3">
                  <Image
                    src={currentProduct.imageCover || "/fallback-image.jpg"}
                    alt={currentProduct.title || "Product image"}
                    fill
                    sizes="100%"
                    className="object-cover rounded-md"
                  />
                </div>

                {/* Product Info */}
                <div className="flex flex-col flex-grow">
                  <h3 className="text-lg font-bold mb-1 truncate">
                    {currentProduct.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {currentProduct.description}
                  </p>
                  <p className="text-emerald-600 my-2">
                    {currentProduct.category?.name || "Uncategorized"}
                  </p>

                  {/* Price & Rating */}
                  <div className="flex justify-between items-center my-3">
                    <span className="text-base font-semibold">
                      {currentProduct.price} EGP
                    </span>
                    <span className="flex items-center text-sm">
                      {currentProduct.ratingsAverage ?? "N/A"}
                      <svg
                        className="w-4 h-4 text-yellow-500 ml-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.97c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.54-1.118l1.287-3.97a1 1 0 00-.364-1.118L2.098 9.397c-.784-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.97z" />
                      </svg>
                    </span>
                  </div>

                  {/* Add to Cart */}
                  <AddBtn id={currentProduct._id} />

                  {/* زرار التفاصيل */}
                  <Link
                    href={`/orders/${currentProduct.orderId}?productId=${currentProduct._id}`}
                    className="mt-2 inline-block bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 transition text-center"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            )
          )}
        </div>
      ) : (
        <p className="text-center text-gray-500 w-full">No orders found.</p>
      )}
    </div>
  );
}

