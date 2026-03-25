import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const texture = searchParams.get("texture");
    const method = searchParams.get("method");
    const category = searchParams.get("category");

    const where: Record<string, string> = {};
    if (texture) where.texture = texture;
    if (method) where.method = method;
    if (category) where.category = category;

    const products = await prisma.product.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(products);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const count = await prisma.product.count();
    await prisma.product.deleteMany();

    return NextResponse.json({ message: `Deleted ${count} products` });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete products" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { name, description, price, image, images, category, length, color, texture, method, inStock, featured } = body;

    if (!name || !description || price == null) {
      return NextResponse.json(
        { error: "Name, description, and price are required" },
        { status: 400 }
      );
    }

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(String(price)),
        image: image || "",
        images: images || "[]",
        category: category || "Wig",
        length: length || "",
        color: color || "",
        texture: texture || "",
        method: method || "",
        inStock: inStock ?? true,
        featured: featured ?? false,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}
