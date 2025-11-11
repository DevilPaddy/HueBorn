import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "../../../../lib/dbconfig";
import Product from "../../../../models/products";
import cloudinary from "../../../../lib/cloudinary";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const { id } = await params;
    if (!id) {
      return NextResponse.json(
        { success: false, error: "No ID provided" },
        { status: 400 }
      );
    }

    const formData = await req.formData();
    const existingProduct = await Product.findById(id);

    if (!existingProduct) {
      return NextResponse.json(
        { success: false, error: "Product not found" },
        { status: 404 }
      );
    }

    const updateData: any = {};

    const name = formData.get("name") as string | null;
    if (name) {
      updateData.name = name;
    }

    const description = formData.get("description") as string | null;
    if (description) {
      updateData.description = description;
    }

    const category = formData.get("category") as string | null;
    if (category) {
      updateData.category = category;
    }

    const path = formData.get("path") as string | null;
    if (path) {
      updateData.path = path;
    }

    const url = formData.get("url") as string | null;
    if (url) {
      updateData.url = url;
    }

    const price = formData.get("price") as string | null;
    if (price) {
      updateData.price = parseFloat(price);
    }

    const file = formData.get("file") as File | null;
    if (file) {
      if (existingProduct.cloudinaryId) {
        await cloudinary.uploader.destroy(existingProduct.cloudinaryId);
      }

      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const uploadResult: any = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "products",
            resource_type: "image",
          },
          (error, result) => {
            if (error) {
              console.error("Cloudinary upload error:", error);
              return reject(new Error("Cloudinary upload failed"));
            }
            resolve(result);
          }
        );
        stream.end(buffer);
      });

      updateData.image = uploadResult.secure_url;
      updateData.cloudinaryId = uploadResult.public_id;
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    return NextResponse.json(
      { success: true, data: updatedProduct },
      { status: 200 }
    );
  } catch (error) {
    console.error("UPDATE_PRODUCT_ERROR", error);
    const errorMessage = error instanceof Error ? error.message : "Server Error";
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const { id } = await params;
    if (!id) {
      return NextResponse.json(
        { success: false, error: "No ID provided" },
        { status: 400 }
      );
    }

    const product = await Product.findById(id);
    if (!product) {
      return NextResponse.json(
        { success: false, error: "Product not found" },
        { status: 404 }
      );
    }

    if (product.cloudinaryId) {
      await cloudinary.uploader.destroy(product.cloudinaryId);
    }

    await Product.findByIdAndDelete(id);

    return NextResponse.json(
      { success: true, message: "Product deleted" },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE_PRODUCT_ERROR", error);
    const errorMessage = error instanceof Error ? error.message : "Server Error";
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}