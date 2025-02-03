import mongoose from 'mongoose';

const CommunitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        default: '',
    },
    category: {
        type: String,
        default: '',
    },
    image: {
        type: String,
        default: '',
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    admins: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    // Messages dans la communauté
    messages: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        likes: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }],
        createdAt: {
            type: Date,
            default: Date.now,
        },
        updatedAt: {
            type: Date,
            default: Date.now,
        },
    }],
    // Événements et calendrier
    events: [{
        title: {
            type: String,
            required: true,
        },
        description: String,
        date: {
            type: Date,
            required: true,
        },
        location: {
            type: {
                type: String,
                enum: ['online', 'physical'],
                default: 'online',
            },
            address: String, // URL ou adresse physique
        },
        organizer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        image: String,
        registrations: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }],
        tags: [String],
        comments: [{
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true,
            },
            content: {
                type: String,
                required: true,
            },
            createdAt: {
                type: Date,
                default: Date.now,
            },
        }],
        createdAt: {
            type: Date,
            default: Date.now,
        },
        updatedAt: {
            type: Date,
            default: Date.now,
        },
    }],
    // Posts généraux de la communauté
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
    }],
    deleted: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});

export const CommunityModel = mongoose.model("Community", CommunitySchema);