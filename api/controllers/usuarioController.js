const db = require('../config/db');

// Criar Usuário
exports.criarUsuario = (req, res) => {
    const { nome, email } = req.body;
    if (!nome || !email) {
        return res.status(400).send('Todos os campos são obrigatórios.');
    }
    db.query('INSERT INTO usuarios (nome, email) VALUES (?, ?)', [nome, email], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send('Usuário cadastrado com sucesso!');
    });
};

// Listar Usuários
exports.listarUsuarios = (req, res) => {
    db.query('SELECT * FROM usuarios', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
};
