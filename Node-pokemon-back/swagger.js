const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Pokedex API',
      description: 'API endpoints for Pokedex',
      contact: {
        name: 'Adrian Adducchio',
        email: 'adrian.vhvhvh@gmail.com',
        url: 'https://github.com/adrian947/pokemon-challenge',
      },
      version: '1.0.0',
    },
    servers: [
      {
        url: 'http://localhost:5000/',
        description: 'Local server',
      },   
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          name: 'Authorization',
          in: 'header',
          description:
            'Enter the `token`',
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.js'],
};
const swaggerSpec = swaggerJsdoc(options);
function swaggerDocs(app, port) {  
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));  
  app.get('/docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
}

module.exports = { swaggerDocs };
