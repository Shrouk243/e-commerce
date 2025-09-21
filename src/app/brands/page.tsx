
import { BrandProductType } from "@/types/brand.type";
import Image from "next/image";
import Link from "next/link";

export default async function BrandsPage() {
  const res = await fetch("https://ecommerce.routemisr.com/api/v1/brands?limit=10");
  const data = await res.json();

  const brands = data.data || [];

  return (
    <div className="w-4/5 mx-auto my-10">
      <h1 className="text-3xl font-bold mb-6 text-center">All Brands</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {brands.map((brand: BrandProductType) => (
          <Link
            href={`/brands/${brand._id}`}  
            key={brand._id}
            className="border rounded-lg shadow hover:shadow-lg p-4 flex flex-col items-center transition"
          >
            <Image
              src={brand.image}
              alt={brand.name}
              className="w-28 h-28 object-contain mb-4"
              width={150}
              height={150}
            />
            <h2 className="text-lg font-semibold">{brand.name}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}
