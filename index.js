const express = require('express');
const app = express();
const https = require('https');
const cors = require('cors'); 
require('dotenv').config();
const port = process.env.APP_PORT || 3000;
const { Pool } = require('pg');
const AWS = require("aws-sdk");
const multer = require("multer");
const fs = require('fs');

app.use(cors({
    origin: process.env.CORS_URL, 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],  
  }));

  const s3 = new AWS.S3({
    endpoint: process.env.AWS_ENDPOINT, 
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey:  process.env.AWS_ACCESS_KEY,
  });
  const storage = multer.memoryStorage();
  const upload = multer({ storage });

app.use(express.json());

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
  ssl: {
    ca: fs.readFileSync(process.env.DB_SSL).toString(),

  },
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

  app.post('/newPortfolio', upload.single('file'), async (req, res) => {
    const file = req.file;
    const { name, title, aboutme, interests, projects } = req.body;
    let contact = {};
  
    if ('email' in req.body) {
      contact = { ...contact, email: req.body.email };
    }
    if ('phone' in req.body) {
      contact = { ...contact, phone: req.body.phone };
    }
    if ('address' in req.body) {
      contact = { ...contact, address: req.body.address };
    }
  
    const parsedInterests = interests ? JSON.parse(interests) : [];
    const parsedProjects = projects ? JSON.parse(projects) : [];
  
    if (!file) {
      return res.status(400).json({ message: "No file uploaded." });
    }
    const client = await pool.connect();

    try {
      const bucketName = process.env.AWS_BUCKETNAME;
      const fileName = `uploads/${Date.now()}-${file.originalname}`;
      const params = {
        Bucket: bucketName,
        Key: fileName,
        Body: file.buffer,
        ACL: "public-read",
        ContentType: file.mimetype,
      };
  
      const result = await s3.upload(params).promise();
  
      await client.query('BEGIN');
  
      const newPortfolio = await client.query(
        `INSERT INTO portfolios (name, title, about, interests, projects, contacts, profpic)
        VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id;`,
        [name, title, aboutme, parsedInterests, parsedProjects, contact, result.Location]
      );
  
      await client.query('COMMIT');
      let link = ''
      if(name.split(' ').length == 1) {
        link = `${newPortfolio.rows[0].id}/${name}`
      } else {
        link = `${newPortfolio.rows[0].id}/${name.split(' ')[0]}-${name.split(' ')[1]}`
      }
      const newLink = `https://find-out-about.me/${link}`;
  
      res.status(200).send(newLink);
    } catch (err) {
      console.error('Transaction Error:', err);
      await client.query('ROLLBACK');
      res.status(500).send('Internal Server Error');
    } finally {
      client.release();
    }
  });
  

  app.get('/userPortfolio', async (req, res) => {
    const { id, name } = req.query;

    let formattedName;
    if(name.split('-').length == 1) {
      formattedName = name;
    } else {
      formattedName = `${name.split('-')[0]} ${name.split('-')[1]}`
    }
    let client;
    try {
      client = await pool.connect();
      const selectResult = await client.query(
        'SELECT * FROM portfolios WHERE name = $1 AND id = $2',
        [formattedName, id]
      );
      if (selectResult.rows.length === 0) {
        return res.status(404).json({ message: 'Not Found' });

      } else {
        const { name, about, title, interests, contacts, profpic, projects } = selectResult.rows[0];

            let dataJson = {
              name,
              about,
              title,
              interests,
              contacts,
              image: profpic,
              projects,
            }
  
            return res.status(200).json({ 
              data: dataJson 
            });
           
      }
    } catch (err) {
      console.error('Error fetching user data:', err);
      res.status(500).json({ message: 'Failed to fetch user data' });
    } finally {
      if (client) client.release(); 
    }
  });
  

  const options = {
    key: fs.readFileSync(process.env.SSL_PRIVKEY),
    cert: fs.readFileSync(process.env.SSL_CERT),
    ca: fs.readFileSync(process.env.SSL_CERTBUNDLE),
    rejectUnauthorized: true 
  };
  
  https.createServer(options, app).listen(port, () => {
    console.log(`Secure backend server running at https://api.find-out-about.me:${port}`);
  });
  