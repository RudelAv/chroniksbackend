require('dotenv').config();

export class JWToken {
    generateAccessToken(user: any, JWT: any) {
        return JWT.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRES });
    }

    generateRefreshToken(user: any, JWT: any) {
        return JWT.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRES });
    }  
    
    verifyAccessToken(token: string, JWT: any) {
        return JWT.verify(token, process.env.ACCESS_TOKEN_SECRET);
    }

    verifyRefreshToken(token: string, JWT: any) {
        return JWT.verify(token, process.env.REFRESH_TOKEN_SECRET);
    }
}