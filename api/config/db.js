const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'sua_senha_do_mysql',
    database: 'kanban'
});

connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar no MySQL:', err);
    } else {
        console.log('Conexão com o MySQL bem-sucedida!');
    }
});

module.exports = connection;
