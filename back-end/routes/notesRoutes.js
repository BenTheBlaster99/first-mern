const express = require("express");

const {
  getAllNotes,
  createNewNote,
  updateNote,
  deleteNote,
  updateIsPinned,
} = require("../controllers/notesController");
const authentication = require("../middleware/auth");
// const  route  = require("./userRoutes");
const router = express.Router();
router.use(authentication);

router.route("/api/notes").get(getAllNotes).post(createNewNote);
router.route("/api/notes/:id").put(updateNote).delete(deleteNote);
router.route("/api/notes/:id/pin").put(updateIsPinned);

module.exports = router;
