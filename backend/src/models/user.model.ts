import mongoose from 'mongoose';
import type { IUser } from "../types/user.types";


const userSchema = new mongoose.Schema<IUser>(
    {
        username:{
            type: String,
            required: true,
            unique: true,
        },
        email:{
            type: String,
            required: true,
            unique: true,
        },
        password:{
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
    }
)

const userModel = mongoose.model('IUser', userSchema);

export default userModel;