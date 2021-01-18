const supertest = require("supertest");
const app = require("../../index");
import 'regenerator-runtime';  

test(" add New  demand successfully ",   () => {
    const data = {
      fullName: "addUser",
      email: "userToAdd@gmail.com",
      password: "added",
    };
     supertest(app)
      .post('/register')
      .send(data)
      .expect(200)
      .then((res) => {
        expect(res.body.message).toBe("demand added successfully");
        expect(res.body.fullName).toBe("addUser");
        expect(res.body.email).toBe("userToAdd@gmail.com");
       
      });
  
  });


test("add New Demand with existance mail ", () => {
  const data = {
    fullName: "addUser",
    email: "brahemabdelkaderr@gmail.com",
    password: "added",
  };
  supertest(app)
    .post('/register')
    .send(data)
    .expect(200)
    .then((res) => {
      expect(res.body.message).toBe("demand with this email already exist");
      expect(res.body.fullName).toBe("addUser");
      expect(res.body.email).toBe("brahemabdelkaderr@gmail.com");
    });
});

//////////////////////////////////////////////////////////////////////////////////////


test("test  Demand accepted", () => {
  const data = {
    //_id: new ObjectID(),
    role: "member",
    status: "active",
    CreateDate: Date.now(),
  };
  supertest(app)
    .post('/acceptDemande')
    .send(data)
    .expect(201)
    .then((res) => {
      expect(res.body.message).toBe("user added successfully");
      expect(res.body.role).toBe("member");
      expect(res.body.status).toBe("active");

    });
});




