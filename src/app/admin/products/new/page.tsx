import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import ProductForm from "@/components/ProductForm";

export default async function NewProductPage() {
  const session = await auth();

  if (!session?.user || session.user.role !== "admin") {
    redirect("/");
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-heading font-semibold text-taupe-800 mb-8">
        Add New Product
      </h1>
      <ProductForm />
    </div>
  );
}
