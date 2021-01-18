const supertest = require("supertest");
const app = require("../../index");


test("Uploaded image  successfully ", () => {
    const data = {
        originalName : "test.jpg",
        path: "active",
        _id:"5fc2ec5b3b3500f8fea598"
    };
    supertest(app)
      .post('/api/uploadFile')
      .send(data)
      .expect(200)
      .then((res) => {
        expect(res.body.message).toBe("Uploaded the file successfully");
        expect(res.body.file.originalName).toBe(data.originalName);
        expect(res.body.file.path).toBe(data.path);
        expect(res.body.file._id).toBe(data._id);
        

      });
  });
  

  test("Uploaded image  successfully ", () => {
    const data = {
        name : "anynoyme.png",
        path: "active",
        _id:"5fc2ec5b3b3500f8fea598"
    };
    supertest(app)
      .post('/api/getfile/:name')
      .send(data)
      .expect(200)
      .then((res) => {
        expect(res.body.message).toBe("Uploaded the file successfully");
        expect(res.body.file.originalname).toBe(data.originalname);
        expect(res.body.file.path).toBe(data.path);
        expect(res.body.file._id).toBe(data._id);
        

      });
  });