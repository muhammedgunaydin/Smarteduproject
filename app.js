const express = require('express')
const mongoose = require('mongoose')
const pageRoute = require('./routes/pageRoute')
const courseRoute = require('./routes/courseRoute')

const app = express()

//Connect db
mongoose.connect('mongodb://127.0.0.1/smartedu-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("DB connected succsesfuly")
})

//Template engine
app.set("view engine", "ejs")

//Middlewares
app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//routes
app.use('/', pageRoute)
app.use('/courses', courseRoute)


const port = 3000
app.listen(port, () => {
    console.log(`App started on port ${port}`)
})