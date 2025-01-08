import { NextRequest, NextResponse } from "next/server";
import fetchProductPrices from "services/priceService";
import { ISearchOptions, FetchError } from "types";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const productId = searchParams.get("productId") || "";
  const preciseName = searchParams.get("preciseName") === "true";
  const onlyAvailable = searchParams.get("onlyAvailable") === "true";
  const page = Number(searchParams.get("page") || 1);
  const pageSize = Number(searchParams.get("pageSize") || 10);

  const searchOptions: ISearchOptions = {
    preciseName,
    onlyAvailable,
    page,
    pageSize,
    totalCount: 0,
  };

  try {
    const response = await fetchProductPrices(productId, searchOptions);
    if (response.status === 404) {
      return NextResponse.json(response.data, { status: 404 });
    }

    if (!response.data) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(response.data);
  } catch (error) {
    const fetchError = error as FetchError;
    if (fetchError.status && fetchError.status === 404) {
      return NextResponse.json(
        { error: fetchError.message || "Product not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { error: "Error fetching product prices" },
      { status: 500 },
    );
  }
}
