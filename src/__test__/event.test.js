const supertest = require("supertest");
const app = require("../../index");
const event = {
    nameEvent : "nameEvent",
    description : "description",
    dateBeginEvent: "dateBeginEvent",
    dateEndEvent: "dateEndEvent",
    numberMember: "numberMember",
    dateEndRegister: "dateEndRegister",
    createDate : "2020",

};
const validIDEvent = "5fc2ec5b3b3500f8fea598" 
const NonValidIdEvent = "5fc2ec5b3b3500f8f598" 
import 'regenerator-runtime';  

test(" add New Event successfully",   () => {
  
     supertest(app)
      .post('/api/add-event')
      .send(event)
      .expect(200)
      .then((res) => {
        expect(res.body.message).toBe("event added successfully");
        expect(res.body.nameEvent).toBe("nameEvent");
        expect(res.body.description).toBe("description");
       
      });
  
  });

  
  test(" get exist Event By Year",   () => {
    const data = {
        createDate : "2020",
   };
     supertest(app)
      .post('/api/getEventByYear/'+'2020')
      .send(data)
      .expect(200)
      .then((res) => {
        expect(res.body.event).toBe(event);
      });
  
  });

  test(" get exist Event By Year",   () => {
    const data = {
        createDate : "2023",
   };
     supertest(app)
      .post('/api/getEventByYear/'+'2020')
      .send(data)
      .expect(404)
      .then((res) => {
        expect(res.body.message).toBe("event not found  " + data);
      });
  
  });



  test(" delete Event with wrong ID",   () => {
     supertest(app)
      .post('/api/delete-event/:id'+NonValidIdEvent)
      .send(NonValidIdEvent)
      .expect(404)
      .then((res) => {
        expect(res.body.message).toBe("Event not found ");
      });
  
  });

  test(" delete Event successfully",   () => {
     supertest(app)
      .post('/api/getEventByYear/'+validIDEvent)
      .send(validIDEvent)
      .expect(200)
      .then((res) => {
        expect(res.body.message).toBe("Event deleted successfully!");
        expect(res.body.id).toBe("5fc2ec5b3b350130f8fea598");
      });
  });


test(" publish Event successfully",   () => {

     supertest(app)
      .post('/api/publish-event/'+validIDEvent)
      .send(validIDEvent)
      .expect(200)
      .then((res) => {
        expect(res.body.message).toBe("event publier");
        expect(res.body.id).toBe("5fc2ec5b3b350130f8fea598");
      });
  });

  test(" get Event  by ID  successfully",   () => {
       supertest(app)
      .post('/api/details-event/'+validIDEvent)
      .send(validIDEvent)
      .expect(200)
      .then((res) => {
        expect(res.body.event).toBe(event);
      });
  });

  test("get not found Event",   () => {
     supertest(app)
      .post('/api/details-event/'+NonValidIdEvent)
      .send(NonValidIdEvent)
      .expect(404)
      .then((res) => {
        expect(res.body.message).toBe("Event not found with id");
      });
  });

  test(" retrieving event with id with bad request ",   () => {
       supertest(app)
      .post('/api/details-event/'+NonValidIdEvent)
      .send(NonValidIdEvent)
      .expect(400)
      .then((res) => {
        expect(res.body.message).toBe("Error retrieving event with id " + NonValidIdEvent);
      });
  });

  
  test(" add New Comment with invalid  ID ",   () => {
    supertest(app)
   .post('/api/newComment/'+NonvalidIDEvent)
   .send(NonvalidIDEvent)
   .expect(404)
   .then((res) => {
     expect(res.body.message).toBe("Event not found with id " + NonvalidIDEvent);
   });
});

test(" add New Comment with invalid  ID event ",   () => {
  supertest(app)
 .post('/api/newComment/'+NonvalidIDEvent)
 .send(NonvalidIDEvent)
 .expect(404)
 .then((res) => {
   expect(res.body.message).toBe("Event not found with id " + NonvalidIDEvent);
 });
});

test(" add New Comment with valid  ID event ",   () => {
  const Comment = "comment for an event "
    supertest(app)
   .post('/api/newComment/'+validIDEvent)
   .send(validIDEvent)
   .expect(404)
   .then((res) => {
     expect(res.body.Comment).toBe(Comment);
   });
  });
  

  


