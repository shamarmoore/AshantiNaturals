"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DeleteAllButton({ count }: { count: number }) {
  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const res = await fetch("/api/products", { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      router.refresh();
    } catch {
      alert("Failed to delete products. Please try again.");
    } finally {
      setDeleting(false);
      setConfirming(false);
    }
  };

  if (confirming) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm text-red-700">
          Delete all {count} products?
        </span>
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="bg-red-600 text-white px-4 py-2 rounded-md text-sm hover:bg-red-700 transition-colors disabled:opacity-50"
        >
          {deleting ? "Deleting..." : "Yes, Delete All"}
        </button>
        <button
          onClick={() => setConfirming(false)}
          disabled={deleting}
          className="border border-taupe-300 text-taupe-600 px-4 py-2 rounded-sm text-sm hover:bg-taupe-50 transition-colors"
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      className="border border-red-300 text-red-600 px-4 py-2 rounded-md text-sm hover:bg-red-50 transition-colors"
    >
      Delete All Products
    </button>
  );
}
