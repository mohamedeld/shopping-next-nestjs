import { CreateProductDialog } from "@/components/forms/create-product-form";
import { ProductGrid } from "@/components/ProudctList";
import { getProducts } from "@/server/get-product-action";

export default async function Home() {
  const products = await getProducts();
  return (
    <div className="relative">
      <CreateProductDialog />
      <div className="container max-w-7xl mx-auto py-10">
        <ProductGrid products={products} />
      </div>
    </div>
  );
}
