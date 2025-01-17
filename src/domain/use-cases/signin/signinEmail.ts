import { User } from "../../entities/User";
import { SignInRepository } from "../../interfaces/repositories/signin-repository";
import { SignInEmailUseCase } from "../../interfaces/uses-cases/signin/singinEmail";

export class SignInEmail implements SignInEmailUseCase {
    signInRepository: SignInRepository;

    constructor(signInRepository: SignInRepository) {
        this.signInRepository = signInRepository;
    }
    async signInEmail(user: User) {
        return await this.signInRepository.signInEmail(user);
    }
}