const Department = require('../models/Department');
const Employee = require('../models/Employee');

// Create a new department
exports.createDepartment = async (req, res) => {
    try {
        console.log(req?.body);
        const department = new Department(req.body);
        await department.save();
        res.status(201).json(department);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get a list of all departments
exports.getAllDepartments = async (req, res) => {
    try {
        const departments = await Department.find().populate('managerId');
        res.json(departments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a specific department by ID
exports.getDepartmentById = async (req, res) => {
    try {
        const department = await Department.findById(req.params.id).populate('managerId');
        if (!department) return res.status(404).json({ error: 'Department not found' });
        res.json(department);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a department by ID
exports.updateDepartment = async (req, res) => {
    try {
        const updateFields = req.body; // Get the fields from the request body
        const departmentUid = req.params.id;  // Department UID from the URL params

        console.log(updateFields.managerId, "managerId");  // Log managerId (if provided)
        console.log(departmentUid, "Department UID from params");  // Log department UID

        // If managerId (uid of employee) is provided, find the corresponding employee and update managerId
        if (updateFields?.managerId) {
            console.log("Looking for the manager...");
            const manager = await Employee.findOne({ uid: updateFields.managerId });  // Find the employee by their uid
            console.log(manager, "Manager found");

            if (!manager) {
                return res.status(404).json({ error: 'Manager not found' });
            }

            // Since managerId should be a Number, set managerId as the manager's `uid`
            updateFields.managerId = manager.uid;  // Use the manager's `uid` (not `_id`) for managerId
        }

        const departmentData = await Department.findOne({ uid : departmentUid });  // Find the department by uid (not ObjectId)
        console.log(departmentData, "departmentData");
        // let department = null
        // Update the department using the uid (not the _id)
        const department = await Department.findOneAndUpdate(
            { uid: departmentUid }, 
            updateFields,  
            { new: true }  
        );  

        if (!department) {
            return res.status(404).json({ error: 'Department not found' });
        }

        // Return the updated department details
        res.json(department);
    } catch (error) {
        // Handle any errors during the update process
        console.error("Error updating department:", error);
        res.status(400).json({ error: error.message });
    }
};


// Delete a department by ID
exports.deleteDepartment = async (req, res) => {
    try {
        const department = await Department.findByIdAndDelete(req.params.id);
        if (!department) return res.status(404).json({ error: 'Department not found' });
        res.json({ message: 'Department deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
