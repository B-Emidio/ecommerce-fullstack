import { useEffect, useState } from "react";
import { Tab, Tabs, Table } from "react-bootstrap";
import ClientApi from "../../services/clients";
import ProductApi from "../../services/products";

export default function Listing() {

  const [clients, setClients] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
      async function fetchClients() {
          try {
              const clients = await ClientApi.getClients();
              setClients(clients)

          } catch (error) {
              console.log(error)
          }
      }

      fetchClients();
  }, []);

  useEffect(() => {
      async function fetchProducts() {
          try {
              const products = await ProductApi.getProducts();
              setProducts(products)

          } catch (error) {
              console.log(error)
          }
      }

      fetchProducts();
  }, []);

  return (
    <div className="mt-4">
      <h2 className="mb-4">Informações Cadastradas</h2>

      <Tabs defaultActiveKey="clients" id="tables-tabs" className="mb-3" fill>
        <Tab eventKey="clients" title="Clientes">
          <Table striped bordered hover responsive>
            <thead className="table-dark">
              <tr>
                <th>Nome</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {!!clients ? clients.map((c) => (
                <tr key={c.id}>
                  <td>{c.nome}</td>
                  <td>{c.email}</td>
                </tr>
              )) : null}
            </tbody>
          </Table>
        </Tab>

        
        <Tab eventKey="products" title="Produtos">
          <Table striped bordered hover responsive>
            <thead className="table-dark">
              <tr>
                <th>Produto</th>
                <th>Preço</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id}>
                  <td>{p.nome}</td>
                  <td>{"R$" + p.preco}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Tab>
      </Tabs>
    </div>
  );
}