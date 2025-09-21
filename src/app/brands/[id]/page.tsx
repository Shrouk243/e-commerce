
"use client";
import { BrandProductType } from "@/types/brand.type";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function BrandDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const [brand, setBrand] = useState<BrandProductType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBrand() {
      try {
        const { id } = await params; 
        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/brands/${id}`);
        const data = await res.json();
        setBrand(data.data);
      } catch (err) {
        console.error("Error fetching brand details:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchBrand();
  }, [params]);

  if (loading) return <p className="text-center mt-10">Loading brand details...</p>;
  if (!brand) return <p className="text-center mt-10">Brand not found</p>;

  return (
    <div className="w-full flex justify-center mt-12">
      <div className="max-w-md w-full bg-white shadow-lg rounded-2xl p-6 text-center">
        <Image
          src={brand.image}
          alt={brand.name}
          className="w-40 h-40 object-contain mx-auto mb-6"
           width={150}
           height={150}
        />
        <h1 className="text-3xl font-bold">{brand.name}</h1>
        <p className="mt-2 text-gray-500">Slug: {brand.slug}</p>
        <p className="mt-2 text-gray-500">Created At: {new Date(brand.createdAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
}
