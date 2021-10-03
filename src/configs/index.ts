import dotenv from 'dotenv';

dotenv.config();

const {
  HOSTNAME,
  PORT,
  DB_URI,
  JWT_PRIVATE_KEY,
  CLOUDINARY_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_SECRET_KEY,
  CLOUDINARY_FOLDER,
  SENDGRID_API_KEY,
  EMAIL_ADMIN,
  TEMPLATE_ID_EMAIL,
} = process.env;

const SERVER_HOSTNAME = HOSTNAME || 'localhost';
const SERVER_PORT = PORT || 3001;

const SERVER = {
  hostname: SERVER_HOSTNAME,
  port: SERVER_PORT,
};

const CLOUDINARY = {
  cloudName: CLOUDINARY_NAME || '',
  apiKey: CLOUDINARY_API_KEY || '',
  apiSecret: CLOUDINARY_SECRET_KEY || '',
  folder: CLOUDINARY_FOLDER || 'pbl6',
};

const SENDGRID = {
  key:
    SENDGRID_API_KEY ||
    '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',
  email: EMAIL_ADMIN || 'maithevien9@gmail.com',
  template: TEMPLATE_ID_EMAIL || 'd-8b9ff577a17b43a4bf835262e7d5c4f6',
};

export default {
  server: SERVER,
  dbUri: DB_URI || 'mongodb://localhost:27017/monla',
  bcryptSaltRounds: 10,
  jwtPrivateKey: JWT_PRIVATE_KEY || 'pbl6@',
  cloudinary: CLOUDINARY,
  sendGrid: SENDGRID,
};
