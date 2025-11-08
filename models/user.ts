import mongoose, { Schema, Document, models } from 'mongoose'

export interface IUser extends Document {
    name: string
    email: string
    password: string
}

const UserSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        wishlist: [
            {
                productId: { type: String, required: true },
                productName: { type: String, required: true },
                productUrl: {type: String, required: true},
                productImage: { type: String },
            },
        ],
        isAdmin: { type: Boolean, required: true, default: false }
    },
    { timestamps: true }
)

const User = models.User || mongoose.model<IUser>('User', UserSchema)
export default User
