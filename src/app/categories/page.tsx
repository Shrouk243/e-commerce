
"use client";

import { CategoriesProductType } from "@/types/categories.type";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<CategoriesProductType[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  async function fetchCategories(pageNumber: number) {
    setLoading(true);
    try {
      const res = await fetch(
        `https://ecommerce.routemisr.com/api/v1/categories?limit=6&page=${pageNumber}`,
        { cache: "no-store" }
      );
      const data = await res.json();

      setCategories(data.data || []);
    } catch (err) {
      console.error("Error fetching categories:", err);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCategories(page);
  }, [page]);

  return (
    <div className="w-4/5 mx-auto my-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Categories</h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading categories...</p>
      ) : categories.length === 0 ? (
        <p className="text-center text-gray-500">No categories found.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((cat: CategoriesProductType) => (
              <Link
                href={`/categories/${cat._id}`}
                key={cat._id}
                className="border rounded-lg shadow hover:shadow-lg p-6 flex flex-col items-center transition"
              >
                <Image
                  src={cat.image}
                  alt={cat.name}
                  className="w-32 h-32 object-contain mb-4"
                  width={150}
                 height={150}
                 />
                <h2 className="text-xl font-semibold">{cat.name}</h2>
              </Link>
            ))}
          </div>

          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span className="font-semibold">Page {page}</span>
            <button
              onClick={() => setPage((prev) => prev + 1)}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
