const express = require('express')
const cors = require('cors')
require('dotenv').config()
require('./mongo').connect()

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

///

app.get('/', (req, res) => {
  res.json({ status: 'ready', port: process.env.PORT })
})

///

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`)
})