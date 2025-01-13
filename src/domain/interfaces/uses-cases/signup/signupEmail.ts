import { User } from "../../../entities/User";

export interface SignUpEmailUseCase {
    signUpEmail(user: User): any;
}