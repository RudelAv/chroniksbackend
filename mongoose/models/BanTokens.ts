import mongoose from "mongoose";

const BanTokensSchema = new mongoose.Schema({
    AccessToken: {
        type: String,
        required: true,
    },
    RefreshToken: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
    },
});

export const BanTokensModel = mongoose.model("BanTokens", BanTokensSchema);
