const db = require('../config/db');

// Criar Tarefa
exports.criarTarefa = (req, res) => {
    const { id_usuario, descricao, setor, prioridade, data_cadastro, status } = req.body;
    if (!id_usuario || !descricao || !setor || !prioridade || !data_cadastro) {
        return res.status(400).send('Todos os campos são obrigatórios.');
    }
    const statusFinal = status || 'a fazer';
    db.query('INSERT INTO tarefas (id_usuario, descricao, setor, prioridade, data_cadastro, status) VALUES (?, ?, ?, ?, ?, ?)', 
    [id_usuario, descricao, setor, prioridade, data_cadastro, statusFinal], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send('Tarefa cadastrada com sucesso!');
    });
};

// Listar Tarefas
exports.listarTarefas = (req, res) => {
    db.query(`
        SELECT t.*, u.nome as usuario_nome FROM tarefas t
        JOIN usuarios u ON t.id_usuario = u.id
    `, (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
};

// Atualizar Tarefa
exports.atualizarTarefa = (req, res) => {
    const { id } = req.params;
    const { descricao, setor, prioridade, status } = req.body;

    db.query('UPDATE tarefas SET descricao = ?, setor = ?, prioridade = ?, status = ? WHERE id = ?', 
    [descricao, setor, prioridade, status, id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send('Tarefa atualizada com sucesso!');
    });
};

// Excluir Tarefa
exports.excluirTarefa = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM tarefas WHERE id = ?', [id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send('Tarefa excluída com sucesso!');
    });
};
