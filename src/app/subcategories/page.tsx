import { SubcategoryProductType } from "@/types/subcategory.type";
import Link from "next/link";

export default async function SubcategoriesPage() {
  const res = await fetch("https://ecommerce.routemisr.com/api/v1/subcategories", {
    cache: "no-store",
  });

  console.log("my cot" , res);
  
  const data = await res.json();

  const subcategories = data.data || [];

  return (
    <div className="w-4/5 mx-auto my-10">
      <h1 className="text-3xl font-bold mb-6 text-center">All Subcategories</h1>

      {subcategories.length === 0 ? (
        <p className="text-center text-gray-500">No subcategories found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subcategories.map((sub: SubcategoryProductType) => (
            <Link
              href={`/subcategories/${sub._id}`}
              key={sub._id}
              className="border rounded-lg shadow hover:shadow-lg p-6 flex flex-col items-center transition"
            >
              <h2 className="text-xl font-semibold">{sub.name}</h2>
              <p className="text-gray-500 text-sm mt-2">Category: {sub.category}</p>
              <p className="text-gray-500 text-sm mt-2"> {sub.slug}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
