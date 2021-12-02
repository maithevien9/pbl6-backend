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
  API_END_POINT,
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
  dbUri: DB_URI || 'mongodb://localhost:27017/oneTech',
  bcryptSaltRounds: 10,
  jwtPrivateKey: JWT_PRIVATE_KEY || 'pbl6@',
  cloudinary: CLOUDINARY,
  sendGrid: SENDGRID,
  apiEndpoint: API_END_POINT || 'http://localhost:8000/v1',
  MOMO_HOSTNAME: process.env.MOMO_HOSTNAME,
  MOMO_END_POINT: process.env.MOMO_END_POINT,
  MOMO_PATH: process.env.MOMO_PATH,
  MOMO_PARTNER_CODE: process.env.MOMO_PARTNER_CODE,
  MOMO_ACCESS_KEY: process.env.MOMO_ACCESS_KEY,
  MOMO_SECRET_KEY:
    process.env.MOMO_SECRET_KEY || 'cgMfyzdwNsttVlLQkLjGnbwO42WuWDj0',
  MOMO_RETURN_URL: process.env.MOMO_RETURN_URL,
  MOMO_REQUEST_TYPE: process.env.MOMO_REQUEST_TYPE,
  MOMO_NOTIFY_URL: process.env.MOMO_NOTIFY_URL,
  MOMO_HOST_NAME: process.env.MOMO_HOST_NAME,
  MOMO_PORT: process.env.MOMO_PORT,
};
