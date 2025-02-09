import { CommunityEvent } from "../../entities/Community";
import { CreateEventUseCase } from "../../interfaces/uses-cases/event/create-event";
import { EventRepository } from "../../interfaces/repositories/event-repository";

export class CreateEventUseCaseImplementation implements CreateEventUseCase {

    constructor(private readonly eventRepository: EventRepository) {}
    async createEvent(communityId: string, event: CommunityEvent) {
        return this.eventRepository.createEvent(communityId, event);
    }
    
}