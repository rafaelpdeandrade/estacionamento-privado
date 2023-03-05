const { servidor } = require('./servidor');

const cadastrarEntrada = async (req, res) => {
    const { tipo, marca, modelo, cor, placa, valor } = req.body;

    try {

        const cadastrarEntrada = await servidor.query('insert into entrada (tipo, modelo, marca, cor, placa, valor) values ($1, $2, $3, $4, $5, $6) returning *', [tipo, modelo, marca, cor, placa, valor]);
        const ticketEntrada = cadastrarEntrada.rows[0].ticket;
        
        const cadastrarPatio = await servidor.query('insert into patio (ticket, tipo, modelo, marca, cor, placa, situacao) values ($1, $2, $3, $4, $5, $6, $7) returning *', [ticketEntrada, tipo, modelo, marca, cor, placa, "no patio"]);

        return res.json(cadastrarEntrada.rows[0]);
    }
    catch (error) {

        return res.status(500).json(error.message);
    };

};

const listarEntradas = async (req, res) => {

    try {

        const listarEntradas = await servidor.query('select * from entrada');

        return res.json(listarEntradas.rows);
    }
    catch (error) {

        return res.status(500).json(error.message);
    };

};

const validarSaida = async (req, res) => {
    const { ticket } = req.body;

    try {

        const encontrarTicket = await servidor.query('select * from entrada where ticket = $1', [ticket]);
        if (!encontrarTicket.rows[0]) {
            return res.status(400).json({ "mensagem": "Ticket não encontrado!" })
        };

        const validarSaida = await servidor.query('insert into saida (ticket, situacao) values ($1, $2)', [ticket, "confirmado"]);

        encontrarTicket.rows[0].saida = "Confirmada!";

        const saidaPatio = await servidor.query('delete from patio where ticket = $1', [ticket]);

        return res.json(encontrarTicket.rows[0]);

    } catch (error) {

        return res.status(500).json(error.message);
    }
};

const listarSaidas = async (req, res) => {

    try {

        const listarSaidas = await servidor.query('select * from saida');

        return res.json(listarSaidas.rows);

    } catch (error) {

        return res.status(500).json(error.message);
    }
};

const listarPatio = async (req, res) => {

    const listarPatio = await servidor.query('select * from patio');

    return res.json(listarPatio.rows);

};

module.exports = {
    cadastrarEntrada,
    listarEntradas,
    validarSaida,
    listarSaidas,
    listarPatio
};


