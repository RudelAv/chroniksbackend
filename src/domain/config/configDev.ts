import dotenv from 'dotenv';

dotenv.config({ path: `.env.dev${process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : ''}` });

export const PORT = process.env.PORT || 3000;