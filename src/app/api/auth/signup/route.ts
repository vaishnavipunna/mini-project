import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

// Create User
export async function POST(request: Request) {
  try {
    await connectToDatabase();

    const body = await request.json();
    const { name, email, password } = body;

    if (!name || typeof name !== "string") {
      return NextResponse.json(
        { message: "Name is required and must be a string" },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { message: "Email is required and must be a string" },
        { status: 400 }
      );
    }

    if (!password || typeof password !== "string") {
      return NextResponse.json(
        { message: "Password is required and must be a string" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User with this email already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await hash(password, 10);

    // Save to DB
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
      console.error("Failed to create user:", error);

      // include the original error message where possible for easier debugging
      const msg = error instanceof Error ? error.message : String(error);

      return NextResponse.json(
        { message: "Failed to create user", error: msg },
        { status: 500 }
      );
  }
}
