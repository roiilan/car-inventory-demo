const express = require('express');
const mssql = require('mssql');
const jwt = require('jsonwebtoken');
const cors = require('cors'); // Import CORS
require('dotenv').config(); 

const app = express();
app.use(express.json());
app.use(cors()); // Enable CORS for all routes

// Configuration for SQL Server connection
const dbConfig = {
    user: 'sa',
    password: 'YourPassword123!', // Your password
    server: 'mssql-container', // Database server address
    database: 'Cars', // Default database
    options: {
        encrypt: true, // Use encryption for data
        enableArithAbort: true, // Handle arithmetic errors
        trustServerCertificate: true, // Allow self-signed certificates
    },
};

// Middleware for JWT authentication
const authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization'); // Retrieve token from request header

    if (!token) {
        return res.status(401).send('Access Denied'); // No token provided
    }

    try {
        const formattedToken = token.startsWith('Bearer ') ? token.split(' ')[1] : token; // Handle "Bearer " prefix
        const decoded = jwt.verify(formattedToken, process.env.JWT_SECRET); // Verify token
        req.user = decoded; // Attach decoded token to request
        next(); // Proceed to the next middleware
    } catch (error) {
        res.status(403).send('Invalid Token'); // Invalid token
    }
};

// Route to fetch all cars
app.get('/cars', authenticateJWT, async (req, res) => {
    try {
        const pool = await mssql.connect(dbConfig); // Connect to the database
        const result = await pool.request().query('SELECT * FROM dbo.Cars'); // Fetch data directly from dbo.Cars
        res.json(result.recordset); // Return the result as JSON
    } catch (err) {
        if (err.code === 'ELOGIN') {
            res.status(500).send('Failed to connect to database: Invalid login credentials'); // Login issue
        } else if (err.code === 'ETIMEOUT') {
            res.status(500).send('Failed to connect to database: Connection timed out'); // Timeout
        } else if (err.code === 'ESOCKET') {
            res.status(500).send('Failed to connect to database: Network issue'); // Network issue
        } else {
            res.status(500).send(`Database error: ${err.message}`); // General database error
        }
    }
});

// Route to add or update a car
app.post('/cars', authenticateJWT, async (req, res) => {
    const { ID, Make, Model, Year, Price } = req.body; // Extract request body
    try {
        const pool = await mssql.connect(dbConfig); // Connect to the database
        await pool.request()
            .input('ID', mssql.Int, ID) // Input parameter: ID
            .input('Make', mssql.NVarChar, Make) // Input parameter: Make
            .input('Model', mssql.NVarChar, Model) // Input parameter: Model
            .input('Year', mssql.Int, Year) // Input parameter: Year
            .input('Price', mssql.Decimal(10, 2), Price) // Input parameter: Price
            .query(`IF EXISTS (SELECT 1 FROM dbo.Cars WHERE ID = @ID)
                    UPDATE dbo.Cars SET Make = @Make, Model = @Model, Year = @Year, Price = @Price WHERE ID = @ID
                    ELSE
                    INSERT INTO dbo.Cars (ID, Make, Model, Year, Price) VALUES (@ID, @Make, @Model, @Year, @Price)`); // Upsert logic
        res.send('Success'); // Send success response
    } catch (err) {
        if (err.code === 'ELOGIN') {
            res.status(500).send('Failed to connect to database: Invalid login credentials'); // Login issue
        } else if (err.code === 'ETIMEOUT') {
            res.status(500).send('Failed to connect to database: Connection timed out'); // Timeout
        } else if (err.code === 'ESOCKET') {
            res.status(500).send('Failed to connect to database: Network issue'); // Network issue
        } else {
            res.status(500).send(`Database error: ${err.message}`); // General database error
        }
    }
});

// Route to generate JWT token
app.get('/token', (req, res) => {
    const token = jwt.sign({ user: 'test' }, process.env.JWT_SECRET, { expiresIn: '365d' }); // Generate token with 1 year expiration. 
    res.send(token); // Return token
});

// Start the server
const PORT = 5000; // Port number
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); // Log server start
