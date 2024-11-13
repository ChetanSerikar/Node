// models/Department.js
const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
    name: String,
    description: String,
    managerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
});

module.exports = mongoose.model('Department', departmentSchema);
