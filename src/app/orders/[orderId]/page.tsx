
"use client";

import { use, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { CartItem, OrderProductType } from './../../../types/order.type';

export default function OrderDetailsPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = use(params);
  const searchParams = useSearchParams();
  const productId = searchParams.get("productId"); 
  const [order, setOrder] = useState<OrderProductType | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  async function getOrderDetails(orderId: string) {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/orders?_id=${orderId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch order details");
    }

    const data = await res.json();
    setOrder(data?.data?.[0] || null);
    setLoading(false);
  }

  useEffect(() => {
    getOrderDetails(orderId);
  }, [orderId]);

  if (loading) return <p className="text-center">Loading...</p>;

  if (!order) return <p className="text-center text-red-500">Order not found</p>;

  const selectedItem = order.cartItems.find(
    (item: CartItem) => item.product._id === productId
  );

  if (!selectedItem) {
    return <p className="text-center text-red-500">Product not found in this order</p>;
  }

  return (
    <div className="w-4/5 mx-auto mt-10 p-4 border rounded">
      <h1 className="text-3xl font-bold mb-4 text-center">Product Details</h1>

      <div className="border rounded p-4 flex flex-col items-center gap-4">
        <Image
          src={selectedItem.product.imageCover}
          alt={selectedItem.product.title}
          width={250}
          height={250}
          className="object-cover rounded"
        />
        <h3 className="font-semibold text-xl">{selectedItem.product.title}</h3>
        <h4>Quantity: {selectedItem._id}</h4>
        <p>Quantity: {selectedItem.count}</p>
        <p>Price: {selectedItem.price} EGP</p>
      </div>
    </div>
  );
}

