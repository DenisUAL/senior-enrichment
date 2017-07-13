const studRouter = require('express').Router()
const { Student } = require('../../db/models')

studRouter.get('/', (req, res, next) => {
    Student.findAll().then(campuses => res.json(campuses)).catch(next);
})

studRouter.get('/:id', (req, res, next) => {
    Student.findOne({
        where: {
            id: req.params.id
        }
    }).then(campuses => res.json(campuses)).catch(next);
})

studRouter.post('/', (req, res, next) => {
    Student.create(req.body).then(result => res.json(result)).catch(next);
})

studRouter.put('/:id', (req, res, next) => {
    Student.update({ name: req.body.name, email: req.body.email }, {
        where: {
            id: req.params.id
        }
    }).then(result => res.json(result)).catch(next);
})

studRouter.delete('/:id', (req, res, next) => {
    Student.destroy({
        where: {
            id: req.params.id
        }
    }).then(result => res.json(result)).catch(next);
})

module.exports = studRouter;