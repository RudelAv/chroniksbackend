export interface RegisterUnregisterEventUseCase {
    registerEvent(communityId: string, eventId: string, user: string): any
    unregisterEvent(communityId: string, eventId: string, user: string): any

}