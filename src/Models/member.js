import mongoose from 'mongoose';
const Schema = mongoose.Schema;
export const userSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number
    },
    birthDate: {
        type: Date
    },
    job: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    createDate :[{createDate:Number , etat:String}]
     ,
    expiredDate: {
        type: Date
       // default:Date.now
       },
    role: {
        type: String
    },
    status: {
        type: String
    },
    photo: {
        type: String
    },
    renew:{
        type:Boolean
    },
    currentYear:{
        type:Number
    },
    comment:[{
        type:  Schema.Types.ObjectId,
        ref :  'comment'
    }] ,
    eventToParticipate: [{ id:require('mongodb').ObjectID, nameEvent: String, photoEvent:String, locationEvent:String, stateEvent:String}]

})

