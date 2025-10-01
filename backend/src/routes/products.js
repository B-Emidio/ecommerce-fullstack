const express = require('express');
const router = express.Router();
const productService = require('../services/products');

router.get('/', async function(req, res, next) {
    try {
        const products = await productService.getProducts();

        res.status(200).json({
            result: products,
            success: true,
            error: null
        });

        console.log(`Busca por produtos foi concluída com sucesso!`);
    } catch (error) {
        console.log(`Falha ao buscar produtos. Método: getProducts. Código: ${error.statusCode}. Mensagem: ${error.message}`);
        res.status(500).send({
            success: false,
            error: error.message
        });
    }
});

router.post('/', async function(req, res, next) {
    try {
        const name = req.body.nome;
        const price = req.body.preco;

        const id = await productService.createProduct(name, price);

        res.status(200).json({
            result: [{
                id: id,
                nome: name,
                preco: price
            }],
            success: true,
            error: null
        });

        console.log(`Criação de produto com id ${id} foi concluída com sucesso!`);
    } catch (error) {
        console.log(`Falha ao criar produto. Método: createProduct. Código: ${error.statusCode}. Mensagem: ${error.message}`);
        res.status(error.statusCode).send({
            success: false,
            error: error.message
        });
    }
});

router.put('/:id', async function(req, res, next) {
    try {
        const productId = req.params.id;
        const name = req.body.nome;
        const price = req.body.preco;

        await productService.updateProduct(productId, name, price);

        res.status(200).json({
            result: [{
                id: productId,
                nome: name,
                preco: price
            }],
            success: true,
            error: null
        });

        console.log(`Atualização de produto com id ${productId} foi concluída com sucesso!`);
    } catch (error) {
        console.log(`Falha ao atualizar produto. Método: updateProduct. Código: ${error.statusCode}. Mensagem: ${error.message}`);
        res.status(error.statusCode).send({
            success: false,
            error: error.message
        });
    }
});

router.delete('/:id', async function(req, res, next) {
    try {
        const productId = req.params.id;
        await productService.deleteProduct(productId);

        res.status(200).send({
            success: true,
            message: "Produto removido com sucesso!"
        });

        console.log(`Produto de id ${productId} removido com sucesso!`);
    } catch (error) {
        console.log(`Falha ao remover produto. Método: deleteProduct. Código: ${error.statusCode}. Mensagem: ${error.message}`);
        res.status(error.statusCode).send({
            success: false,
            error: error.message
        });
    }
});

module.exports = router;