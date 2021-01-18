import mongoose from 'mongoose';
const Schema = mongoose.Schema;
export const DemandSchema = new Schema({
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
    createDate: {
        type: String
        //default: Date.now
    },
    photo: {
        type: String
    },
    renew:{
        type:Boolean
    }
}

)
