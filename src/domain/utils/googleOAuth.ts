import { OAuth2Client } from 'google-auth-library';
import { User } from '../entities/User';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export async function verifyGoogleToken(token: string): Promise<User> {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    if (!payload) {
        throw new Error('Invalid token');
    }

    return {
        name: payload.name || '',
        email: payload.email || '',
        image: payload.picture || '',  
        provider: 'google',
    };
}