const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const departmentSchema = new mongoose.Schema({
    uid: { type: Number, unique: true },
    name: String,
    description: String,
    managerId: { 
        type: Number, 
        ref: 'Employee', 
        required: false, 
        validate: {
            validator: async function(value) {
                // Check if managerId is provided and if it exists in the Employee collection
                if (value) {
                    const employee = await mongoose.model('Employee').findOne({ uid: value });
                    return employee !== null;  // Return true if the employee exists
                }
                return true;  // If managerId is not provided, validation passes
            },
            message: 'Manager with this uid not found in Employee collection.'
        }
    },
});

// Add the auto-incrementing uid field
departmentSchema.plugin(AutoIncrement, { inc_field: 'uid', id: 'department_uid_counter' });

module.exports = mongoose.model('Department', departmentSchema);
