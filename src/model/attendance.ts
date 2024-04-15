import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
    employee: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Employee' 
    }],
    punchIn_time:{
        type: String,
        require: true
    },
    punchOut_time:{
        type: String,
    },
    punch_day:{
        type: Date,
        require: true
    }
})

export const attendanceModel = mongoose.model('Attendance', attendanceSchema)