const swagger = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation for DevBlog',

      version: '1.0.0',
      description: 'API documentation for the application'
    },
    servers: [
      {
        url: 'http://localhost:4000',
        description: 'Local Server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: [
    './src/presentation/routes/*.ts',
    './src/domain/enums/*.ts',
    './src/domain/schema/*.ts',
    './src/domain/entities/*.ts',
    './src/domain/utils/parseError.ts'
  ]
};

export const swaggerSpec = swagger(options);