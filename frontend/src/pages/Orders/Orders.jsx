import {useState, useEffect} from "react";
import OrderApi from "../../services/orders";
import { Table } from "react-bootstrap";

export default function Orders() {

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        async function fetchOrders() {
            try {
                const orders = await OrderApi.getOrders();
                setOrders(orders);

            } catch (error) {
                console.log(orders);
            }
        }

        fetchOrders();
    }, []);

    return (
        <div className="container mt-4">
            <h2 className="mb-5">Lista de Compras</h2>
                <Table striped bordered hover responsive>
                    <thead className="table-dark">
                        <tr>
                            <th>Cliente</th>
                            <th>Produto</th>
                            <th>Quantidade</th>
                            <th>Preço Total (R$)</th>
                            <th>Data da Compra</th>
                        </tr>
                    </thead>
                    <tbody>
                    {orders.map((order, index) => (
                        <tr key={index}>
                            <td>{order.cliente}</td>
                            <td>{order.produto}</td>
                            <td>{order.quantidade}</td>
                            <td>{order.preco_total.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</td>
                            <td>{order.data_compra.split('-').reverse().join('/')}</td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
        </div>
    );
}