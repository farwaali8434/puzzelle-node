const express = require("express");
const { puzzleSchema } = require("./schema");
const isAuth = require("../../middleware/isAuth");
const router  = express.Router();
const {createPuzzle, getPuzzleById, getAllPuzzles, editPuzzle, softDeletePuzzle} = require("./controllers")
const {createPuzzleSchema, editPuzzleSchema} = require("./validation")
const validate = require("./validation")

router.post('/',isAuth,validate(createPuzzleSchema), createPuzzle)
router.get('/:id', getPuzzleById)
router.get('/', getAllPuzzles)
router.put('/:id', isAuth, validate(editPuzzleSchema), editPuzzle)
router.patch('/:id', isAuth, softDeletePuzzle)

module.exports = router