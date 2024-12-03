import { NextRequest, NextResponse } from "next/server";
import { connectToMongoDB } from "../../../../lib/mongodb";
import User from "../../../../models/User";

export async function POST(req: NextRequest) {
  try {
    await connectToMongoDB();
    const { email } = await req.json();
    const user = await User.findOne({ email }).select("_id");
    return NextResponse.json({ user });
  } catch (error) {
    console.log(error);
  }
}
