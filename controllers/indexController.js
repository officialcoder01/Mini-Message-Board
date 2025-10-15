const db = require('../db/queries');

const getMessages = async (req, res) => {
    try {
        const messages = await db.getAllMessages();
        res.render('index', { messages });
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).send('Internal Server Error');
    }
};

const addMessage = async (req, res) => {
    try {
        const { username, message } = req.body;
        await db.addMessage(username, message);
        res.redirect('/');
    } catch (error) {
        console.error('Error adding message:', error);
        res.status(500).send('Internal Server Error');
    }
};

const getMessageId = async (req, res) => {
    try {
        const { id } = req.params;
        const message = await db.getMessageById(id);
        if (!message) {
            return res.status(404).send('Message not found');
        }
        res.render('message', { message: message });
    } catch (error) {
        console.error('Error fetching message:', error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = {
    getMessages,
    addMessage,
    getMessageId
};