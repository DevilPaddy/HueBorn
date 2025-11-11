import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "../../../lib/dbconfig";
import Product from "../../../models/products";
import cloudinary from "../../../lib/cloudinary";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectDB();
    const products = await Product.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: products }, { status: 200 });
  } catch (error) {
    console.error("GET_PRODUCTS_ERROR", error);
    return NextResponse.json(
      { success: false, error: "Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const formData = await req.formData();

    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const category = formData.get("category") as string;
    const path = formData.get("path") as string;
    const url = formData.get("url") as string;
    const image = formData.get("file") as File | null; 

    if (!name || !description || !category || !path || !url || !image) {
      return NextResponse.json(
        { success: false, error: "All fields are required" },
        { status: 400 }
      );
    }

    const arrayBuffer = await image.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResult: any = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "hueborn/products", 
          resource_type: "image",
        },
        (error, result) => {
          if (error) {
            console.error("Cloudinary upload error:", error);
            return reject(new Error("Image upload to Cloudinary failed."));
          }
          resolve(result);
        }
      );
      stream.end(buffer);
    });

    const newProduct = await Product.create({
      name,
      description,
      category,
      path,
      url,
      image: uploadResult.secure_url,
      cloudinaryId: uploadResult.public_id,
    });

    return NextResponse.json(
      { success: true, product: newProduct },
      { status: 201 }
    );
  } catch (error) {
    console.error("UPLOAD_PRODUCT_ERROR", error);
    
    const errorMessage = error instanceof Error ? error.message : "Upload failed";
    
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}