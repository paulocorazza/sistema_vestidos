const controller = {};

controller.listProvas = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query(`select  concat(x.cliente, '  Provar ', GROUP_CONCAT(x.roupas)) as title, x.start, x.end
    from (select(select GROUP_CONCAT(itens_locacao.descricao , ' ', itens_locacao.codigo)
                 from itens_locacao
                 where itens_locacao.id = locacoes.id
                 group by itens_locacao.id)                roupas,
                locacoes.cliente,
                locacoes.data_prova                     as start,
                DATE_ADD(data_prova, INTERVAL 5 minute) as end
          from locacoes
          group by locacoes.cliente, locacoes.id, locacoes.data_prova) as x
    group by x.cliente, x.start, x.end
    `,
        (err, locacoes) => {
      if (err) {
        res.json(err);
      }
      return res.json(locacoes);

    });
  });
};

controller.listRetirada = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query(`select  concat(x.cliente, '  Retirar ', GROUP_CONCAT(x.roupas)) as title, x.start, x.end
    from (select(select GROUP_CONCAT(itens_locacao.descricao , ' ', itens_locacao.codigo)
                 from itens_locacao
                 where itens_locacao.id = locacoes.id
                 group by itens_locacao.id)                roupas,
                locacoes.cliente,
                locacoes.data_retira                     as start,
                DATE_ADD(data_retira, INTERVAL 5 minute) as end
          from locacoes
          group by locacoes.cliente, locacoes.id, locacoes.data_retira) as x
    group by x.cliente, x.start, x.end
    `, (err, locacoes) => {
      if (err) {
        res.json(err);
      }

      return res.json(locacoes);

    });
  });
};

controller.listDevolucao = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query(`select  concat(x.cliente, '  Devolver ', GROUP_CONCAT(x.roupas)) as title, x.start, x.end
    from (select(select GROUP_CONCAT(itens_locacao.descricao , ' ', itens_locacao.codigo)
                 from itens_locacao
                 where itens_locacao.id = locacoes.id
                 group by itens_locacao.id)                roupas,
                locacoes.cliente,
                locacoes.data_devolve                     as start,
                DATE_ADD(data_devolve, INTERVAL 5 minute) as end
          from locacoes
          group by locacoes.cliente, locacoes.id, locacoes.data_devolve) as x
    group by x.cliente, x.start, x.end
    `, (err, locacoes) => {
      if (err) {
        res.json(err);
      }

      return res.json(locacoes);

    });
  });
};

module.exports = controller;
