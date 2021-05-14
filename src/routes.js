const express = require('express')
const routes = express.Router()
const profileController = require('./controllers/ProfileControllers')
const LiteralsControllers = require('./controllers/LiteralsControllers')

routes.get('/', LiteralsControllers.index )
routes.get('/job',LiteralsControllers.show)
routes.get('/job/:id',LiteralsControllers.save)
routes.get('/profile',profileController.index)
routes.post('/job', LiteralsControllers.create)
routes.post('/profile', profileController.update)
routes.post('/job/:id', LiteralsControllers.update)
routes.post('/job/delete/:id', LiteralsControllers.delete)

module.exports = routes;