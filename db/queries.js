const pool = require('./pool');

const getAllMessages = async () => {
    const { rows } = await pool.query('SELECT id, username, message, created_at FROM messages ORDER BY created_at DESC');
    return rows;
};

const addMessage = async (username, message) => {
    const SQL = 'INSERT INTO messages (username, message) VALUES ($1, $2) RETURNING *';
    const values = [username, message];
    const { rows } = await pool.query(SQL, values);
    return rows[0];
};

const getMessageById = async (id) => {
    const SQL = 'SELECT username, message, created_at FROM messages WHERE id = $1';
    const values = [id];
    const { rows } = await pool.query(SQL, values);
    return rows[0];
}


module.exports = {
    getAllMessages,
    addMessage,
    getMessageById
}