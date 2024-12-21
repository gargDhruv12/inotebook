const connectToMongo = require('./db');
const express = require('express')

connectToMongo();
const app = express()
const port = 5000
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

app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
      console.error('Bad JSON');
      return res.status(400).send({ error: 'Invalid JSON' });
    }
    next();
  });
  
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

