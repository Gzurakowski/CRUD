import express from 'express'
import mongoose from 'mongoose'
import env from 'dotenv'
import * as model from './models/note.js'
env.config()

async function ConectDB() {
    try {
        let rta = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log("Base de datos conectada")
    } catch (msg) {
        console.log(msg)
    }
}


const app = express()
ConectDB()
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.get('/', async (req, res) =>{
    const notas = await model.notes.find({})
    res.render('index', {notas})
})


app.post('/', async (req, res) =>{
    try{
        const nota = req.body
        const notaSaveModel = new model.notes(nota)
        const notaSave = await notaSaveModel.save()
        res.redirect('/')
    }catch(err){
        console.log(err)
    }
})


app.delete('/:id', async (req, res) =>{
    const id = req.params
    console.log(id)
    try{
        await model.notes.deleteOne({id})
        res.redirect('/')
    }catch(err){
        console.log(err)
    }
    
})

app.put('/:id', async (req, res) =>{
    const _id = req.params.id
    const nota = req.body.nota
    try{
        await model.notes.findByIdAndUpdate(_id, {nota})
        res.sendStatus(200)
    }catch(err){
        console.log(err)
    }
})


/* ------------------------------------------------------ */
/* Server Listen */

const server = app.listen(process.env.PORT, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor error`))