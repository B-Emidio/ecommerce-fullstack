const express = require('express');
const router = express.Router();
const clientService = require('../services/clients');

router.get('/', async function(req, res, next) {
    try {
        const clients = await clientService.getClients();

        res.status(200).json({
            result: clients,
            success: true,
            error: null
        });

        console.log(`Busca por clientes foi concluída com sucesso!`);
    } catch (error) {
        console.log(`Falha ao buscar clientes. Método: getClients. Código: ${error.statusCode}. Mensagem: ${error.message}`);
        res.status(500).send({
            success: false,
            error: error.message
        });
    }
});

router.post('/', async function(req, res, next) {
    try {
        const name = req.body.nome;
        const email = req.body.email;

        const id = await clientService.createClient(name, email);

        res.status(200).json({
            result: [{
                id: id,
                nome: name,
                email: email
            }],
            success: true,
            error: null
        });

        console.log(`Criação de cliente com id ${id} foi concluída com sucesso!`);
    } catch (error) {
        console.log(`Falha ao criar cliente. Método: createClient. Código: ${error.statusCode}. Mensagem: ${error.message}`);
        res.status(error.statusCode).send({
            success: false,
            error: error.message
        });
    }
});

router.put('/:id', async function(req, res, next) {
    try {
        const clientId = req.params.id;
        const name = req.body.nome;
        const email = req.body.email;

        await clientService.updateClient(clientId, name, email);

        res.status(200).json({
            result: [{
                id: clientId,
                nome: name,
                email: email
            }],
            success: true,
            error: null
        });

        console.log(`Atualização de cliente com id ${clientId} foi concluída com sucesso!`);
    } catch (error) {
        console.log(`Falha ao atualizar cliente. Método: updateClient. Código: ${error.statusCode}. Mensagem: ${error.message}`);
        res.status(error.statusCode).send({
            success: false,
            error: error.message
        });
    }
});

router.delete('/:id', async function(req, res, next) {
    try {
        const clientId = req.params.id;
        await clientService.deleteClient(clientId);

        res.status(200).send({
            success: true,
            message: "Cliente removido com sucesso!"
        });

        console.log(`Cliente de id ${clientId} removido com sucesso!`);
    } catch (error) {
        console.log(`Falha ao remover cliente. Método: deleteClient. Código: ${error.statusCode}. Mensagem: ${error.message}`);
        res.status(error.statusCode).send({
            success: false,
            error: error.message
        });
    }
});

module.exports = router;