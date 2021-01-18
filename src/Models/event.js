import mongoose from 'mongoose';
const Schema = mongoose.Schema;
export const EventSchema = new Schema({
    nameEvent: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    lieu: {
        type: String,
        required: true
    },
    dateBeginEvent: {
        type: Date,
        required: true
    },
    dateEndEvent: {
        type: Date,
        required: true
    },
    numberMember: {
        type: Number,
        required: true
    },
    dateBeginRegister: {
        type: Date,
    },
    dateEndRegister: {
        type: Date,
        required: true
    },
    photo: {
        type: String
    },
    participants: [{ emailP: String, fullName: String, etat: String }],
    publish: {
        type: Boolean
    },
    createDate: {
        type: Number
        //default: Date.now
    },
    comment:[{
        type:  Schema.Types.ObjectId,
        ref :  'comment'
    }] 

}
)
const eventModel = mongoose.model('Event',EventSchema);
module.exports = eventModel ;
