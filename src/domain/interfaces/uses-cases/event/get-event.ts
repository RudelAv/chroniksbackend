export interface GetEventUseCase {
    getEventByCommunity(communityId: string): any;
    getEventByUser(communityId: string, eventId: string): any;
}