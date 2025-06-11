import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Videos API',
            version: '1.0.0',
            description: 'Videos API',

        },

    },
    apis: ['../../../videos/routes/videos.routes.ts']
};


const swaggerSpec = swaggerJsdoc(swaggerOptions);

export const setupSwagger = (app: Express) => {
    app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};