const express = require('express')
const cors = require('cors')
const bcrypt = require('./functions/bcrypt')
require('dotenv').config()
require('./mongo').connect()

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
app.use(bcrypt)

///

app.post('/', (req, res) => {
  res.json({ result: isValid ? isValid : 'n/a' })
})

///

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`)
})