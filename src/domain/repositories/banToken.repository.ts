import { BanTokensRepository } from "../interfaces/repositories/banToken-repository";
import { BanTokensModel } from "../../../mongoose/models/BanTokens";

export class BanTokensRepositoryImplementation implements BanTokensRepository {
    async banToken(refreshToken: string, accessToken: string) {
        try {
            const result = await BanTokensModel.create({
                AccessToken: accessToken,
                RefreshToken: refreshToken,
                createdAt: new Date(),
            });
            return ("Deconnexion reussi" + result);
        } catch (error: any) {
            console.log("error", error);
            return error;
        }
    }
}