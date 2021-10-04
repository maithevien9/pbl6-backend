import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import awsServerlessExpress from 'aws-serverless-express';
import { app } from './src/app';

const server = awsServerlessExpress.createServer(app);

module.exports.universal = (event: APIGatewayProxyEvent, context: Context) => {
  return awsServerlessExpress.proxy(server, event, context);
};
