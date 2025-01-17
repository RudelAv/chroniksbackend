import { BanTokensRepository } from "../../interfaces/repositories/banToken-repository";
import { BanTokenUseCase } from "../../interfaces/uses-cases/banToken/createBanToken";

export class BanToken implements BanTokenUseCase {
    constructor(private banTokenRepository: BanTokensRepository) {}
    async banToken(refreshToken: string, accessToken: string) {
        return this.banTokenRepository.banToken(refreshToken, accessToken);
    }
}