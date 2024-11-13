const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const employeeSchema = new mongoose.Schema({
    uid: { type: Number, unique: true },
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    phoneNumber: String,
    departmentUid: { type: Number, ref: 'Department' },
    hireDate: Date,
    salary: Number,
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
});

// Add the auto-incrementing uid field
employeeSchema.plugin(AutoIncrement, { inc_field: 'uid', id: 'employee_uid_counter' });
module.exports = mongoose.model('Employee', employeeSchema);
