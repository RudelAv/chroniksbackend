import { User } from "../../../entities/User";

export interface SignUpOAuthUseCase {
    signUpOAuth(user: User): any;
}