import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import DeleteAllButton from "./DeleteAllButton";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const session = await auth();

  if (!session?.user || session.user.role !== "admin") {
    redirect("/");
  }

  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h1 className="text-3xl font-heading font-semibold text-taupe-800">
          Manage Products
        </h1>
        <div className="flex items-center gap-3">
          {products.length > 0 && <DeleteAllButton count={products.length} />}
          <Link
            href="/admin/products/new"
            className="bg-taupe-400 text-white px-6 py-2 rounded-sm hover:bg-taupe-500 transition-colors"
          >
            + Add New Product
          </Link>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-lg border border-taupe-200">
          <p className="text-taupe-500 text-lg mb-4">No products yet</p>
          <Link
            href="/admin/products/new"
            className="text-taupe-500 hover:text-taupe-700 font-medium"
          >
            Add your first product →
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-taupe-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-taupe-50 border-b border-taupe-200">
              <tr>
                <th className="text-left px-6 py-3 text-sm font-medium text-taupe-600">
                  Product
                </th>
                <th className="text-left px-6 py-3 text-sm font-medium text-taupe-600">
                  Category
                </th>
                <th className="text-left px-6 py-3 text-sm font-medium text-taupe-600">
                  Price
                </th>
                <th className="text-left px-6 py-3 text-sm font-medium text-taupe-600">
                  Status
                </th>
                <th className="text-right px-6 py-3 text-sm font-medium text-taupe-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-taupe-200">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-taupe-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="font-medium text-taupe-800">
                        {product.name}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-taupe-600">
                    {product.category}
                  </td>
                  <td className="px-6 py-4 text-sm text-taupe-800 font-medium">
                    ${product.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        product.inStock
                          ? "bg-green-50 text-green-700"
                          : "bg-red-50 text-red-700"
                      }`}
                    >
                      {product.inStock ? "In Stock" : "Sold Out"}
                    </span>
                    {product.featured && (
                      <span className="text-xs px-2 py-1 rounded-full bg-blush-50 text-blush-700 ml-1">
                        Featured
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/admin/products/${product.id}/edit`}
                      className="text-blush-600 hover:text-blush-500 text-sm font-medium mr-4"
                    >
                      Edit
                    </Link>
                    <DeleteButton productId={product.id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function DeleteButton({ productId }: { productId: string }) {
  return (
    <form
      action={async () => {
        "use server";
        const session = await auth();
        if (session?.user?.role === "admin") {
          await prisma.product.delete({ where: { id: productId } });
        }
        const { redirect: redir } = await import("next/navigation");
        redir("/admin/products");
      }}
      className="inline"
    >
      <button
        type="submit"
        className="text-red-600 hover:text-red-700 text-sm font-medium"
      >
        Delete
      </button>
    </form>
  );
}
