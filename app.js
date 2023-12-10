require('dotenv').config()

const express        = require('express')
// const expressLayouts = require('express-ejs-layouts')
const ejs            = require('ejs')
const route          = require('./routes/index')
const errorHandler   = require('./middlewares/errorHandling')
const upload         = require('./middlewares/multer');
const cors           = require('cors')
const bodyParser     = require('body-parser')
const multer = require('multer');
const path           = require('path')
var app              = express()
const port           = process.env.PORT || 3000
const morgan         = require('morgan');
const swaggerJsDoc   = require('swagger-jsdoc');
const swaggerUI      = require('swagger-ui-express');
const routes         = require("./routes/index")

const corsOptions = {
  origin: 'http://localhost:3001',
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(bodyParser. text({type: '/'}));
// app.use(upload.single('urlFile'));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// app.set('views', path.join(__dirname,'views'))
// app.set('view engine', 'ejs')
// app.use(expressLayouts)

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.1.9',
    info: {
      title: 'API Dashboard & API Regist-Login Admin',
      version: '1.0.0',
      description: 'Informasi API Admin',
      servers: ['http://localhost:3000'],
    },
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
app.use('/api-docs', routes, swaggerUI.serve, swaggerUI.setup(swaggerDocs));
app.use(morgan('common'));

app.use('/', route)

// app.use(errorHandler);

if (process.env.APP_ENV != 'test') {
    app.listen(port, () => {
        console.log(`Listening on http://localhost:${port}/api-docs`)
    })
}