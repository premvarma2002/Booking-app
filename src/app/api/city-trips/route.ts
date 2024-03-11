// @ts-nocheck

import { prisma } from "@/lib";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const city = searchParams.get("city");
    if (city) {
      const allTrips = await prisma.trips.findMany();
      const filteredTrips = allTrips.filter((trip) => {
        const destinationItinerary = trip.destinationItinerary || [];
        return destinationItinerary.some(
          (destination) =>
            destination.place.toLowerCase() === city.toLowerCase()
        );
      });
      if (filteredTrips) {
        return NextResponse.json({ trips: filteredTrips }, { status: 200 });
      } else {
        return NextResponse.json(
          { message: "Trip not found." },
          { status: 404 }
        );
      }
    } else {
        return NextResponse.json(
            { message: "City is required." },
            { status: 400 }
          );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
