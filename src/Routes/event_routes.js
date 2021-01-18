import { deleteModel } from 'mongoose'
import {
    addNewEvent,
    getEvent,
    deleteEvent,
    updateEvent,
    participateEvent,
    validateParticipate,
    noValidateParticipate,
    publishEvent,
    getEventByYear,
    getCommentEventById,
    addNewComment,
    deleteComment,
    updateComment,
    getUser
} from '../Controllers/event-controller'

const routes_event = (app) => {
    app.route('/api/add-event')
        .post(addNewEvent)

    app.route('/api/details-event/:id')
        .get(getEvent)

    app.route('/api/delete-event/:id')
        .delete(deleteEvent)

    app.route('/api/update-event/:id')
        .put(updateEvent)

    app.route('/api/participate-event/:id')
        .put(participateEvent)

    app.route('/api/validate-participate/:id')
        .put(validateParticipate)

    app.route('/api/noValidate-participate/:id')
        .put(noValidateParticipate)

    app.route('/api/publish-event/:id')
        .put(publishEvent)
        
    app.route('/api/getEventByYear/:createdDate')
        .get(getEventByYear)

    app.route('/api/getCommentEventById/:id')
        .get(getCommentEventById)

    app.route('/api/newComment/:id')
        .post(addNewComment)

    app.route('/api/delete-comment/:id')
        .delete(deleteComment)

    app.route('/api/update-comment/:id')
        .put(updateComment)
    app.route('/api/getUser')
        .get(getUser)
    
}
export default routes_event;
