const supertest = require("supertest");
const app = require("../../index");
import 'regenerator-runtime';  


test(" successfully sent Message ",   () => {
     const fullName = "abdelkader brahem"
     const message = "this message is for testing backend contact function "
     const email = ""
     const data = {  
        from: `brahemabdelkaderr@gmail.com`,              
        to: `associationtndarna@gmail.com`,              
        cc:  ` ${email}`,
        subject: 'contacter association Darna',          
        html: `<h1> je suis  ${fullName} </h1> <br>
        <p> ${message} </p>`
      };
      supertest(app)
      .post('/api/contact')
      .send(data)
      .expect(200)
      .then((res) => {
        expect(res.body.message).toBe("successfully sent!");
        expect(res.body.mailOptions).toBe(data);


       
      });
  
  });
