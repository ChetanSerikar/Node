// models/Payroll.js
const mongoose = require('mongoose');

const payrollSchema = new mongoose.Schema({
    employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
    basicSalary: Number,
    bonus: Number,
    deductions: Number,
    netSalary: Number,
    payDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Payroll', payrollSchema);
