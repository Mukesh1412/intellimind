const express = require('express')
const app = express()
const cors = require('cors');
const morgan = require('morgan')
const bodyParser = require('body-parser')

app.use(cors());

app.use(morgan('dev'))
app.use(bodyParser.json({}))
app.use(bodyParser.urlencoded({ extended: false }))

// redis connector 

const redisConnectionHelper = require('./helpers/redisConnector')

const redisClient = redisConnectionHelper()

redisClient.on('ready', () => {
    console.log('redis connection is done')
    app.set('redis', redisClient)
})

redisClient.on('error', (err) => {
    console.log(err)
    app.set('redis', null)
})

// app.get('/',(req,res,next) => {
//     res.send('ok')
// })
// routes 
const routes = require('./routes/index');
app.use(routes);
app.use((req, res, next) => {
    return res.status(404).json({
        success: false,
        code: 'PAGE_NOT_FOUND',
        message: 'Request page is not Found'
    })
})

app.use((err, req, res, next) => {
    console.log(err)
    let message = 'Something went wrong'
    if (process.env.NODE_ENV) {
        message = err.message || message
    }
    return res.status(err.statusCode || 500).json({
        success: false,
        code: 'UNKNOWN_ERROR',
        message
    })
})

module.exports = app