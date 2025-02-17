import { CommunityModel } from "../../../mongoose/models/Communities";
import { CommunityEvent } from "../entities/Community";
import { EventRepository } from "../interfaces/repositories/event-repository";

export class EventRepositoryImplementation implements EventRepository {
    async registerEvent(communityId: string, eventId: string, userId: string) {
        try {
            const updatedCommunity = await CommunityModel.findOneAndUpdate(
                { _id: communityId, "events._id": eventId }, 
                { $addToSet: { "events.$.registrations": userId } }, 
                { new: true, runValidators: true }
            ).lean();
    
            if (!updatedCommunity) {
                throw new Error("Community or event not found.");
            }
    
            return updatedCommunity;
        } catch (error: any) {
            console.error("Error registering for event:", error);
            return error.code;
        }
    }
    
    async unregisterEvent(communityId: string, eventId: string, user: string) {
        try {
            return await CommunityModel.findByIdAndUpdate(
                communityId,
                { $pull: { "events.$.registrations": user } },
                { new: true, runValidators: true }
            ).lean();
        } catch (error: any) {
            console.error("Error unregistering for event:", error);
            return error.code;
        }
    }
    async createEvent(communityId: string, event: CommunityEvent, userId: string) {
        try {
            const community = await CommunityModel.findById(communityId);
            
            if (!community?.admins.some(admin => admin.toString() === userId.toString())) {
                return 'P2025';
            }

            return await CommunityModel.findByIdAndUpdate(
                communityId,
                { $push: { events: event } },
                { new: true, runValidators: true }
            ).lean();
        } catch (error: any) {
            console.error("Error creating event:", error);
            return error.code;
        }
    }
    
    async updateEvent(communityId: string, eventId: string, event: CommunityEvent) {
        try {
            return await CommunityModel.findByIdAndUpdate(
                communityId,
                { $set: { "events.$[event]": event } },
                { arrayFilters: [{ "event._id": eventId }], new: true, runValidators: true }
            ).lean();
        } catch (error: any) {
            console.error("Error updating event:", error);
            return error.code;
        }
    }
    deleteEvent(communityId: string, eventId: string) {
        throw new Error("Method not implemented.");
    }
    async getEventById(communityId: string, eventId: string) {
        try {
            return await CommunityModel.findById(communityId).lean();
        } catch (error: any) {
            console.error("Error getting event:", error);
            return error.code;
        }
    }
    async getEventsByCommunity(communityId: string) {
        try {
            return await CommunityModel.findById(communityId).lean();
        } catch (error: any) {
            console.error("Error getting events:", error);
            return error.code;
        }
    }
}