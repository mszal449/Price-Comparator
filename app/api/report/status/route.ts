import { connectDB } from "lib";
import { Shop, ShopReport } from "models";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();

  const shops: { _id: mongoose.ObjectId; name: string; url: string }[] =
    await Shop.find();

  const latestReport = await ShopReport.aggregate([
    {
      $sort: { created_at: -1 },
    },
    {
      $group: {
        _id: "$shop_id",
        latestReport: { $first: "$$ROOT" },
      },
    },
  ]);

  const reportsMap = new Map(
    latestReport.map((item) => [item._id, item.latestReport]),
  );

  const reports = shops.map((shop) => ({
    shop: {
      id: shop._id.toString(),
      name: shop.name,
      url: shop.url,
    },
    report: reportsMap.get(shop._id.toString()) || null,
  }));

  return NextResponse.json({ reports });
}
