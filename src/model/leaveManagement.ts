import mongoose from "mongoose";

const leaveManagementSchema = new mongoose.Schema({
    employee: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Employee' 
    }],
    request_status: {
        type: String,
        enum: ['PENDING', 'APPROVED', 'REJECT'],
        default: 'PENDING'
    },
    reason_of_leave:{
        type: String,
        require: true
    },
    dates_of_leave:{
        type: Array,
        require: true
    }
})

export const leaveManagementModel = mongoose.model('leaveManagement', leaveManagementSchema)