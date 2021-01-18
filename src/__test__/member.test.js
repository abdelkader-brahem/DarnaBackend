
const supertest = require("supertest");
const app = require("../../index");

test("test add New Member already exist", () => {
  const data = {
    role: "member",
    status: "active",
    CreateDate: Date.now(),
  };
  supertest(app)
    .post('/AddMember')
    .send(data)
    .expect(409)
    .then((res) => {
      expect(res.body.message).toBe("member already exist");
      expect(res.body.role).toBe("member");
      expect(res.body.status).toBe("active");
    });
});

/////////////////////////////////////////////////
test("test add New Member", () => {
  const data = {
    role: "member",
    status: "active",
    Create_date: Date.now(),
  };
  supertest(app)
    .post('/AddMember')
    .send(data)
    .expect(200)
    .then((res) => {
      expect(res.body.message).toBe("member added successfully");
      expect(res.body.role).toBe("member");
      expect(res.body.status).toBe("active");
    });
});



//test login member  /////////////////////////////////
test("test login with incorrect mail  ", () => {
  const data = {
    email: "sdfghgfsh@gmail.com",
    password: "gfdhbfg"
  };
  supertest(app)
    .post('/login')
    .send(data)
    .expect(401)
    .then((res) => {
      expect(res.body.message).toBe("email incorrect");
      expect(res.body.email).toBe("sdfghgfsh@gmail.com");
      expect(res.body.password).toBe("gfdhbfg");
    });
});


//test login member  /////////////////////////////////
test("test login with incorrect password  ", () => {
  const data = {
    email: "brahemabdelkaderr@gmail.com",
    password: "gfdhbfg"
  };
  supertest(app)
    .post('/login')
    .send(data)
    .expect(200)
    .then((res) => {
      expect(res.body.message).toBe("password incorrect");
    });
});


//test login member  /////////////////////////////////
test("test login with correct mail and  password  ", () => {
  const data = {
    email: "brahemabdelkaderr@gmail.com",
    password: "123456"
  };
  supertest(app)
    .post('/login')
    .send(data)
    .expect(200)
    .then((res) => {
      expect(res.body.message).toBe("login success");
      expect(res.body.email).toBe("brahemabdelkaderr@gmail.com");
      expect(res.body.password).toBe("123456");
    });
});



//test bannir member  is noot active  /////////////////////////////////
test("test Bannir Member is not active", () => {
  const data = {
    email: "brahemabdelkaderr@gmail.com",
    password: "123456"
  };
  supertest(app)
    .post('/login')
    .send(data)
    .expect(200)
    .then((res) => {
      expect(res.body.message).toBe("error canno't make this action");
      expect(res.body.email).toBe("brahemabdelkaderr@gmail.com");
      expect(res.body.password).toBe("123456");
    });
});

//test bannir member active  /////////////////////////////////
test("test Bannir Member active", () => {
  const data = {
    email: "brahemabdelkaderr@gmail.com",
    password: "123456",
    status: "active"
  };
  supertest(app)
    .post('/login')
    .send(data)
    .expect(200)
    .then((res) => {
      expect(res.body.message).toBe("member banni");
      expect(res.body.email).toBe("brahemabdelkaderr@gmail.com");
      expect(res.body.password).toBe("123456");
      expect(res.body.status).toBe("active");
    });
});
