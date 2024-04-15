import mongoose from 'mongoose';

const holidaySchema = new mongoose.Schema({
    date:{
        type: Date,
        require: true
    },
    event_name:{
        type: String,
        require: true
    }
})

export const holidayModel = mongoose.model('Holiday', holidaySchema)