import { BanTokensModel } from "../../../mongoose/models/BanTokens";

export async function verifyBanToken(token: string, typeTokenn: string) {
    switch (typeTokenn) {
        case "accessToken":
            const banToken = await BanTokensModel.findOne({ AccessToken: token });
            if (banToken) {
                return true;
            } else {
                return false;
            }
        case "refreshToken":
            const banToken2 = await BanTokensModel.findOne({ RefreshToken: token });
            if (banToken2) {
                return true;
            } else {
                return false;
            }
        default:
            break;
    }
}
    
