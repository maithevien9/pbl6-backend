import swaggerJsdoc from 'swagger-jsdoc';

import configs from '../configs';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'One Line API documentation',
    version: '1.0.0',
    description: 'This is a document of OneLine APIs',
  },
  servers: [
    {
      url: configs.apiEndpoint,
    },
  ],
};

const specs = swaggerJsdoc({
  swaggerDefinition,
  apis: [
    'src/docs/models/*.yml',
    'src/docs/apis/*.yml',
    'src/docs/definitions/*.yml',
  ],
});

export default specs;
