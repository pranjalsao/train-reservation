
const express = require('express')

const app = express()
const cors = require('cors')


// add middleware for request's body
app.use(express.json())
app.use(cors())

// add routes
const trainRouter = require('./routes/trainsearch')

app.use(trainRouter)

app.listen(4000, '0.0.0.0', () => {
  console.log('server started port 4000')
})
