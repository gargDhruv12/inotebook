const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors')
require('dotenv').config();

connectToMongo();
const app = express()
const port = process.env.PORT || 5000;

app.options('*', cors({
  origin: 'https://inotebook-pi-eight.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));


// app.use(cors())

app.use(express.json())
// Available routes
// app.get('/', (req, res) => {
//   res.send('Hello Dhruv!')
// })
// app.get('/api/v1/login', (req, res) => {
//   res.send('Hello login!')
// })
// app.get('/api/v1/signUp', (req, res) => {
//   res.send('Hello sign up!')
// })
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))
app.use('/api/categories', require('./routes/categories'))

app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
      console.error('Bad JSON');
      return res.status(400).send({ error: 'Invalid JSON' });
    }
    next();
  });
  
app.listen(port, () => {
  console.log(`iNotebook app listening on port ${port}`)
})

// module.exports = (req, res) => {       for vercel if needed
//   app(req, res);
// };
