const express = require('express');
const app = express();

const { cadastrarEntrada, listarEntradas, validarSaida, listarSaidas, listarPatio } = require('./controladores');

app.use(express.json());

app.post('/entrada', cadastrarEntrada);
app.get('/entradas', listarEntradas);
app.post('/saida', validarSaida);
app.get('/saidas', listarSaidas);
app.get('/patio', listarPatio);

app.listen(3000);