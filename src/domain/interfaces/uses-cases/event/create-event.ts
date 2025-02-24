import { CommunityEvent } from "../../../entities/Community";

export interface CreateEventUseCase {
    createEvent(communityId: string, event: CommunityEvent, userId: string): any;
}   