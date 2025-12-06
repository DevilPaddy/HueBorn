import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../api/auth/[...nextauth]/route";
import { connectDB } from "../../../../lib/dbconfig";
import User from "../../../../models/user";

// 🟢 GET: Fetch all wishlist items
export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
    }

    await connectDB();
    const user = await User.findOne({ email: session.user.email });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ wishlist: user.wishlist }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching wishlist" }, { status: 500 });
  }
}

// 🔵 POST: Add an item to wishlist
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
    }

    const { productId, productName, productUrl, productImage } = await req.json();

    if (!productId) {
      return NextResponse.json({ message: "Product ID is required" }, { status: 400 });
    }

    await connectDB();
    
    // Check if item exists to prevent duplicates
    const user = await User.findOne({ email: session.user.email });
    const exists = user.wishlist.some((item: any) => item.productId === productId);

    if (exists) {
      return NextResponse.json({ message: "Item already in wishlist" }, { status: 409 });
    }

    // Add item
    await User.findOneAndUpdate(
      { email: session.user.email },
      { 
        $push: { 
          wishlist: { productId, productName, productUrl, productImage } 
        } 
      }
    );

    return NextResponse.json({ message: "Added to wishlist" }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ message: "Error adding item" }, { status: 500 });
  }
}

// 🔴 DELETE: Remove an item from wishlist
export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
    }

    const { productId } = await req.json();

    if (!productId) {
      return NextResponse.json({ message: "Product ID required" }, { status: 400 });
    }

    await connectDB();

    await User.findOneAndUpdate(
      { email: session.user.email },
      { $pull: { wishlist: { productId: productId } } }
    );

    return NextResponse.json({ message: "Removed from wishlist" }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ message: "Error deleting item" }, { status: 500 });
  }
}