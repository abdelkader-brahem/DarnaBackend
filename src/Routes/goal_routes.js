import {   
addGoal,
getGoalById , 
getAllGoals,
updateGoal,
deleteGoal
} from '../Controllers/goal-controller'

const routes_goal= (app) => {

    app.route('/api/add-goal')
        .post(addGoal)
    app.route('/api/all-goals')
        .get(getAllGoals)
    app.route('/api/details-goal/:id')
        .get(getGoalById)
    app.route('/api/update-goal/:id')
        .put(updateGoal)
    app.route('/api/delete-goal/:id')
        .delete(deleteGoal)
   
}

export default routes_goal;
