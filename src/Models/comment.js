const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const commentSchema = new Schema({
    user: {
        type: String,
        //required: true
    },
    text: {
        type: String,
        required: true
    },
    photo: {
        type: String
    },
    date: {
        type: Date
    },
    owner:{
        type: Schema.Types.ObjectId,
        ref : 'Event'
    },
   /*  member:{
        type: Schema.Types.ObjectId,
        ref : 'Member'
    }, */
}
)
const Comment = mongoose.model('comment',commentSchema);
module.exports = Comment;  