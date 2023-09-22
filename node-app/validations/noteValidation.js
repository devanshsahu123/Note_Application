const { body, param } = require("express-validator");
const mongoose = require('mongoose')
const noteModel = require("../models/noteModel.js")
const ObjectId = mongoose.Types.ObjectId;

addNoteValidationRules = [
    body('title').isString().withMessage('title must be string'),
    body('description').isString().withMessage('description must be string'),
    body('color').isString().withMessage('color must be string'),
    body('attachmentType').isString().custom((attachmentType) => {
        if (attachmentType == "video" || attachmentType == "image" || attachmentType == 'unknow' || attachmentType=='') {
            return true
        }
        throw new Error("attachment error")
    }).withMessage('attachmentType error'),

    body('attachment').custom((attachment) => {

        if (attachment == '' || attachment == null) return true

        const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w\.-]*)*\/?$/;
        if (urlRegex.test(attachment)) return true

        return false
    }).withMessage('attachment must be an url'),
]

updateNoteValidationRules = [
    body('title').isString().withMessage('title must be string'),
    body('description').isString().withMessage('description must be string'),
    body('color').isString().withMessage('color must be string'),
    body('attachment').custom((attachment) => {

        if (attachment == '' || attachment == null) return true
      
        const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w\.-]*)*\/?$/;
        if (urlRegex.test(attachment)) return true

        return false
    }).withMessage('attachment must be an url'),
    body('attachmentType').isString().custom((attachmentType) => {
        if (attachmentType == "video" || attachmentType == "image" || attachmentType == 'unknow' || attachmentType == undefined || attachmentType=="") {
            return true
        }
        throw new Error("attachment error")
    }).withMessage('attachmentType error'),

    param('id').isString().withMessage('id must be string').custom(async (id) => {
        const checkNote = await noteModel.countDocuments({
            _id: id
        })
        if (checkNote <= 0) {
            throw new Error('Note document not found !!!')
        }
        return true
    })
]

detailNoteValidationRules = [
    param('id').isString().withMessage('id must be string').custom(async (id, { req }) => {
        const filter = { _id: new ObjectId(`${id}`) };

        const checkNote = await noteModel.countDocuments({
            _id: filter,
            userId: req.user._id
        })
       
        if (checkNote <= 0) {
            throw new Error('Note document not found !!!')
        }
        console.log(checkNote)
        return true
    }).withMessage("id error")
]

deleteNoteValidationRules =[
    param('id').isString().withMessage('id must be string').custom(async (id, { req }) => {
        const filter = { _id: new ObjectId(`${id}`) };
        const checkNote = await noteModel.countDocuments({
            _id: filter,
            userId: req.user._id
        })
       
        if (checkNote <= 0) {
            throw new Error('Note document not found !!! May be already deleted')
        }
        
        return true
    }).withMessage("id error")
]

module.exports = {
    addNoteValidationRules,
    updateNoteValidationRules,
    detailNoteValidationRules,
    deleteNoteValidationRules
}