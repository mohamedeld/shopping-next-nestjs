import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IProduct } from "@/interfaces/product.interface";

export function ProductGrid({ products }: { products: IProduct[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products?.map((product) => (
        <Card
          key={product.id}
          className="flex h-full flex-col transition-shadow hover:shadow-lg"
        >
          <CardHeader>
            <CardTitle className="line-clamp-1">{product.name}</CardTitle>
          </CardHeader>

          <CardContent className="flex flex-1 flex-col">
            <p className="mb-4 line-clamp-3 text-sm text-muted-foreground">
              {product.description}
            </p>

            <div className="mt-auto">
              <span className="text-xl font-bold">
                ${product.price.toFixed(2)}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
