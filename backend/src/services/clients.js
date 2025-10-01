const db = require('../database/db');
const AppError = require('../errors/AppError');

function getClients() {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM cliente', (err, rows) => {
            if(err) reject(err);
            else resolve(rows);
        });
    });
}

function createClient(name, email) {
    return new Promise((resolve, reject) => {
            db.run('INSERT INTO cliente (nome, email) VALUES (?, ?)',
                name, email, function(err) {
                if(err) {
                    reject(new AppError("Falha ao criar compra. Tente novamente mais tarde."));
                }
                else{
                    resolve(this.lastID);
                }
            });
        });
}

function updateClient(clientId, name, email) {
    return new Promise((resolve, reject) => {
        db.run('UPDATE cliente SET nome = (?), email = (?) WHERE id = (?)',
            name, email, clientId, function(err) {
            if(err)
                reject(new AppError("Falha ao atualizar cliente. Tente novamente mais tarde."));
            else {
                if (this.changes === 0) {
                    reject(new AppError('Cliente não encontrado. Tente outro id', 400));
                } else {
                    resolve();
                }
            }
        });
    });
}

function deleteClient(clientId) {
    return new Promise((resolve, reject) => {
        db.run('DELETE FROM cliente WHERE id = (?)', clientId, function(err) {
            if(err)
                reject(new AppError("Falha ao remover cliente. Tente novamente mais tarde."));
            else {
                if (this.changes === 0) {
                    reject(new AppError('Cliente não encontrado. Tente outro id', 400));
                } else {
                    resolve();
                }
            }
        });
    });
}



module.exports = {
    getClients,
    createClient,
    updateClient,
    deleteClient
}