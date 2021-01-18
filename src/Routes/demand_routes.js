import {
    addNewDemand,
    acceptDemand,
    getAllDemands,
    deleteDemand,
    getDemand,
} from '../Controllers/demand-controller'

const routes_demand = (app) => {
    app.route('/api/register')
        .post(addNewDemand)

    app.route('/api/listDemands')
        .get(getAllDemands)

    app.route('/api/getDemandById/:id')
        .get(getDemand)

    app.route('/api/deleteDemand/:id')
        .get(deleteDemand)

    app.route('/api/acceptDemand')
        .post(acceptDemand)
    //routes members
}
export default routes_demand;
