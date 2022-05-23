require('dotenv').config()
const express = require('express')
const { json } = require('express/lib/response')
const mongoose = require('mongoose')
const app = express() 

app.use(
    express.urlencoded({
        extended: true
    }),
)
app.use(express.json())

//rotas 

const personRoutes = require('./routes/personRoutes')

app.use('/person', personRoutes)

// rota principal 

app.get('/', (req,res) => {
    res.json({message: 'Oi Express!'})
})

const DB_USER = process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)

mongoose 
  .connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.fvhy5.mongodb.net/APIRESTFUL?retryWrites=true&w=majority`
).then(() => {
    console.log("Conectado ao banco com sucesso!")
    app.listen(3000)
}).catch((error)  => {
   console.log(error)
})

