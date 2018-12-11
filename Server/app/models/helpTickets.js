var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var HelpTicketContentSchema = new Schema({
    personId: { type: Schema.Types.ObjectId },
    content: { type: String, require: true },
    dateCreated: { type: Date, default: Date.now },
    helpTicketId: { type: Schema.Types.ObjectId },
    file: {
        fileName: { type: String },
        originalFileName: { type: String }
    }
});

module.exports = Mongoose.model('HelpTicketContent', HelpTicketContentSchema);

var HelpTicketSchema = new Schema({
    title: { type: String },
    personId: { type: Schema.Types.ObjectId },
    ownerId: { type: Schema.Types.ObjectId },
    status: { type: String, enum: ['new', 'inProgress', 'closed'] },
    dateCreated: { type: Date, default: Date.now },
});

module.exports = Mongoose.model('HelpTicket', HelpTicketSchema);