import { EventRepository } from "../../interfaces/repositories/event-repository";
import { GetEventUseCase } from "../../interfaces/uses-cases/event/get-event";

export class GetEventUseCaseImplementation implements GetEventUseCase {

    constructor(private readonly eventRepository: EventRepository) {}
    async getEventByCommunity(communityId: string) {
        return this.eventRepository.getEventsByCommunity(communityId);
    }
    async getEventByUser(communityId: string, eventId: string) {
        return this.eventRepository.getEventById(communityId, eventId);
    }
}