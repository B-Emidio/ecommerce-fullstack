import api from './api';

async function getOrders() {
    try {
        const response = await api.get('/order');
        return response.data.result;
    } catch (error) {
        throw error;
    }
}

async function createOrder(orderDetails) {
    try {
        await api.post('/order', {
            cliente_id: parseInt(orderDetails.client, 10),
            produto_id: parseInt(orderDetails.product, 10),
            quantidade: orderDetails.quantity,
            preco_total: orderDetails.total,
            data: orderDetails.date
        }, {
            headers: {
                'Content-Type': 'application/json'
    }});
    } catch (error) {
        console.log(error)
    }
}

export default { 
    getOrders,
    createOrder
}