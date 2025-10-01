import api from './api';

async function getClients() {
    try {
        const response = await api.get('/client');
        return response.data.result;
    } catch (error) {
        throw error;
    }
}

export default { getClients }