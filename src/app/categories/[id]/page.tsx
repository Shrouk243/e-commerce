
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { CategoriesProductType } from "@/types/categories.type";
import { SubcategoryProductType } from "@/types/subcategory.type";
import Image from "next/image";

export default function CategoryDetails() {
  const params = useParams();
  const { id } = params;

  const [category, setCategory] = useState<CategoriesProductType | null>(null);
  const [subCategories, setSubCategories] = useState<SubcategoryProductType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategory() {
      try {
        const res = await fetch(
          `https://ecommerce.routemisr.com/api/v1/categories/${id}`
        );
        const data = await res.json();
        setCategory(data.data);

        const subRes = await fetch(
          `https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`
        );
        const subData = await subRes.json();
        setSubCategories(subData.data || []);
      } catch  {
      } finally{
        setLoading(false)
      }
    }

    if (id) fetchCategory();
  }, [id]);

  if (loading)
    return (
      <p className="text-center mt-10 text-gray-600">Loading category...</p>
    );

  if (!category)
    return (
      <p className="text-center mt-10 text-red-500">Category not found!</p>
    );

  return (
    <div className="w-4/5 mx-auto my-10">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-6">{category.name}</h1>
        <Image
          src={category.image}
          alt={category.name}
          className="w-64 h-64 object-contain mx-auto mb-6 border rounded-lg shadow"
          width={150}
          height={150}
        />
        <p className="mt-4 text-gray-600">Slug: {category.slug}</p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Subcategories
        </h2>
        {subCategories.length === 0 ? (
          <p className="text-center text-gray-500">No subcategories found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {subCategories.map((sub: SubcategoryProductType) => (
              <div
                key={sub._id}
                className="border rounded-lg shadow hover:shadow-lg p-6 flex flex-col items-center transition"
              >
                <h3 className="text-lg font-medium">{sub.name}</h3>
                <p className="text-sm text-gray-500 mt-2">{sub.slug}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}



