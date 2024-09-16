const mongoose = require('mongoose')

const employeeSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true
    },
    salary:{
        type:Number,
        required:true
    }
})

const employeeModel = mongoose.model.employee|| mongoose.model('employee',employeeSchema);
module.exports = employeeModel;