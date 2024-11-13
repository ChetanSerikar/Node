const express = require('express');
const router = express.Router();
const departmentController = require('../controllers/departmentController');

// Route to create a new department
router.post('/', departmentController.createDepartment);

// Route to get all departments
router.get('/', departmentController.getAllDepartments);

// Route to get a specific department by ID
router.get('/:id', departmentController.getDepartmentById);

// Route to update a specific department by ID
router.put('/:id', departmentController.updateDepartment);

// Route to delete a specific department by ID
router.delete('/:id', departmentController.deleteDepartment);

module.exports = router;
