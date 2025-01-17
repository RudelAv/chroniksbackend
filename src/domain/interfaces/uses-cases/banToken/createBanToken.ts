export interface BanTokenUseCase {
    banToken(refreshToken: string, accessToken: string): any
}