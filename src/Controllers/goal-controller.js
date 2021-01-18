import { ObjectID } from 'mongodb';
import mongoose from 'mongoose';
import { homeSchema } from '../Models/home';

import { goalSchema } from '../Models/goals'
const goalModel = mongoose.model('goalModel',goalSchema);


   
export const addGoal = (req, res) => {
    let newGoal= new goalModel(req.body)  
    newGoal.save((err, goalModel) => {
      if (err) {
        res.send(err);
      } else {
        res.status(200).json({
          message: "added successfully"
        });
      }
    })
  
  }
  export const deleteGoal = (req, res) => {
    const id = req.params.id;
    const ObjectId = require('mongodb').ObjectID;
    goalModel.deleteOne({ '_id': ObjectId(id) })
      .then((goal) => {
        if (!goal) {
          return res.status(404).send({
            message: "Event not found ",
          });
        }
        res.send({ message: " deleted successfully!" });
      })
  };
  
  

//get 
export const getAllGoals = (req, res) => {
  goalModel.find({}, (err, goal) => {
    if (err) {
      res.send(err);
    }
    res.json(goal);
  });
};

//modifier home
export const updateGoal = (req, res) => {
  const id = req.params.id;
  goalModel.findByIdAndUpdate({ '_id': id }, req.body, { new: true }, (err, goal) => {
    if (err) {
      res.send(err)
    }
    res.json(goal)
  }
  )
}

//afficher details 
export const getGoalById = (req, res) => {
  const id = req.params.id;
  const ObjectId = require('mongodb').ObjectID;
  goalModel.findOne({ '_id': ObjectId(id) }).then((goal) => {
    if (!goal) {
      return res.status(404).send({
        message: " not found with id " + id,
      });
    }
    res.status(200).send(goal);
  })
    .catch((err) => {
      return res.status(400).send({
        message: "Error retrieving  with id " + id,
      });
    });
};



   

