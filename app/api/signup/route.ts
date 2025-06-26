import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/ConnectToDB";
import User from "@/models/UserSchema";

import isEmail from "validator/lib/isEmail";

export async function POST(req: Request) {
  try {
    const { name, email, phone, password } = await req.json();
    await connectToDB();

    if (!name || !email || !phone || !password) {
      return NextResponse.json(
        { message: "Please fill out all fields." },
        { status: 400 }
      );
    }

    if(name.trim().length < 5) {
      return NextResponse.json({ message: "Name must be at least 5 characters long." }, {status : 400});
    }

    if(password.trim().length < 8) {
      return NextResponse.json({ message: "Password must be at least 8 characters long." }, {status : 400});
    }

    if (!isEmail(email)) {
      return NextResponse.json({ message: "Invalid email format." }, {status : 400});
    }

    if (isNaN(phone)) {
      return NextResponse.json({ message: "Invalid phone number." }, {status : 400});
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 }
      );
    }

    const newUser = await User.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      password: password,
      role: "user",
    });

    return NextResponse.json(
      { message: "User added successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Add user error:", error);
    return NextResponse.json(
      { message: "Something went wrong..." },
      { status: 500 }
    );
  }
}
