require('dotenv').config();
const express = require('express');

//routes
const status21Routes = require('./routes/status21Routes');
const govSorterRoutes = require('./routes/govSorterRoutes');

//middleware
const errorHandler = require('./middleware/errorHandler');
const logger = require('./utils/logger');
const compression = require('compression');
const cors = require('cors');


// Initialize the express app
const app = express();
const port = process.env.PORT || 3000;

// Allow requests from the frontend origin
app.use(cors({
    origin: 'http://localhost:8080', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    credentials: true, 
}));

//Middleware to parse JSON
app.use(express.json());

// Enable compression
app.use(compression());

// Root endpoint to return a 200 OK response
app.get('/', (req, res) => {
  res.status(200).send('Welcome to the DebtSentry API!');
});

// TODO: Change the endpoint to /api/v2/status21
//Routes
app.use('/api/v2/status21', status21Routes);
app.use('/api/v2/govSorter', govSorterRoutes);

//Error handler middleware
app.use(errorHandler);

app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});