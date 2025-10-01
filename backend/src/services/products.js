const db = require('../database/db');
const AppError = require('../errors/AppError');

function getProducts() {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM produto', function(err, rows) {
            if(err) reject(err);
            else resolve(rows);
        });
    });
}

function createProduct(name, price) {
    return new Promise((resolve, reject) => {
            db.run('INSERT INTO produto (nome, preco) VALUES (?, ?)',
                name, price, function(err) {
                if(err) {
                    reject(new AppError("Falha ao criar compra. Tente novamente mais tarde."));
                }
                else{
                    resolve(this.lastID);
                }
            });
        });
}

function updateProduct(productId, name, preco) {
    return new Promise((resolve, reject) => {
        db.run('UPDATE produto SET nome = (?), preco = (?) WHERE id = (?)',
            name, preco, productId, function(err) {
            if(err)
                reject(new AppError("Falha ao atualizar produto. Tente novamente mais tarde."));
            else {
                if (this.changes === 0) {
                    reject(new AppError('Produto não encontrado. Tente outro id', 400));
                } else {
                    resolve();
                }
            }
        });
    });
}

function deleteProduct(productId) {
    return new Promise((resolve, reject) => {
        db.run('DELETE FROM produto WHERE id = (?)', productId, function(err) {
            if(err)
                reject(new AppError("Falha ao remover cliente. Tente novamente mais tarde."));
            else {
                if (this.changes === 0) {
                    reject(new AppError('Produto não encontrado. Tente outro id', 400));
                } else {
                    resolve();
                }
            }
        });
    });
}

module.exports = {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct
}