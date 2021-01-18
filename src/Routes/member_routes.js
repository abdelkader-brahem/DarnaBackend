import {
    loginMember,
    addNewMember,
    getMember,
    getAllMember,
    deleteMember,
    updateMember,
    renewMember,
    getMemberByYear,
    updateStateMember,
    getAllMemberYears,
   
    checkPassword,
    saveNewPassword
} from '../Controllers/member_controller'


const routes_member = (app) => {
    app.route('/api/addMember')
        .post(addNewMember)

    app.route('/api/detailsMember/:id')
        .get(getMember)

    app.route('/api/listMember')
        .get(getAllMember)
        app.route('/api/listMemberyears')
        .get(getAllMemberYears)
    app.route('/api/deleteMember/:id')
        .delete(deleteMember)

    app.route('/api/updateMember/:id')
        .put(updateMember)
    app.route('/api/updateStateMember/:id')
        .put(updateStateMember)  
    //public routes
    app.route('/api/login')
        .post(loginMember)
     app.route('/api/renewMember/:id')
     .put(renewMember)
     app.route('/api/getMemberByYear/:createdDate')
     .get(getMemberByYear)
    //  /checkPassword/
    app.route('/api/checkPassword/:id')
    .put(checkPassword)
    // saveNewPassword
    app.route('/api/saveNewPassword/:id')
    .put(saveNewPassword)
}
export default routes_member;
