import {
     addSponsor,
     deleteSponsor, 
     getAllSponsors,
      getSponsorById, 
      updateSponsor 
    } from '../Controllers/sponsors-controller'

const routes_sponsor= (app) => {

   app.route('/api/add-sponsor')
       .post(addSponsor)
   app.route('/api/all-sponsors')
       .get(getAllSponsors)
   app.route('/api/details-sponsor/:id')
       .get(getSponsorById)
   app.route('/api/update-sponsor/:id')
       .put(updateSponsor)
   app.route('/api/delete-sponsor/:id')
       .delete(deleteSponsor)
  
}

export default routes_sponsor;
