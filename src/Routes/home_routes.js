import {
    addHome,
    deleteHome,
    deletePresentation,
    getHome,
    getHomeById,
    updateHomePage,
} from '../Controllers/home-controller'

const routes_home = (app) => {
    app.route('/api/add-section-home')
        .post(addHome)
    app.route('/api/get-section-home')
        .get(getHome)
    app.route('/api/details-section-home/:id')
        .get(getHomeById)
    
    app.route('/api/delete-section-home/:id')
        .put(deleteHome)

    app.route('/api/update-section-home/:id')
        .put(updateHomePage)
        
    app.route('/api/delete-presentation-home/:id')
        .put(deletePresentation)

   
}

export default routes_home;
