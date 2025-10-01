const express = require('express');
const cors = require('cors');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const port = 3000;
const clientRouter = require('./routes/clients');
const productRouter = require('./routes/products');
const orderRouter = require('./routes/orders');

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5173']
}))


app.use('/client', clientRouter);
app.use('/product', productRouter);
app.use('/order', orderRouter);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});