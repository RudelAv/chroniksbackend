import { User } from "../../entities/User";

export interface SignUpRepository {
    signUpEmail(user: User): any;
}