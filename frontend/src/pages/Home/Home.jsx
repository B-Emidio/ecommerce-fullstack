import React from "react";
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import './Home.css';

export default function Home() {

  const navigate = useNavigate();

  return (
      <div className="">
          <div className="mainContainer">
              <h1 className="title">Seu E-Commerce</h1>
                  <div className="buttonContainer">
                    <Button
                        variant="primary"
                        size="lg"
                        onClick={() => {
                          navigate('/listagem')
                    }}
                    >
                      Clientes e Produtos
                    </Button>

                    <Button
                        variant="primary"
                        size="lg"
                        onClick={() => {
                          navigate('/compra/novo')
                    }}
                    >
                      Registrar Compras
                    </Button>

                    <Button
                        variant="primary"
                        size="lg"
                        onClick={() => {
                          navigate('/compra')
                    }}
                    >
                      Lista de Compras
                    </Button>
                  </div>
          </div>
      </div>
  );
}