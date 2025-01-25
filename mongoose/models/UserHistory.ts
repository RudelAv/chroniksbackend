import mongoose from 'mongoose';

const UserHistorySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    viewedPosts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
    }],
    likedPosts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
    }],
    searchHistory: [{
        type: String,
        required: true,
    }],
    lastAccessed: {
        type: Date,
        default: Date.now,
    },
}, {
    timestamps: true,
});

export const UserHistoryModel = mongoose.model("UserHistory", UserHistorySchema);