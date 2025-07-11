const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Note = require('../models/Note');
const fetchuser = require('../middleware/fetchuser');

// ROUTE 1 : Get all notes using:  GET "/api/notes/fetchallnotes" . Login required

router.get('/fetchallnotes',fetchuser,async (req,res)=>{
    try {
        const notes = await Note.find({user : req.user.id})
        res.json(notes);
    }catch(error){
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
    
})

// ROUTE 2 : Add a new note using:  POST "/api/notes/addnote" . Login required
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
        const {title,description,tag,category} = req.body;
        const note = new Note({
            title,description,tag,category,user : req.user.id
        })
        const savedNote = await note.save();
        res.json(savedNote);
    } catch(error){
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
    
})

// ROUTE 3 : Update an existing note using:  PUT "/api/notes/updateNote" . Login required
router.put('/updateNote/:id',fetchuser,async (req,res)=>{
    try {        
        const {title,description,tag,category} = req.body;
        // Create a new note
        const newNote = {};
        if(title){newNote.title = title}
        if(description){newNote.description = description}
        if(tag){newNote.tag = tag}
        if(category !== undefined){newNote.category = category}

        // Find the note to be updated and update it
        let note = await Note.findById(req.params.id);
        if(!note){return res.status(404).send("Not Found")};

        // Allow updation only if user owns this note
        if(note.user.toString() != req.user.id){res.status(401).send("Not allowed")};
        note = await Note.findByIdAndUpdate(req.params.id,{$set : newNote},{new : true});
        res.json({note});
    }catch(error){
        console.error(error.message);
        res.status(500).send("Internal server error");
    }

    })

    // ROUTE 4 : Delete an existing note using:  PUT "/api/notes/DeleteNote" . Login required
    router.delete('/DeleteNote/:id',fetchuser,async (req,res)=>{

    try {
        // Find the note to be deleted and delete it
        let note = await Note.findById(req.params.id);
        if(!note){return res.status(404).send("Not Found")};
        
        // Allow deletion only if user owns this note
        if(note.user.toString() != req.user.id){res.status(401).send("Not allowed")};
        note = await Note.findByIdAndDelete(req.params.id);
        res.json({"Success" : "note has been deleted", "note" : note});
    } catch(error){
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
    
})

module.exports = router