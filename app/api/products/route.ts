import { NextResponse } from "next/server";
import { Product } from "models";
import { IPrice } from "models/Price";
import { connectDB } from "lib";
import { IProduct } from "models/Product";

interface IMatcher {
  id?: string | { $regex: string; $options: string };
  $and?: Array<{
    "prices.shop_description": { $regex: string; $options: string };
  }>;
  "prices.0"?: { $exists: boolean };
}

function normalizeProductId(productId: string): string {
  return productId.replace(/\s+/g, "").trim().toUpperCase();
}

export async function GET(request: Request) {
  await connectDB();
  const { searchParams } = new URL(request.url);
  const productId = searchParams.get("id");
  const description = searchParams.get("description");
  const preciseName = searchParams.get("preciseName") !== "false";
  const pageSize = parseInt(searchParams.get("pageSize") || "10", 10);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const offset = (page - 1) * pageSize;

  const matchQuery: IMatcher = {};

  // Search by product ID if it's given
  if (productId) {
    const normalizedId = normalizeProductId(productId);
    matchQuery.id = preciseName
      ? normalizedId
      : { $regex: normalizedId, $options: "i" };
  }

  // Search by description if it's given
  if (description) {
    matchQuery.$and = [
      { "prices.shop_description": { $regex: description, $options: "i" } },
    ];
  }

  // Make sure that products have prices
  matchQuery["prices.0"] = { $exists: true };

  // Fetch products
  const productsResponse = await Product.aggregate([
    {
      $match: matchQuery,
    },
    {
      $sort: { created_at: 1 },
    },
    {
      $facet: {
        metadata: [{ $count: "totalCount" }],
        data: [{ $skip: offset }, { $limit: pageSize }],
      },
    },
  ]);

  const totalCount = productsResponse[0]?.metadata[0]?.totalCount || 0;
  const products = productsResponse[0]?.data || [];

  if (!products.length) {
    return NextResponse.json({ error: "No prices found" }, { status: 404 });
  }

  const result = products.map((product: IProduct) => ({
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
      shop_description: p.shop_description,
    })),
  }));
  return NextResponse.json({
    products: result,
    totalCount,
  });
}
