import { access } from "fs";
import { UserModel } from "../../../mongoose/models/User";
import { User } from "../entities/User";
import { SignInRepository } from "../interfaces/repositories/signin-repository";
import { JWToken } from "../jwt/jwt";
import { comparePassword } from "../utils/campare_password";
import { exclude } from "../utils/excludeColumn";

export class SignInRepositoryImplementation implements SignInRepository {
    jwToken: JWToken;

    constructor(jwToken: JWToken) {
        this.jwToken = jwToken;
    }

    async signInEmail(user: User) {
        const jwt = require('jsonwebtoken');
        try {
            const userDB = await UserModel.findOne({ email: user.email });
            if (!userDB) {
                return 'P2025';
            }

            const result = comparePassword(user.password, userDB.password);
            if ((await result) === true) {

                let data = {
                    id: userDB._id,
                    name: userDB.name,
                    email: userDB.email,
                    provider: userDB.provider,
                    image: userDB.image,
                    bio: userDB.bio,
                    // savedPosts: userDB.savedPosts,
                };
                return {
                    accessToken: this.jwToken.generateAccessToken(data, jwt),
                    refreshToken: this.jwToken.generateRefreshToken(data, jwt),
                };

            } else {
                return 'P1000';
            }
        } catch (error: any) {
            return error.code;

        }
    }
}