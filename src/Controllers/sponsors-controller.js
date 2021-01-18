import { ObjectID } from 'mongodb';
import mongoose from 'mongoose';

import { sponsorsSchema } from '../Models/sponsors'
const sponsors= mongoose.model('sponsors',sponsorsSchema);


   
export const addSponsor = (req, res) => {
    let newGoal= new sponsors(req.body)  
    newGoal.save((err, sponsors) => {
      if (err) {
        res.send(err);
      } else {
        res.status(200).json({
          message: "added successfully"
        });
      }
    })
  
  }
  export const deleteSponsor = (req, res) => {
    const id = req.params.id;
    const ObjectId = require('mongodb').ObjectID;
    sponsors.deleteOne({ '_id': ObjectId(id) })
      .then((spon) => {
        if (!spon) {
          return res.status(404).send({
            message: "sponsor not found ",
          });
        }
        res.send({ message: " deleted successfully!" });
      })
  };
  
  

//get 
export const getAllSponsors= (req, res) => {
  sponsors.find({}, (err, spon) => {
    if (err) {
      res.send(err);
    }
    res.json(spon);
  });
};

//modifier home
export const updateSponsor = (req, res) => {
  const id = req.params.id;
  sponsors.findByIdAndUpdate({ '_id': id }, req.body, { new: true }, (err, spon) => {
    if (err) {
      res.send(err)
    }
    res.json(spon)
  }
  )
}

//afficher details 
export const getSponsorById = (req, res) => {
  const id = req.params.id;
  const ObjectId = require('mongodb').ObjectID;
  sponsors.findOne({ '_id': ObjectId(id) }).then((spon) => {
    if (!spon) {
      return res.status(404).send({
        message: " not found with id " + id,
      });
    }
    res.status(200).send(spon);
  })
    .catch((err) => {
      return res.status(400).send({
        message: "Error retrieving  with id " + id,
      });
    });
};



   

