import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../app/api/auth/[...nextauth]/route";
import User from "../../../models/user";
import {connectDB} from "../../../lib/dbconfig";

export async function GET() {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ wishlist: user.wishlist }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
