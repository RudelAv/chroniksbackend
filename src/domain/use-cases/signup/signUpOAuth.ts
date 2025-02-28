import { User } from "../../entities/User";
import { SignUpRepository } from "../../interfaces/repositories/signup-repository";
import { SignUpOAuthUseCase } from "../../interfaces/uses-cases/signup/signupOAuth";

export class SignUpOAuth implements SignUpOAuthUseCase {
    signUpRepository: SignUpRepository;

    constructor(signUpRepository: SignUpRepository) {
        this.signUpRepository = signUpRepository;
    }

    async signUpOAuth(user: User) {
        return await this.signUpRepository.signUpOAuth(user);
    }
}