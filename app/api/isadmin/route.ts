import { NextResponse } from "next/server";
import { getServerSession } from "next-auth"; 
import { authOptions } from "../../api/auth/[...nextauth]/route"; 
import User from "../../../models/user"; 
import { connectDB } from "../../../lib/dbconfig"; 

export async function GET() {
  try {
    await connectDB();

    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ isAdmin: false }, { status: 401 });
    }

    const user = await User.findOne({ email: session.user.email }).select("isAdmin");

    if (!user || !user.isAdmin) {
      return NextResponse.json({ isAdmin: false }, { status: 403 });
    }

    return NextResponse.json({ isAdmin: true }, { status: 200 });
  } catch (error) {
    console.error("Admin check failed:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
