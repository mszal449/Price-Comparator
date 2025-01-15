import { connectDB } from "lib";
import { Raport } from "models";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();
  const raport = await Raport.find().sort({ created_at: -1 }).limit(1);
  console.log(raport);
  if (raport[0]) {
    return NextResponse.json({ raport: raport[0] });
  } else {
    return NextResponse.json(null);
  }
}
