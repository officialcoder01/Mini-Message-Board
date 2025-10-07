const { Router } = require('express');
const indexRouter = Router();

const messages = [
  {
    id: 1,
    text: "Hi there!",
    user: "Amando",
    added: new Date()
  },
  {
    id: 2,
    text: "Hello World!",
    user: "Charles",
    added: new Date()
  }
];

// helper to get the next unique id
function getNextId() {
  // collect numeric ids only
  const ids = messages
    .map(m => Number(m.id))
    .filter(n => Number.isFinite(n) && !Number.isNaN(n));

  if (!ids.length) return 1;
  return Math.max(...ids) + 1;
}

indexRouter.get('/', (req, res) => {
    res.render('index', { title: 'Mini Messageboard', messages: messages });
});

indexRouter.get('/new', (req, res) => {
    res.render('form');
});

indexRouter.post('/new', (req, res) => {
    const user = req.body.name;
    const message = req.body.message;

    const id = getNextId();
    messages.push({ id, text: message, user: user, added: new Date() });
    res.redirect('/');
});

indexRouter.get('/messages/:id', (req, res) => {
  const id = req.params.id;
  // adjust how you find messages if you use a DB or different id type
  const message = messages.find(m => String(m.id) === String(id));
  if (!message) return res.status(404).send('Message not found');
  res.render('message', { message });
});

module.exports = indexRouter;