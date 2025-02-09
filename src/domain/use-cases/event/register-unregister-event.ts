import { EventRepository } from "../../interfaces/repositories/event-repository";
import { RegisterUnregisterEventUseCase } from "../../interfaces/uses-cases/event/register-unregister-event";

export class RegisterUnregisterEventUseCaseImplementation implements RegisterUnregisterEventUseCase {

    constructor(private readonly eventRepository: EventRepository) {}
    async registerEvent(communityId: string, eventId: string, user: string) {
        return await this.eventRepository.registerEvent(communityId, eventId, user)
    }
    async unregisterEvent(communityId: string, eventId: string, user: string) {
        return await this.eventRepository.unregisterEvent(communityId, eventId, user)
    }
}