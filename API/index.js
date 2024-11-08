const express = require('express');
const cors = require('cors');
const app = express();
const routes = require('./routes/route');


app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  maxAge: 86400,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', routes);

app.listen(3001, () => {
  console.log('Servidor corriendo en el puerto 3001');
});