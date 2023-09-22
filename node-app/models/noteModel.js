const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    userId: {
      
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    description: { type: String},
    title: { type: String},
    color: { type: String },
    attachment:{ type: String },
    attachmentType:{ type:String}
 });

 const noteModel = mongoose.model('Note', noteSchema);

module.exports = noteModel;