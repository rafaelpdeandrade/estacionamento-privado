-- criando a database
create database estacionamento;

-- criando a tabela ENTRADAS:
create table entrada (
ticket serial primary key,
tipo text not null,
-- carro ou moto
modelo text,
marca text,
cor text,
placa text unique not null,
valor integer not null
 -- em centavos
);

-- criando a tabela SAIDAS:
create table saida (
ticket integer references entrada(ticket),
situacao text not null
);
-- a saida é somente a validação do ticket de entrada. Por isso ele é dependente do ticket de entrada.

-- criando tabela PATIO (veiculos que se encontram estacionados no patio)
create table patio(
ticket integer references entrada(ticket),
tipo text not null,
-- carro ou moto
modelo text,
marca text,
cor text,
placa text unique not null,
situacao text not null
-- estacionado no patio
);
