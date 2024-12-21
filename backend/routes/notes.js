const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Note = require('../models/Note');
const fetchuser = require('../middleware/fetchuser');

// ROUTE 1 : Get all notes using:  GET "/api/auth/fetchallnotes" . Login required

router.get('/fetchallnotes',fetchuser,async (req,res)=>{
    try {
        const notes = await Note.find({user : req.user.id})
        res.json(notes);
    }catch(error){
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
    
})

// ROUTE 2 : Add a new note using:  GET "/api/auth/addnote" . Login required
router.post('/addnote',fetchuser,[
    body('title','Enter a valid title').isLength({ min: 3 }),
    body('description',"Description length should be min 5").isLength({ min: 5 }),],async (req,res)=>{
    console.log(req.body);
    // If there are errors , return Bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    try {
        const {title,description,tag} = req.body;
        const note = new Note({
            title,description,tag,user : req.user.id
        })
        const savedNote = await note.save();
        res.json(savedNote);
    } catch(error){
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
    
})
module.exports = router