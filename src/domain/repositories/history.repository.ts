import { HistoryRepository } from "../interfaces/repositories/history-repository";
import { UserHistoryModel } from "../../../mongoose/models/UserHistory";

export class HistoryRepositoryImplementation implements HistoryRepository {
    async getUserHistory(user_id: string) {
        try {
            return await UserHistoryModel.find({ user: user_id });
        } catch (error: any) {
            return error.code;
        }
    }
    
}