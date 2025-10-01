const db = require('../database/db');
const AppError = require('../errors/AppError');

function getOrders() {
        return new Promise((resolve, reject) => {
        db.all('SELECT Cli.nome AS cliente, P.nome AS produto, C.quantidade, C.preco_total, C.data_compra FROM compra C, produto P, cliente Cli WHERE P.id = C.produto_id AND Cli.id = C.cliente_id', (err, rows) => {
            if(err)
                reject(new AppError("Falha ao resgatar compras. Tente novamente mais tarde."));
            else
                resolve(rows);
        });
    });
}

function createOrder(clientId, productId, quantity, total, date) {
    return new Promise((resolve, reject) => {
            db.run('INSERT INTO compra (cliente_id, produto_id, quantidade, preco_total, data_compra) VALUES (?, ?, ?, ?, ?)',
                clientId, productId, quantity, total, date, function(err) {
                if(err) {
                    reject(new AppError("Falha ao criar compra. Tente novamente mais tarde."));
                }
                else{
                    resolve(this.lastID);
                }
            });
        });
}

function updateOrder(orderId, clientId, productId, quantity, total, date) {
    return new Promise((resolve, reject) => {
        db.run('UPDATE compra SET client_id = (?), produto_id = (?), quantidade = (?), preco_total = (?), data_compra = (?) WHERE id = (?)',
            clientId, productId, quantity, total, date, orderId, function(err) {
            if(err)
                reject(new AppError("Falha ao atualizar compra. Tente novamente mais tarde."));
            else {
                if (this.changes === 0) {
                    reject(new AppError('Compra não encontrada. Tente outro id', 400));
                } else {
                    resolve();
                }
            }
        });
    });
}

function deleteOrder(orderId) {
    return new Promise((resolve, reject) => {
        db.run('DELETE FROM compra WHERE id = (?)', orderId, function(err) {
            if(err)
                reject(new AppError("Falha ao remover compra. Tente novamente mais tarde."));
            else {
                if (this.changes === 0) {
                    reject(new AppError('Compra não encontrada. Tente outro id', 400));
                } else {
                    resolve();
                }
            }
        });
    });
}

module.exports = {
    getOrders,
    createOrder,
    updateOrder,
    deleteOrder
}

