const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Category = require('../models/Category');
const fetchuser = require('../middleware/fetchuser');

// ROUTE 1: Get all categories for a user - GET "/api/categories/fetchallcategories"
router.get('/fetchallcategories', fetchuser, async (req, res) => {
    try {
        const categories = await Category.find({ user: req.user.id }).sort({ date: -1 });
        res.json(categories);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
});

// ROUTE 2: Add a new category - POST "/api/categories/addcategory"
router.post('/addcategory', fetchuser, [
    body('name', 'Category name is required').isLength({ min: 1 }),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { name, color, icon } = req.body;
        const category = new Category({
            name,
            color: color || "#3B82F6",
            icon: icon || "📁",
            user: req.user.id
        });
        const savedCategory = await category.save();
        res.json(savedCategory);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
});

// ROUTE 3: Update a category - PUT "/api/categories/updatecategory/:id"
router.put('/updatecategory/:id', fetchuser, async (req, res) => {
    try {
        const { name, color, icon } = req.body;
        const newCategory = {};
        if (name) newCategory.name = name;
        if (color) newCategory.color = color;
        if (icon) newCategory.icon = icon;

        let category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).send("Category not found");
        }

        if (category.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed");
        }

        category = await Category.findByIdAndUpdate(
            req.params.id,
            { $set: newCategory },
            { new: true }
        );
        res.json(category);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
});

// ROUTE 4: Delete a category - DELETE "/api/categories/deletecategory/:id"
router.delete('/deletecategory/:id', fetchuser, async (req, res) => {
    try {
        let category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).send("Category not found");
        }

        if (category.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed");
        }

        category = await Category.findByIdAndDelete(req.params.id);
        res.json({ "Success": "Category has been deleted", "category": category });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
});

module.exports = router; 