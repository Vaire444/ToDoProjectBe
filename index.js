require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = 3001
const router = require('./src/router')


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
}); //turvalisuse asi, et laseks suhelda 2 erineva domeeni jaoks, annab accessi saadab headerisse info, tavaliselt tehakse npm cors ja installitakse

app.get('/', (req, res) => {
  res.send('Hakkama said!')
})

app.use('/api', router)

app.listen(process.env.PORT || port, () => {
  console.log("Server is running")
 }) //heroku valib enda pordi, võtame env failist selle pordi, kui seal ei ole siis võtab automaatselt pordi  
