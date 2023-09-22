const { StatusCodes } = require('http-status-codes');
const noteModel = require('../models/noteModel.js')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId;

addNote = async (req, res) => {

    try {
        const { title, description, color, attachment, attachmentType } = req.body;
        console.log(attachment, 'attachment')
        const createNote = await noteModel.create({
            userId: req.user._id,
            title: title,
            description: description,
            color: color,
            attachment: attachment,
            attachmentType:attachmentType
        })
        return res.send({ status: true, msg: "Note Saved" })
    } catch (error) {
        console.log(error)
        return res.send({ status: false, msg: "Note unsaved something went wrong." })
    }

}

listNote = async (req, res) => {

    //pagination is completed but front-end is not ready yet
    const pageNumber = parseInt(req.query.pageNumber) || 1;
    const limit = parseInt(req.query.pageSize) || 20;
    const skip = (pageNumber - 1) * limit
    const sort = req.query.sort || -1
    const totalNumberOfRows = await noteModel.countDocuments({
        userId: req.user._id
    });

    const search = {}; // search query is done but to get query req is not ready yet

    if (req.query.search) {
        search.title = {
            $regex: req.query.search,
            $options: 'i'
        }
    }

    const notesData = await noteModel.find(search).sort({ _id: sort }).limit(limit).skip(skip)

    return res.status(200).send({
        status: true,
        totalPages: Math.ceil(totalNumberOfRows / limit),
        currentPageNumber: pageNumber,
        msg: "retrived data from notes",
        notes: notesData
    })
}

updateNote = async (req, res) => {
    try {
            const id = req.params.id
    const { title, description, color, attachment,attachmentType } = req.body;

    const updateNote = await noteModel.updateOne({
        _id:id
    },{
        title: title,
        description: description,
        color: color,
        attachment: attachment,
        attachmentType:attachmentType
    })
console.log(updateNote)
    return res.send({status:true, updateData:updateNote})
    } catch (error) {
        console.log(error)
    }

}


detailNote = async (req, res) => {
    const id = req.params.id

    const getNote = await noteModel.findOne({
        _id: id
    })
    
    return res.send({status:true, data:getNote})
}

deleteNote= async (req , res) =>{

    try {
            const id = req.params.id

    const deleteNote = await noteModel.deleteOne({
        userId: req.user._id,
        _id: id
    })
    res.status(200).send({
        status:true,
        msg:"note has been deleted"
    })
    } catch (error) {
        console.log(error)
        res.status(StatusCodes.BAD_GATEWAY).send({
            status:true,
            msg:"something went wrong deleted"
        })
    }
}

module.exports = {
    addNote,
    listNote,
    updateNote,
    detailNote,
    deleteNote
}