export async function comparePassword(plaintextPassword: string, hash: any) {
    const bcrypt = require("bcrypt")
    return await bcrypt.compare(plaintextPassword, hash);
}


export function generateRandomString(length :number) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

