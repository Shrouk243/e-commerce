"use client";
import { SubcategoryProductType } from "@/types/subcategory.type";
import { useEffect, useState } from "react";

export default function SubcategoryDetails({
  params,
}: {
  params: { subId: string };
}) {
  const [subcategory, setSubcategory] = useState<SubcategoryProductType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSubcategory() {
      try {
        const res = await fetch(
          `https://ecommerce.routemisr.com/api/v1/subcategories/${params.subId}`
        );
        console.log("mnnnn " , res);
        
        const data = await res.json();
        setSubcategory(data.data);
      } catch (err) {
        console.error("Error fetching subcategory details:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchSubcategory();
  }, [params.subId]);

  if (loading) return <p className="text-center mt-10">Loading subcategory...</p>;
  if (!subcategory) return <p className="text-center mt-10">Subcategory not found</p>;

  return (
    <div className="w-1/2 mx-auto mt-10 text-center border rounded-lg shadow p-6">
      <h1 className="text-3xl font-bold">{subcategory.name}</h1>
      <p className="mt-4 text-gray-600">ID: {subcategory._id}</p>
      <p className="mt-2 text-gray-500">Category ID: {subcategory.category}</p>
      <p className="mt-2 text-gray-500">Created At: {subcategory.createdAt}</p>
      <p className="mt-2 text-gray-500">Updated At: {subcategory.updatedAt}</p>
    </div>
  );
}
