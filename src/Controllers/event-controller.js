let eventModel = require("../Models/event.js")
let Comment = require("../Models/comment.js")
import { userSchema } from '../Models/member';
const User = mongoose.model('User', userSchema);
import { ObjectID } from 'mongodb';
import mongoose from 'mongoose';
const jwt = require('jsonwebtoken');
import express from 'express';
const Valid = "valide"
const NoValid = "non valide"
const refuse = "refusé"
//Event crud

//Add Event
export const addNewEvent = (req, res) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, 'secretkey', (err, authData) => {
      if(err) {
        res.sendStatus(403);
      } else {
  req.body["publish"] = false;
  let d = new Date().getFullYear();
  req.body["createDate"] = d;
  let newEvent = new eventModel(req.body);
  newEvent.save((err, event) => {
    if (err) {
      res.send(err);
    } else {
      res.status(200).json({
        message: "event added successfully" });
    }
  })}}) }else {
    res.sendStatus(401);
}
}

export const getEventByYear = (req, res) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, 'secretkey', (err, authData) => {
      if(err) {
        res.sendStatus(403);
      } else {
  let date = new Date();
  const createdDate = date.getFullYear();
  console.log(createDate)
  const createDate = req.params.createdDate;
  eventModel.find({ 'createDate': createDate }).populate('comment').then((event) => {
    if (event.createDate = createDate) {
      res.json(event)
      console.log(event)
    } else {
      return res.status(404).send({
        message: "event not found  " + createDate,
      });
    }
  })
}}) }else {
    res.sendStatus(401);
}
};


//supprimer Event
export const deleteEvent = (req, res) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, 'secretkey', (err, authData) => {
      if(err) {
        res.sendStatus(403);
      } else {
  const id = req.params.id;
  const ObjectId = require('mongodb').ObjectID;
  eventModel.deleteOne({ '_id': ObjectId(id) })
    .then((event) => {
      if (!event) {
        return res.status(404).send({
          message: "Event not found ",
        });
      }
      res.send({ message: "Event deleted successfully!" });
    })
  }}) }else {
    res.sendStatus(401);
}
};

export const publishEvent = (req, res) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, 'secretkey', (err, authData) => {
      if(err) {
        res.sendStatus(403);
      } else {
  const id = req.params.id;
  const ObjectId = require('mongodb').ObjectID; 
  eventModel.findOne({ '_id': ObjectId(id) })
    .then((event) => {
      console.log(event.publish)
      if (event.publish == false) {
        event.publish = true
        console.log(' event.publish : ', event.publish);
        event.save()
        res.send({ message: "event publier" });
     
      } else {
        res.send({ message: "error cannot make this action" });
      }
    })
  }}) }else {
    res.sendStatus(401);
}
}

//affisher details d'un event
export const getEvent = (req, res) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, 'secretkey', (err, authData) => {
      if(err) {
        res.sendStatus(403);
      } else {
  const id = req.params.id;
  const ObjectId = require('mongodb').ObjectID;
  eventModel.findOne({ '_id': ObjectId(id) }).then((event) => {
    if (!event) {
      return res.status(404).send({
        message: "Event not found with id " + id,
      });
    }
    res.status(200).send(event);
  })
    .catch((err) => {
      return res.status(400).send({
        message: "Error retrieving event with id " + id,
      });
    })
  }}) }else {
    res.sendStatus(401);
}
};

export const participateEvent = (req, res) => {
  const id = req.params.id;
  const ObjectId = require('mongodb').ObjectID;
  eventModel.findOne({ '_id': ObjectId(id) })
    .then((event) => {
      User.findOne({'email':req.body.userConnect})
      .then
      ((user) =>{
        event.participants.push({ "emailP": req.body.userConnect,"fullName":user.fullName, "etat": NoValid });
      event.save();
      user.eventToParticipate.push({ "id": event._id,"nameEvent":event.nameEvent,"photoEvent":event.photo,"locationEvent":event.lieu,"stateEvent":"en attente" });
      user.save();})
    })
    
};

//valider participant
export const validateParticipate = (req, res) => {
  const id = req.params.id;
  const ObjectId = require('mongodb').ObjectID;
  eventModel.findOne({ '_id': ObjectId(id) })
    .then((event) => { 
      event.participants.forEach(function(element) {
        if(element.emailP==req.body.email)
          {
          (element.set({"etat": Valid}))
          }
      });
      event.save();
    });
      User.findOne({'email':req.body.email})
          .then((user) =>{
            user.eventToParticipate.forEach(function(u) {
              if(u.id==id)
                {
                  //console.log("9a3ed yodkhol lel")
                (u.set({"stateEvent": Valid}))
                
                }
                
            });
            user.save();
    })
  
  };

//ne pas valider participant
export const noValidateParticipate = (req, res) => {
  const id = req.params.id;
  const ObjectId = require('mongodb').ObjectID;
  eventModel.findOne({ '_id': ObjectId(id) })
    .then((event) => { 
      event.participants.forEach(function(element) {
        if(element.emailP==req.body.email)
        {
          (element.set({"etat":refuse}))
          event.save();}  
      });
    })
      User.findOne({'email':req.body.email})
      .then((user) =>{
        user.eventToParticipate.forEach(function(u) {
          if(u.id==id)
            {
            (u.set({"stateEvent": refuse}))
            
            }
            
        });
        user.save();
    })
  
};


//modifier Event
export const updateEvent = (req, res) => {
  const id = req.params.id;
  eventModel.findByIdAndUpdate({ '_id': id }, req.body, { new: true }, (err, event) => {
    if (err) {
      res.send(err)
    }
    res.json(event)
  }
  )
}
export const getCommentEventById = (req, res) => {
  const id = req.params.id;
  const ObjectId = require('mongodb').ObjectID;
  eventModel.findOne({'_id': ObjectId(id) }).populate('comment').then((event) => {
    if (!event) {
      return res.status(404).send({
        message: "Event not found with id " + id,
      });
    }
    res.status(200).json(event.comment);
  })
}
export const addNewComment = (req, res,next) => {
  //create new comment
  let newComment = new Comment(req.body);
  //get event by id
  const id = req.params.id;
  const ObjectId = require('mongodb').ObjectID;
  eventModel.findOne({ '_id': ObjectId(id) }).then((event) => {
    if (!event) {
      return res.status(404).send({
        message: "Event not found with id " + id,
      });
    }
      //assigned comment to event
    newComment.owner = event;
    //save comment 
    newComment.save();
    //add comment to event in array comment
    event.comment.push(newComment);
    //save event
    event.save();
    res.status(200).json(newComment);
  })  
}
export const deleteComment = (req, res) => {
  const id = req.params.id;
  const ObjectId = require('mongodb').ObjectID;
  Comment.deleteOne({ 'owner': ObjectId(id) })
    .then((event) => {
      if (!event) {
        return res.status(404).send({
          message: "comm not found ",
        });
      }       
      res.send({ message: "comm deleted successfully!" });
    })
};

export const updateComment = (req, res) => {
  const id = req.params.id;
  Comment.findByIdAndUpdate({ 'owner': id }, req.body, { new: true }, (err, event) => {
    if (err) {
      res.send(err)
    }
    res.json(event)
  }
  )
}

export const getUser = (req, res) => {
  //console.log("auth user");
  var email = req.body.email;
  let user = User.findOne({ email: email }, function (err, user) {
    if (err) {
      console.log(err)
    }
    else{
      res.send(user)
     console.log("ddddddddddddddddd",user);
    } 
  });
};