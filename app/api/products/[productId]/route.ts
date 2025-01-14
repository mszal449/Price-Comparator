import { NextRequest, NextResponse } from "next/server";
import { Product } from "models/Product";
import { connectToMongoDB } from "lib";
import { IPrice } from "models/price";

function normalizeProductId(productId: string): string {
  return productId.replace(/\s+/g, "").trim().toUpperCase();
}

export async function GET(
  request: NextRequest,
  context: { params: { productId: string } },
) {
  await connectToMongoDB();
  console.log("here");
  const { searchParams } = new URL(request.url);
  const { productId } = await context.params;
  const preciseName = searchParams.get("preciseName") !== "false";
  const pageSize = parseInt(searchParams.get("pageSize") || "10", 10);
  const page = parseInt(searchParams.get("page") || "1", 10);
  // const offset = (page - 1) * pageSize;
  const normalizedId = normalizeProductId(productId);

  if (preciseName) {
    const product = await Product.findOne({ id: "JP-70CT001-00" });
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    return NextResponse.json({
      products: [
        {
          product_id: product.id,
          product_name: product.name,
          prices: product.prices.map((p: IPrice) => ({
            price: p.price,
            currency: p.currency,
            price_in_pln: p.price_in_pln,
            stock: p.stock,
            updated_at: p.updated_at,
            shop_name: p.shop_name,
            shop_id: p.shop_id,
          })),
        },
      ],
      totalCount: 1,
    });
  } else {
    const query = { id: normalizedId };
    const products = await Product.find(query)
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    if (!products.length) {
      return NextResponse.json({ error: "No products found" }, { status: 404 });
    }

    const totalCount = await Product.countDocuments(query);
    const result = products.map((product) => ({
      product_id: product.id,
      product_name: product.name,
      prices: product.prices.map((p: IPrice) => ({
        price: p.price,
        currency: p.currency,
        price_in_pln: p.price_in_pln,
        stock: p.stock,
        updated_at: p.updated_at,
        shop_name: p.shop_name,
        shop_id: p.shop_id,
      })),
    }));
    return NextResponse.json({
      products: result,
      totalCount,
    });
  }
}
