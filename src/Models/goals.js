import mongoose from 'mongoose';
const Schema = mongoose.Schema;
export const goalSchema = new Schema({
    goal: {
        type: String,
        required: true

    },
  
  
}

)
