import api from './api';

async function getProducts() {
    try {
        const response = await api.get('/product');
        return response.data.result;
    } catch (error) {
        throw error
    }
}

export default { getProducts }