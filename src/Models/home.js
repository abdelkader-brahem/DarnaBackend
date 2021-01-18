import mongoose from 'mongoose';
const Schema = mongoose.Schema;
export const homeSchema = new Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    phone: {
        type: Number
    },
    rib: {
        type: Number
    },
    photo: {
        type: String
    },
    presentation: {
        type: String,
    },
  
}

)
