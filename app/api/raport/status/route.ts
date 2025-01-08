import { NextResponse } from "next/server";
import { fetchReportStatus } from "../../../../services/raportService";

export async function GET() {
  try {
    const raport = await fetchReportStatus();
    return NextResponse.json(raport);
  } catch (error) {
    console.error("Error fetching report status", error);
    return NextResponse.json(
      { error: "Error fetching report status" },
      { status: 500 },
    );
  }
}
