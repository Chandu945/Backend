const express = require("express")
const cors = require("cors")
const bodyParser = require('body-parser')
const mongoose = require("mongoose")
const path = require("path")
const regroute = require("./routes/register")
const loginroute = require("./routes/login")
const fileUpload = require("express-fileupload")
const model = require("./models/post")
const connect = require("./connection/connect")
connect()
const app = express()
const date = new Date()
app.use(cors())
app.use(fileUpload())
app.use(express.static("public"))
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use("/api/v1",regroute)
app.use("/api/v1",loginroute)


app.get("/", async (req, res) => {
    res.status(201).json({result: await model.find()})
})

app.post("/api/v1/post", (req, resp) => {
    const { Author, Location, Description ,Date} = req.body
    const {Imagefile} = req.files
    Imagefile.mv("./public/" + Imagefile.name, async (err) => {
        if(err) {
            resp.json({message: err})
        }
        else {
            try{
                const data = await model.create({
                    name:Author,
                    location:Location,
                    description:Description,
                    likes : 0,
                    postimage:Imagefile.name,
                    date:Date
                })
                console.log("data added")
                resp.json({message: 'Everything is fine', data})
               }catch(e){
                resp.json({message: 'Something went wrong', response: e })
            }
        }
    })
    })

app.get("/images/:filename" , (req , res)=>{
    res.sendFile(path.join(__dirname, `./public/${req.params.filename}`))
})    
app.listen(8080, () => console.log("port running",date))

