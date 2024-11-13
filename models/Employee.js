// models/Employee.js
const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    phoneNumber: String,
    departmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
    hireDate: Date,
    salary: Number,
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
});

module.exports = mongoose.model('Employee', employeeSchema);
