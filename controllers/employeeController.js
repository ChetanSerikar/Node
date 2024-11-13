// controllers/employeeController.js
const Employee = require('../models/Employee');
const Department = require('../models/Department');
// const Job = require('../models/Job');

exports.createEmployee = async (req, res) => {
    try {
        // Validate if the departmentUid exists
        const department = await Department.findOne({ uid: req.body.departmentId });
        if (!department) {
            return res.status(404).json({ error: 'Department not found' });
        }

        // Create a new employee and save to database
        const employee = new Employee({
            ...req.body,
            departmentUid: department.uid,  // Use department's uid
        });

        await employee.save();
        res.status(201).json(employee);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();

        // Manually populate departmentUid and jobId by their respective uid or id fields
        const employeesWithDetails = await Promise.all(employees.map(async (employee) => {
            const department = await Department.findOne({ uid: employee.departmentUid });
             // Assuming jobId still references _id
            return {
                ...employee.toObject(),
                department: department ? department.toObject() : null,
                
            };
        }));

        res.json(employeesWithDetails);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getEmployeeById = async (req, res) => {
    try {
        // Find employee by _id
        const employee = await Employee.findById(req.params.id);
        if (!employee) return res.status(404).json({ error: 'Employee not found' });

        // Manually fetch department and job details
        const department = await Department.findOne({ uid: employee.departmentUid });
        const job = await Job.findById(employee.jobId);

        res.json({
            ...employee.toObject(),
            department: department ? department.toObject() : null,
            job: job ? job.toObject() : null
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateEmployee = async (req, res) => {
    try {
        // Validate if the departmentUid exists
        const department = await Department.findOne({ uid: req.body.departmentUid });
        if (!department) {
            return res.status(404).json({ error: 'Department not found' });
        }

        // Update employee
        const employee = await Employee.findByIdAndUpdate(req.params.id, {
            ...req.body,
            departmentUid: department.uid, // Update department reference if needed
        }, { new: true });

        if (!employee) return res.status(404).json({ error: 'Employee not found' });

        res.json(employee);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteEmployee = async (req, res) => {
    try {
        const employee = await Employee.findByIdAndDelete(req.params.id);
        if (!employee) return res.status(404).json({ error: 'Employee not found' });

        res.json({ message: 'Employee deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
