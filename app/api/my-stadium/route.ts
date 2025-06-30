import { connectToDB } from "@/utils/ConnectToDB";
import { NextResponse } from "next/server";
import Stadium from "@/models/StadiumSchema";

// Get Stadium
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const userId = url.searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "Missing user ID" }, { status: 400 });
    }

    await connectToDB();

    const myStadium = await Stadium.findOne({ owner: userId });

    return NextResponse.json(myStadium, { status: 200 });
  } catch (error) {
    console.error("Error fetching stadium:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}


// New Stadium
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { owner, ownerName } = body;

    if (!owner || !ownerName) {
      return NextResponse.json(
        { error: "Missing owner or owner name" },
        { status: 400 }
      );
    }

    await connectToDB();

    const existingStadium = await Stadium.findOne({ owner });
    if (existingStadium) {
      return NextResponse.json(
        { error: "You already have a stadium" },
        { status: 400 }
      );
    }

    const newStadium = await Stadium.create(body);

    return NextResponse.json(newStadium, { status: 201 });
  } catch (error) {
    console.error("Error creating stadium:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}


// Edit Stadium
export async function PUT(req: Request) {
  try {
    const url = new URL(req.url);
    const userId = url.searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "Missing user ID" }, { status: 400 });
    }

    const updatedData = await req.json();

    await connectToDB();

    const updatedStadium = await Stadium.findOneAndUpdate(
      { owner: userId },
      updatedData,
      { new: true }
    );

    if (!updatedStadium) {
      return NextResponse.json({ error: "Stadium not found" }, { status: 404 });
    }

    return NextResponse.json(updatedStadium, { status: 200 });
  } catch (error) {
    console.error("Error updating stadium:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
