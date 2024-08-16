import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const res = await fetch("http://localhost:3000/users");
  const users = await res.json();
  return NextResponse.json(users);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const res = await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      throw new Error("Failed to create user");
    }

    const newUser = await res.json();
    return NextResponse.json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    return new Response("Error creating user", { status: 500 });
  }
}
