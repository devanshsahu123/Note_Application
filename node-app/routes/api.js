const express = require("express")

const handlerValidationErrors = require("../validations/handleValidationErrors.js");
const authMiddleware = require('../middleware/authMiddleware.js')
const noteValidation = require('../validations/noteValidation.js')

const authValidation = require('../validations/authValidation.js')
const authController = require("../controllers/authController.js")
const noteController = require('../controllers/noteController.js')

const router = express.Router()


router.post('/sign-up',
    authValidation.signUpValidationRules,
    handlerValidationErrors,
    authController.signUpController
)

router.post('/login',
    authValidation.logInValidationRules,
    handlerValidationErrors,
    authController.logInController
)

router.use(authMiddleware);

router.post('/add-note',
    noteValidation.addNoteValidationRules,
    handlerValidationErrors,
    noteController.addNote
)

router.post('/update-note/:id',
    noteValidation.updateNoteValidationRules,
    handlerValidationErrors,
    noteController.updateNote
)

router.get('/detail-note/:id',
    noteValidation.detailNoteValidationRules,
    handlerValidationErrors,
    noteController.detailNote
)


router.get('/list-note', noteController.listNote)

router.delete('/delete-note/:id',
    noteValidation.deleteNoteValidationRules,
    handlerValidationErrors,
    noteController.deleteNote)




module.exports = router