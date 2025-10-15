const { Router } = require('express');
const indexRouter = Router();
const indexController = require('../controllers/indexController');

// Define routes and link to controller methods
indexRouter.get('/', indexController.getMessages);

indexRouter.get('/new', (req, res) => {
    res.render('form');
});

indexRouter.post('/new', indexController.addMessage);

indexRouter.get('/messages/:id', indexController.getMessageId);

module.exports = indexRouter;