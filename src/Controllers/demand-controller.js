import { ObjectID } from 'mongodb';
import mongoose from 'mongoose';
import { DemandSchema } from '../Models/demand';
import { userSchema } from '../Models/member';
const bcrypt = require('bcrypt');
const Demand = mongoose.model('Demand', DemandSchema);
const User = mongoose.model('User', userSchema);
const jwt = require('jsonwebtoken');

//ajouter demande apres registring
export const addNewDemand = (req, res) => {
  let user = Demand.findOne({ email: req.body.email }, (err, user) => {
    if (user) {
      res.status(505).json({
         "msg": "demand with this email already exist"
      });
    } else {
      let newDemand = new Demand(req.body)  
      var password = bcrypt.hashSync(req.body.password, 10);
      newDemand.password = password;
      newDemand.save((err, demand) => {
        if (err) {
          res.send(err);
        } else {
          res.status(200).json({
            message: "demand added successfully"
          });
        }
      });
    }
    

  })


}
// addNewUser(new user)
export const acceptDemand = (req, res) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, 'secretkey', (err, authData) => {
      if(err) {
        res.sendStatus(403);
      } else {
  req.body["_id"] = new ObjectID()
  req.body["role"] = "member";
  req.body["status"] = "actif";
 // req.body["renew"] = false;
  let d = new Date().getFullYear();
  let d1 = d + 1
  req.body["currentYear"] = d;
  req.body["createDate"] = [{createDate:d,etat:'last'}]
  console.log(req.body["createDate"]);
  let newUser = new User(req.body);
  newUser.save((err, user) => {
    if (err) {
      res.send(err);
    } else {
      res.status(201).json({
         "msg": "user added successfully"
      })
    }
  })
}}) }else {
  res.sendStatus(401);
}
}

//get toutes les demandes
export const getAllDemands = (req, res) => {
 
  Demand.find({}, (err, demand) => {
    if (err) {
      res.send(err);
    }
    res.json(demand);
  });

};

//get demande by id
export const getDemand = (req, res) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, 'secretkey', (err, authData) => {
      if(err) {
        res.sendStatus(403);
      } else {
  const id = req.params.id;
  const ObjectId = require('mongodb').ObjectID;

  Demand.findOne({
    '_id': ObjectId(id)
  }, (err, demand) => {
    if (err) {
      res.send(err);
    }
    res.json(demand);
  });
}}) }else {
  res.sendStatus(401);
}

};
//supprimer demande
export const deleteDemand = (req, res) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, 'secretkey', (err, authData) => {
      if(err) {
        res.sendStatus(403);
      } else {
  const id = req.params.id;
  const ObjectId = require('mongodb').ObjectID;
  Demand.deleteOne({
    '_id': ObjectId(id)
  }, (err, demand) => {
    if (err) {
      res.send(err);
    }
    res.json(demand);
  });
}}) }else {
  res.sendStatus(401);
}
}