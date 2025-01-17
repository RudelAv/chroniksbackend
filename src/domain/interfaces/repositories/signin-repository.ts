import { User } from "../../entities/User";

export interface SignInRepository {
    signInEmail(user: User): any;
}