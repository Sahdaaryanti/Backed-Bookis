require('dotenv').config()

const express = require('express')
const route = require('./routes/index')
const errorHandler = require('./middlewares/errorHandling')
const upload = require('./middlewares/multer');
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()
const port = process.env.PORT || 3000
const morgan = require('morgan');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const routes = require("./routes/index")

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// CORS setup
const corsOptions = {
  origin: ['http://localhost:3001', 'https://frontend-bookis.vercel.app', 'https://frontend-bookish-admin.vercel.app'],
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
};

app.use(cors(corsOptions));

// Serve static files
app.use(express.static('uploads'));

// Swagger documentation setup
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.1.9',
    info: {
      title: 'API Dashboard & API Regist-Login Admin',
      version: '1.0.0',
      description: 'Informasi API Admin',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Local server',
      },
      // Add more servers as needed
    ],
    components: {
      securitySchemes: {
        MyAuth: {
          type: 'apiKey',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./routes/*.js'],
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

// Logging middleware
app.use(morgan('common'));

// Main routes
app.use('/', route);

// Error handling middleware
app.use(errorHandler);

if (process.env.APP_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}/api-docs`)
  });
}
