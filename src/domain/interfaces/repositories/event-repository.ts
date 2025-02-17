import { CommunityEvent } from "../../entities/Community";

export interface EventRepository {
    createEvent(communityId: string, event: CommunityEvent, userId: string): any;
    updateEvent(communityId: string, eventId: string, event: CommunityEvent): any;
    deleteEvent(communityId: string, eventId: string): any;
    getEventById(communityId: string, eventId: string): any;
    getEventsByCommunity(communityId: string): any;
    registerEvent(communityId: string, eventId: string, user: string): any;
    unregisterEvent(communityId: string, eventId: string, user: string): any;
}