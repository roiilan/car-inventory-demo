const express = require('express');
const mssql = require('mssql');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 5000;

// ================= DB CONFIG =================
const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_HOST,
  database: process.env.DB_NAME,
  options: {
    encrypt: true,
    enableArithAbort: true,
    trustServerCertificate: true,
  },
};

let pool = null;

// ================= DB CONNECT WITH RETRY =================
async function connectWithRetry(retries = 10, delay = 5000) {
  while (retries > 0) {
    try {
      pool = await mssql.connect(dbConfig);
      console.log('✅ Connected to SQL Server');
      return;
    } catch (err) {
      retries--;
      console.log(`❌ DB not ready. Retries left: ${retries}`);
      if (retries === 0) {
        console.error('❌ Giving up DB connection');
        return;
      }
      await new Promise(res => setTimeout(res, delay));
    }
  }
}

connectWithRetry();

// ================= JWT MIDDLEWARE =================
const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).send('Access Denied');

  try {
    const formattedToken = token.startsWith('Bearer ')
      ? token.split(' ')[1]
      : token;
    req.user = jwt.verify(formattedToken, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(403).send('Invalid Token');
  }
};

// ================= HEALTH ENDPOINTS =================

// Liveness – server is up
app.get('/health/live', (req, res) => {
  res.status(200).send('OK');
});

// Readiness – DB reachable
app.get('/health/ready', async (req, res) => {
  try {
    if (!pool) throw new Error('No DB connection');
    await pool.request().query('SELECT 1');
    res.status(200).send('READY');
  } catch {
    res.status(503).send('DB NOT READY');
  }
});

// ================= API =================
app.get('/cars', authenticateJWT, async (req, res) => {
  try {
    const result = await pool.request().query('SELECT * FROM dbo.Cars');
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send('Database error');
  }
});

app.post('/cars', authenticateJWT, async (req, res) => {
  const { ID, Make, Model, Year, Price } = req.body;
  try {
    await pool.request()
      .input('ID', mssql.Int, ID)
      .input('Make', mssql.NVarChar, Make)
      .input('Model', mssql.NVarChar, Model)
      .input('Year', mssql.Int, Year)
      .input('Price', mssql.Decimal(10, 2), Price)
      .query(`
        IF EXISTS (SELECT 1 FROM dbo.Cars WHERE ID = @ID)
          UPDATE dbo.Cars SET Make=@Make, Model=@Model, Year=@Year, Price=@Price WHERE ID=@ID
        ELSE
          INSERT INTO dbo.Cars (Make, Model, Year, Price)
          VALUES (@Make, @Model, @Year, @Price)
      `);
    res.send('Success');
  } catch {
    res.status(500).send('Database error');
  }
});

app.get('/token', (req, res) => {
  const token = jwt.sign({ user: 'test' }, process.env.JWT_SECRET, { expiresIn: '365d' });
  res.send(token);
});

// ================= START SERVER =================
app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});
