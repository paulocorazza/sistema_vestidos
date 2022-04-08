const controller = {};

controller.listLocacoes = (req, res) => {

  req.getConnection((err, conn) => {

    const {
      codigo
    } = req.params;

    conn.query(`select locacoes.id, 
                        itens_locacao.codigo, 
                        locacoes .cliente,
                        locacoes.data_prova,
                        locacoes.data_retira,
                        locacoes.data_devolve from locacoes
                        inner join itens_locacao on locacoes.id = itens_locacao .id  
                        where codigo like "%${codigo}%";`, 
    (err, results) => {
      if (err) {
        res.json(err);

      } else {
        return res.json(results);

      }

    });
  });
};


module.exports = controller;