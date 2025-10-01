# E-Commerce
Aplicação web para o gerenciamento de compras de um comércio. Contém funções simples para visualizações de clientes e produtos da empresa, cadastro de novas compras e visualização das compras realizadas.

### Ferramentas Utilizadas

* [![React][React.js]][React-url]
* [![Bootstrap][Bootstrap.com]][Bootstrap-url]
* [![Axios][Axios]][Axios-url]
* [![Node.js][Node.com]][Node-url]
* [![Express][Express.js]][Express-url]
* [![SQLite][Sqlite3]][Sqlite-url]
* [![Swagger][Swagger.io]][Swagger-url]

## Como Utilizar

### Backend

Instale as dependências necessárias indo na raiz do projeto e executando:
```sh
  npm install
```

Inicie o projeto dentro do diretório `src` executando o comando:
```sh
  node index.js
```

Idealmente deve ser utilizada a porta 3000 para a comunicação com o frontend. O banco de dados não precisa ser iniciado e está contido no arquivo `ecommerce.db`.

### Frontend

Instale as dependências necessárias indo na raiz do projeto e executando:
```sh
  npm install
```

Dentro da raiz, inicie o projeto executando o comando:
```sh
  npm run dev
```

Deve ser utilizada a porta 5173, padrão do VITE, para evitar problemas de CORS na comunicação com o backend. Caso seja necessário utilizar outra porta, atualizar o CORS dentro de `backend/src/index.js`.

A aplicação está pronto para ser utilizada acessando `http://localhost:5173`!

## Documentação

A documentação via Swagger dos endpoints criados para o backend pode ser encontrado acessando `http://localhost:{BACKEND-PORT}/api-docs` após iniciar o backend, em que BACKEND-PORT é a porta no qual o backend está rodando.

[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Axios]: https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios
[Axios-url]: https://axios-http.com/ptbr/
[Node.com]: https://img.shields.io/badge/Node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white
[Node-url]: https://nodejs.org/pt
[Express.js]: https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=expressdotcom&logoColor=white
[Express-url]: https://expressjs.com/
[Sqlite3]: https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white
[Sqlite-url]: https://sqlite.org/
[Swagger.io]: https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=white
[Swagger-url]: https://swagger.io/
