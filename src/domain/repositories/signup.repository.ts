import { User  } from "../entities/User";
import {UserModel} from "../../../mongoose/models/User";
import { JWToken } from "../jwt/jwt";
import { exclude } from "../utils/excludeColumn";
import { SignUpRepository } from "../interfaces/repositories/signup-repository";


export class SignUpRepositoryImplementation implements SignUpRepository {
    jwToken: JWToken;

    constructor(jwToken: JWToken){
        this.jwToken = jwToken;
    }
    
    async signUpEmail(user: User) {
        const jwt = require('jsonwebtoken');
        const bcrypt = require("bcrypt");

        try {
            const result = await UserModel.create({
                name: user.name,
                email: user.email,
                password: await bcrypt.hash(user.password, 10),
                provider: 'email',
                image: '',
                bio: '',
                savedPosts: [],
            });
            
            let data = exclude(result, ['password', 'createdAt', 'updatedAt']);
            return {
                accessToken: this.jwToken.generateAccessToken(data, jwt),
                refreshToken: this.jwToken.generateRefreshToken(data, jwt),
            };
        } catch (error: any) {
            return error;
        }
    }
}


