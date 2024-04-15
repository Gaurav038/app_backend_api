import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    phone:{
        type: String
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    date_of_joining:{
        type: Date,
        required: true
    }
})


export const employeeModel = mongoose.model('Employee', employeeSchema)