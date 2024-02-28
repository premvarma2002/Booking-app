import { prisma } from "@/lib";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const trips = await prisma.trips.findMany({
      orderBy: { scrappedOn: "desc" },
    });
    if (trips) return NextResponse.json({ trips }, { status: 200 });
    else
      return NextResponse.json({ message: "No trips found" }, { status: 404 });
  } catch (error) {
    return NextResponse.json(
      { message: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
