import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
  const response = await axios.get("http://127.0.0.1:8000/product/price");
  const result = response.data;
  return NextResponse.json(result);
}
