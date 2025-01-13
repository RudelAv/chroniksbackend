import { User } from "../../../entities/User";

export interface SignInEmailUseCase {
    signInEmail(user: User): any;
}