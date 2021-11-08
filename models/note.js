import Mongoose from "mongoose";

const notesCollection = 'notes'

const notesSchema = new Mongoose.Schema({
    nota:{
        type:String,
        required:true
    }
})

export const notes = Mongoose.model(notesCollection, notesSchema);