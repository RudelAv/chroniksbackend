export interface BanTokensRepository {
    banToken(refreshToken: string, accessToken: string): any;
}