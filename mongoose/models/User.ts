import mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    provider: {
        type: String,
        enum: ['email', 'google'],
    },
    image: {
        type: String,
        default: '',
    },
    bio: {
        type: String,
        default: '',
    },
    savedPosts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
    }],
}, {
    timestamps: true,
});

export const UserModel = mongoose.model("User", UserSchema);