import { NextResponse } from "next/server";
import { Product } from "models";
import { IPrice } from "models/Price";
import { connectDB } from "lib";
import { IProduct } from "models/Product";

function normalizeProductId(productId: string): string {
  return productId.replace(/\s+/g, "").trim().toUpperCase();
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ productId: string }> },
) {
  await connectDB();
  const { searchParams } = new URL(request.url);
  const preciseName = searchParams.get("preciseName") !== "false";
  const pageSize = parseInt(searchParams.get("pageSize") || "10", 10);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const offset = (page - 1) * pageSize;

  const productId = (await params).productId;
  const normalizedId = normalizeProductId(productId);

  if (preciseName) {
    const product = await Product.findOne({ id: normalizedId });
    if (!product) {
      return NextResponse.json({ error: "Prices not found" }, { status: 404 });
    }
    if (product.prices.length < 1) {
      return NextResponse.json({ error: "Prices not found" }, { status: 404 });
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
            shop_description: p.shop_description,
          })),
        },
      ],
      totalCount: 1,
    });
  } else {
    const productsResponse = await Product.aggregate([
      {
        $match: {
          id: { $regex: normalizedId, $options: "i" },
          "prices.0": { $exists: true },
        },
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
}
