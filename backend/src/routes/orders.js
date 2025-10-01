const express = require('express');
const router = express.Router();
const orderService = require('../services/orders');

router.get('/', async function(req, res, next) {
    try {
        const orders = await orderService.getOrders();

        res.status(200).json({
            result: orders,
            success: true,
            error: null
        });

        console.log(`Busca por compras foi concluída com sucesso!`);
    } catch (error) {
        console.log(`Falha ao buscar compras. Método: getOrders. Código: ${error.statusCode}. Mensagem: ${error.message}`);
        res.status(error.statusCode).send({
            success: false,
            error: error.message
        });
    }
});

router.post('/', async function(req, res, next) {
    try {
        const clientId = req.body.cliente_id;
        const productId = req.body.produto_id;
        const quantity = req.body.quantidade;
        const total = req.body.preco_total;
        const date = req.body.data;

        const id = await orderService.createOrder(clientId, productId, quantity, total, date);

        res.status(200).json({
            result: [{
                id: id,
                cliente_id: clientId,
                produto_id: productId,
                quantidade: quantity,
                preco_total: total,
                data: date
            }],
            success: true,
            error: null
        });

        console.log(`Criação de compra com id ${id} foi concluída com sucesso!`);
    } catch (error) {
        console.log(`Falha ao criar compra. Método: createOrder. Código: ${error.statusCode}. Mensagem: ${error.message}`);
        res.status(error.statusCode).send({
            success: false,
            error: error.message
        });
    }
});

router.put('/:id', async function(req, res, next) {
    try {
        const orderId = req.params.id;
        const clientId = req.body.cliente_id;
        const productId = req.body.produto_id;
        const quantity = req.body.quantidade;
        const total = req.body.preco_total;
        const date = req.body.data;

        await orderService.updateOrder(orderId, clientId, productId, quantity, total, date);

        res.status(200).json({
            result: [{
                id: orderId,
                cliente_id: clientId,
                produto_id: productId,
                quantidade: quantity,
                preco_total: total,
                data: date
            }],
            success: true,
            error: null
        });

        console.log(`Atualização de compra com id ${orderId} foi concluída com sucesso!`);
    } catch (error) {
        console.log(`Falha ao atualizar compra. Método: updateOrder. Código: ${error.statusCode}. Mensagem: ${error.message}`);
        res.status(error.statusCode).send({
            success: false,
            error: error.message
        });
    }
});

router.delete('/:id', async function(req, res, next) {
    try {
        const orderId = req.params.id;
        await orderService.deleteOrder(orderId);
        res.status(200).send({
            success: true,
            message: "Compra removida com sucesso!"
        });

        console.log(`Compra de id ${orderId} removida com sucesso!`);
    } catch (error) {
        console.log(`Falha ao remover compra. Método: deleteOrder. Código: ${error.statusCode}. Mensagem: ${error.message}`);
        res.status(error.statusCode).send({
            success: false,
            error: error.message
        });
    }
});

module.exports = router;