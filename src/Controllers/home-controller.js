import { ObjectID } from 'mongodb';
import mongoose from 'mongoose';
import { homeSchema } from '../Models/home';
const  home = mongoose.model('home', homeSchema);
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


//ajouter demande apres registring
export const addHome = (req, res) => {
      let newHome = new home(req.body)  
      newHome.save((err, home) => {
        if (err) {
          res.send(err);
        } else {
          res.status(200).json({
            message: "added successfully"
          });
        }
      })

  }



//get 
export const getHome = (req, res) => {
  home.find({}, (err, home) => {
    if (err) {
      res.send(err);
    }
    res.json(home);
  });
};

//modifier home
export const updateHomePage = (req, res) => {
  const id = req.params.id;
  home.findByIdAndUpdate({ '_id': id }, req.body, { new: true }, (err, Home) => {
    if (err) {
      res.send(err)
    }
    res.json(Home)
  }
  )
}
//delete presentation
//supprimer 

export const deleteHome= (req, res) => {
  const id = req.params.id;
  const ObjectId = require('mongodb').ObjectID;
  home.findOne({ '_id': ObjectId(id) })
  .then((Home) => {
  
    Home.title= "";   
    Home.description = ""; 
    Home.phone = null; 
    Home.rib = null; 
    Home.photo = ""; 
      Home.save()
      res.send({ message: "supprimé" });

  })

}

export const deletePresentation = (req, res) => {
  const id = req.params.id;
  const ObjectId = require('mongodb').ObjectID;
  home.findOne({ '_id': ObjectId(id) })
    .then((Home) => {
      console.log(Home.presentation)
      if (Home.presentation !== "") {
        Home.presentation = "";
        Home.save()
        res.send({ message: "supprimé" });
      } else {
        res.send({ message: "error cannot make this action" });
      }
    })

}
//afficher details 
export const getHomeById = (req, res) => {
  const id = req.params.id;
  const ObjectId = require('mongodb').ObjectID;
  home.findOne({ '_id': ObjectId(id) }).then((Home) => {
    if (!Home) {
      return res.status(404).send({
        message: " not found with id " + id,
      });
    }
    res.status(200).send(Home);
  })
    .catch((err) => {
      return res.status(400).send({
        message: "Error retrieving  with id " + id,
      });
    });
};


   

