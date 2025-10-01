import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import ClientApi from "../../services/clients";
import ProductApi from "../../services/products";
import OrdersApi from "../../services/orders";
import './CreateOrder.css';

export default function CreateOrder() {
  const [form, setForm] = useState({
    client: "",
    product: "",
    price: 0,
    quantity: 1,
    date: "",
    total: 0
  });

  const [clients, setClients] = useState([]);
  const [products, setProducts] = useState([]);

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const maxDate = new Date().toISOString().split('T')[0];

  useEffect(() => {
    async function fetchClients() {
        try {
            const clients = await ClientApi.getClients();
            setClients(clients)

        } catch (error) {
            console.log(error)
        }
    }

    async function fetchProducts() {
        try {
            const products = await ProductApi.getProducts();
            setProducts(products);

        } catch (error) {
            console.log(error);
        }
    }

    fetchClients();
    fetchProducts();
  }, []);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleProductChange = (e) => {
    const { name, value } = e.target;
    
    let productPrice;

    if (!!value) {
        productPrice = products.find(product => product.id === parseInt(value, 10)).preco;
    } else {
        productPrice = 0;
    }

    const total = productPrice * form.quantity;

    setForm((prev) => ({ ...prev, [name]: value,  price: productPrice, total: total}));
  };

  const handleQuantityChange = (e) => {
    const { name, value } = e.target;
    const price = form.price;
    setForm((prev) => ({ ...prev, [name]: value, total: value * price }));
  }

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      await OrdersApi.createOrder(form);

      setForm({
        client: "",
        product: "",
        price: 0,
        quantity: 1,
        date: "",
        total: 0
      });

      setSuccess(true);
      setError(false);
    } catch (error) {
      setSuccess(false);
      setError(true);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Nova Compra</h2>
      <form onSubmit={handleSubmit} className="formsContainer mt-5">
        <div className="mb-3">
          <div className="text-start">
            <label htmlFor="client">
                  Cliente
            </label>
          </div>
          <select
            id="client"
            name="client"
            className="form-select"
            value={form.client}
            onChange={handleChange}
            required
          >
            <option value="">Selecione um cliente</option>
            {clients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.nome}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3 d-flex flex-row">
          <div className="w-75">
            <div className="text-start">
              <label htmlFor="product">
                    Produto
              </label>
            </div>
            <select
              id="product"
              name="product"
              className="form-select"
              value={form.product}
              onChange={handleProductChange}
              required
            >
              <option value="">Selecione um produto</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.nome}
                </option>
              ))}
            </select>
          </div>
          <div className="priceTag ms-3 text-start d-flex flex-column">
            <div>
              Preço
            </div>
            <div className="d-flex align-items-center flex-grow-1">
              {'R$' + form.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </div>
          </div>
        </div>

        <div className="mb-3">
          <div className="text-start">
            <label htmlFor="quantity">
                  Quantidade
            </label>
          </div>
          <input
            type="number"
            id="quantity"
            name="quantity"
            className="form-control"
            min="1"
            value={form.quantity}
            onChange={handleQuantityChange}
            required
          />
        </div>

        <div className="mb-4">
          <div className="text-start">
            <label htmlFor="date">
                  Data
            </label>
          </div>
          <input
            type="date"
            id="date"
            name="date"
            className="form-control"
            value={form.date}
            max={maxDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mainText text-start mb-5 d-flex justify-content-between">
           <span>
                Preço Total:
           </span>
           <span>
                {"R$" + form.total.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
           </span>
        </div>

        <Button type="submit" size="lg" variant="primary">
          Registrar Compra
        </Button>

        { success &&
          <div className="successMessage d-flex align-items-center justify-content-center mt-5">
            Compra criada com sucesso!
          </div>
        }

        { error &&
          <div className="errorMessage d-flex align-items-center justify-content-center mt-5">
            Erro ao criar compra. Tente novamente.
          </div>
        }
      </form>
    </div>
  );
}