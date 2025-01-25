import { HistoryRepository } from "../../interfaces/repositories/history-repository";
import { GetUserHistoryUseCase } from "../../interfaces/uses-cases/history/get-viewed-post";

export class GetUserHistory implements GetUserHistoryUseCase {
    constructor(private historyRepository: HistoryRepository) {}

    async getUserHistory(user_id: string) {
        return this.historyRepository.getUserHistory(user_id);
    }
}