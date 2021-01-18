import { ObjectID } from 'mongodb';
import mongoose from 'mongoose';
import { userSchema } from '../Models/member';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = mongoose.model('User', userSchema);

//member crud
export const addNewMember = (req, res) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, 'secretkey', (err, authData) => {
      if(err) {
        res.sendStatus(403);
      } else {
  let user = User.findOne({ email: req.body.email }, (err, user) => {
    if (user) {
      res.status(409).json({
         "msg": "member already exist"
      });
    }
    else {
      let date = new Date();
     // req.body["renew"] = false;
      req.body["role"] = "member";
      req.body["status"] = "actif";
      let d = new Date().getFullYear();
      req.body["currentYear"] = d;
      req.body["createDate"] = [{createDate:d,etat:'last'}]
      let newUser = new User(req.body);
      var password = bcrypt.hashSync(req.body.password, 10);
      newUser.password = password;
      newUser.save((err, user) => {
        if (err) {
          res.send(err);
        } else {
          res.json({
            "code": "200", "msg": "member added successfully"
          })
        }
      })
    }
   })}}) }else {
    res.sendStatus(401);
}

};


export const getAllMember = (req, res) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, 'secretkey', (err, authData) => {
      if(err) {
        res.sendStatus(403);
      } else {
  User.find({}, (err, user) => {
    if (err) {
      res.send(err);
    }
    // console.log(res)
    res.json(user);
  })
}}) }else {
    res.sendStatus(401);
}
};
export const getAllMemberYears = (req, res) => {
  User.find({createDate}, (err, user) => {
    if (err) {
      res.send(err);
    }
     console.log(res)
    res.json(user.createDate);
  });
};

//affisher details d'un membre
export const getMember = (req, res) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, 'secretkey', (err, authData) => {
      if(err) {
        res.sendStatus(403);
      } else {

  const id = req.params.id;
  const ObjectId = require('mongodb').ObjectID;
  User.findOne({ '_id': ObjectId(id) }).then((user) => {
    if (!user) {
      return res.status(404).send({
        message: "User not found with id " + id,
      });
    }
    res.status(200).send(user);
    // console.log(user);
  })
    .catch((err) => {
      return res.status(500).send({
        message: "Error retrieving user with id " + id,
      });
    })}})} else {
      res.sendStatus(401);
  }
};
export const getMemberByYear = (req, res) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, 'secretkey', (err, authData) => {
      if(err) {
        res.sendStatus(403);
      } else {

  let date = new Date();
  let createdDate = date.getFullYear();
  console.log(createdDate)
  const createDate = req.params.createdDate;
  console.log(createDate)
  User.find({ 'createDate.createDate': createDate }).then((user) => {
    if (user.createDate= createDate) {
      res.json(user)
      console.log(user)
    } })}}) }else {
      res.sendStatus(401);
  }
 

  
};
//supprimer membre
export const deleteMember = (req, res) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, 'secretkey', (err, authData) => {
      if(err) {
        res.sendStatus(403);
      } else {
  const id = req.params.id;
  const ObjectId = require('mongodb').ObjectID;
  User.deleteOne({ '_id': ObjectId(id) })
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: "User not found ",
        });
      }
      res.send({ message: "User deleted successfully!" });
     })}}) }else {
      res.sendStatus(401);
  }
};
//modifier member
export const updateMember = (req, res) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, 'secretkey', (err, authData) => {
      if(err) {
        res.sendStatus(403);
      } else {
  const id = req.params.id;
  // const ObjectId  = require('mongodb').ObjectID;
  User.findByIdAndUpdate({ _id: id }, req.body, { new: true }, (err, user) => {
    if (err) {
      res.send(err)
    }
    res.json(user)
  }
  )   }}) }else {
    res.sendStatus(401);
}
}
export const updateStateMember = (req, res) => {
   const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, 'secretkey', (err, authData) => {
      if(err) {
        res.sendStatus(403);
      } else {
  const id = req.params.id;
  const ObjectId = require('mongodb').ObjectID;
  User.findOne({ '_id': ObjectId(id) })
    .then((user) => {
      if (user.status == "actif") {
        user.status = "banni"
        user.save()
        res.send({ message: "member banni" });
      }
      else if (user.status == "banni") {
        user.status = "actif"
        user.save()
        res.send({ message: "member actif" });
      }

      else {
        res.send({ message: "error cannot make this action" });

      }
    }) }}) }else {
      res.sendStatus(401);
  }

}

export const renewMember = (req, res) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, 'secretkey', (err, authData) => {
      if(err) {
        res.sendStatus(403);
      } else {
  const id = req.params.id;
  let date = new Date();
  let createdDate = date.getFullYear();
  console.log(createdDate)
  const ObjectId = require('mongodb').ObjectID;
  User.findOne({ '_id': ObjectId(id) })
    .then((user) => {
      user.createDate.push({ "createDate": createdDate ,"etat":'new'});
     // user.currentYear=createdDate
       // user.renew =true;
      user.save()
   
        user.createDate.forEach(function(element) {
          if(element.createDate!=createdDate)
          {
           // console.log(createdDate-1)
            (element.set({"etat":'last'}))
          
          }  
        });
 // res.send({ message: "member renouvelé" });
    })}}) }else {
      res.sendStatus(401);
  }
}

//login
export const loginMember = (req, res) => {
  console.log("auth user");
  var password = req.body.password;
  var email = req.body.email;
  let user = User.findOne({ email: email }, function (err, user) {
    if (err) {
      console.log(err)
      res.sendStatus(500);
    }
    if (user) {
      if (bcrypt.compareSync(password, user.password)) {
        jwt.sign({ user }, 'secretkey', (err, token) => {
          res.status(200).json({
            "msg": "login successfully",
            token, user
          });
          res.send(token);
        });
      } else {
        res.status(204).json({ "msg": "password incorrect" });
        console.log(res.statusCode)
      }
    } else {
      res.status(204).json({ "msg": "email incorrect" });
    }
  });
};
export const checkPassword = (req, res) => {
  const _id = req.params.id;
  var password = req.body.password;
  let user = User.findOne({ _id: _id }, function (err, user) {
    if (err) {
      console.log(err)
      res.sendStatus(500);
    }
    if (user) {
      if (bcrypt.compareSync(password, user.password)) {
          res.json({
            "code": "200", "msg": "login succ",
          });
      } else {
        res.json({ "code": "204", "msg": "password incorrect" });
      }
    } 
  });
};
// 
export const saveNewPassword = (req, res) => {
  const id = req.params.id;
  User.findOne({ _id:id }, function (err, user) {
    if (err) {
      console.log(err)
      res.sendStatus(500);
    }
      if(user) {
        user.password = bcrypt.hashSync(req.body.newPassword, 10);
        user.save()
        res.json({"code": "200", "msg": "save password succ",});
        
      }
  })

}

// FORMAT OF TOKEN
// Authorization: Bearer <access_token>

// Verify Token
export function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers['authorization'];
  // Check if bearer is undefined
  if (typeof bearerHeader !== 'undefined') {
    // Split at the space
    const bearer = bearerHeader.split(' ');
    // Get token from array
    const bearerToken = bearer[1];
    // Set the token
    req.token = bearerToken;
    // Next middleware
    next();
  } else {
    // Forbidden
    res.sendStatus(403);
  }

};
