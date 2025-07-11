const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectToMongo = require('./db');
connectToMongo();

const app = express();
const port = process.env.PORT || 5000;

// app.use(cors({
//   origin: 'https://inotebook-pi-eight.vercel.app',
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   credentials: true
// }));

// // Add preflight support for OPTIONS
// app.options('*', cors({
//   origin: 'https://inotebook-pi-eight.vercel.app',
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   credentials: true
// }));

const allowedOrigins = [
  'http://localhost:3000',
  'https://inotebook-pi-eight.vercel.app'
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));


app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));
app.use('/api/categories', require('./routes/categories'));

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).send({ error: 'Invalid JSON' });
  }
  next();
});

app.listen(port, () => {
  console.log(`iNotebook app listening on port ${port}`);
});
