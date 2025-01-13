import { User } from "../../entities/User";
import { SignUpRepository } from "../../interfaces/repositories/signup-repository";
import { SignUpEmailUseCase } from "../../interfaces/uses-cases/signup/signupEmail";

export class SignUpEmail implements SignUpEmailUseCase {
    signUpRepository: SignUpRepository;

    constructor(signUpRepository: SignUpRepository) {
        this.signUpRepository = signUpRepository;
    }
    async signUpEmail(user: User) {
        return await this.signUpRepository.signUpEmail(user);
    }
}