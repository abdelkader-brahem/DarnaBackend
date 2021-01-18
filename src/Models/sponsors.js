import mongoose from 'mongoose';
const Schema = mongoose.Schema;
export const sponsorsSchema = new Schema({
    lien: {
        type: String,
        required: true

    },
     photo: {
        type: String,
        required: true

    },

  
  
}

)
