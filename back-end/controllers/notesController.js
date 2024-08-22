const Note = require("../models/Notes");

// get all notes
const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user._id }).sort({ isPinned: -1 });

    return res.json({
      error: false,
      notes: notes,
      message: "all notes retrieved succesfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: true, message: "internal server error" });
  }
};

// creating new notes
const createNewNote = async (req, res) => {
  const { title, content, tags } = req.body;

  if (!title) {
    return res.status(400).json({ error: true, message: "title is required" });
  }
  if (!content) {
    return res.status(400).json({ error: true, message: "content is empty" });
  }
  try {
    const note = await Note.create({
      title,
      content,
      tags: tags || [],
      userId: req.user._id,
      isPinned: false,
    });
    return res.json({ error: false, note, message: "note added successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: true, message: "internal server error" });
  }
};
// update note
const updateNote = async (req, res) => {
  const { noteId } = req.params;
  const { title, content, tags } = req.body;
  const { user } = req.user;

  if (!title && !content && !tags) {
    return res
      .status(400)
      .json({ error: true, message: "no changes provided" });
  }
  try {
    const note = await Note.findOne({ _id: noteId, userId: user._id });
    if (!note) {
      return res.return(400).json({ error: true, message: "Note not found" });
    }
    if (title) note.title = title || note.title;
    if (content) note.content = content || note.content;
    if (tags) note.tags = tags || note.tags;
    if (isPinned) note.isPinned = isPinned;
    await note.save();
    return res.json({
      error: false,
      note,
      message: "note updated succesfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: true, message: "Internal server error" });
  }
};
//delete note
const deleteNote = async (req, res) => {
  const noteId = req.params.noteId;
  
  try {
    const note = await Note.findByIdAndDelete(noteId);
    if (!note) {
      return res.status(400).json({ error: true, message: "note not found" });
    }
    return res.json({ error: false, message: "note deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: true, message: "internal sever error" });
  }
};
// updating isPinned value
const updateIsPinned = async (req, res) => {
    const { noteId } = req.params;
  const { isPinned} = req.body;
  const { user } = req.user;

 
  try {
    const note = await Note.findOne({ _id: noteId, userId: user._id });
    if (!note) {
      return res.return(400).json({ error: true, message: "Note not found" });
    }
  
    note.isPinned = isPinned;
    await note.save();
    return res.json({
      error: false,
      note,
      message: "note updated succesfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: true, message: "Internal server error" });
  }
}

module.exports = { getAllNotes, createNewNote, updateNote, deleteNote ,updateIsPinned};
