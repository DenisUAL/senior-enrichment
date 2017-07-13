const campRouter = require('express').Router()
const { Campus } = require('../../db/models')

campRouter.get('/', (req, res, next) => {
    Campus.findAll().then(campuses => res.json(campuses)).catch(next);
})

campRouter.get('/:id', (req, res, next) => {
    Campus.findById(req.params.id).then(campuses => res.json(campuses)).catch(next);
})

campRouter.post('/', (req, res, next) => {
    Campus.create(req.body).then(result => res.json(result)).catch(next);
})

campRouter.put('/:id', (req, res, next) => {
    Campus.update({ name: req.body.name, image: req.body.image }, {
        where: {
            id: req.params.id
        }
    }).then(result => res.json(result)).catch(next);
})

campRouter.delete('/:id', (req, res, next) => {
    Campus.destroy({
        where: {
            id: req.params.id
        }
    }).then(result => res.json(result)).catch(next);
})

module.exports = campRouter;

// GET
// - all campuses
// - a campus by id
// - all students
// - a student by id
// ```

// ```
// POST
// - new campus
// - new student
// ```

// ```
// PUT
// - updated student info for one student
// - updated campus info for one campus
// ```

// ```
// DELETE
// - a campus
// - a student