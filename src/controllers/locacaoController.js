const controller = {};


controller.list = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query("select id,cliente,endereco,telefone, DATE_FORMAT(data_prova,'%d/%m/%Y %T' ) as prova, DATE_FORMAT(data_retira,'%d/%m/%Y %T' ) as retira,DATE_FORMAT(data_devolve,'%d/%m/%Y') as devolve, concat('R$ ', l.sinal) as sinal , concat('R$ ', l.restante ) as restante ,concat('R$ ', l.total ) as total from locacoes l ", (err, locacoes) => {
      if (err) {
        res.json(err);
      }
      res.render('locacoes', {
        data: locacoes,
      });
    });
  });
};

controller.edit = (req, res) => {

  const {
    id
  } = req.params;

  req.getConnection((err, conn) => {
    conn.query("	select id,cliente,endereco,telefone, DATE_FORMAT(data_prova, '%Y-%m-%d %T') as data_prova, DATE_FORMAT(data_retira,'%Y-%m-%d %T') as data_retira,DATE_FORMAT(data_devolve,'%Y-%m-%d') as data_devolve, l.sinal as sinal , l.restante  as restante , l.total  as total from locacoes l where id = ?", [id], (err, rows) => {
      res.render('locacoes_edit', {
        data: rows[0],

      })
    });
  });
};

controller.update = (req, res) => {
  const {
    id
  } = req.params;
  const newlocacoes = req.body;
  req.getConnection((err, conn) => {

    conn.query('UPDATE locacoes set ? where id = ?', [newlocacoes, id], (err, rows) => {
      console.log(newlocacoes),
        res.redirect('/locacoes');
    });
  });
};

controller.delete = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, connection) => {
    connection.query('DELETE FROM locacoes WHERE id = ?', [id], (err, rows) => {
      if(err){
        res.render('erro');
        console.log(err);
      }
      else{
        res.redirect('/locacoes');
      }
     
    });
  });
}


controller.nextId = (req, res) => {
  req.getConnection((err, conn) => {

    conn.query("SELECT Auto_increment  FROM information_schema.tables WHERE table_name='locacoes'", (err, results) => {

      if (err) {
        res.json(err);

      } else {
        return res.json(results);

      }

    })

  })
}


controller.addLocacao = (req, res) => {
  const data = req.body;
  console.log(req.body)
  req.getConnection((err, connection) => {
    const query = connection.query('INSERT INTO locacoes set ?', data, (err, locacao) => {

      if (err) {

        res.render('erro');

      }

    })
  })
};

controller.addItemToLocacao = (req, res) => {
  const data = req.body;
  console.log(req.body)
  req.getConnection((err, connection) => {
    const query = connection.query('INSERT INTO itens_locacao set ?', data, (err, itens) => {

      if (err) {

        res.render('erro');

      }

    })
  })
};

controller.listItemsFromLocation = (req, res) => {

  const {
    id
  } = req.params;

  req.getConnection((err, conn) => {
    conn.query("select * from itens_locacao where id = ? order by codigo asc", [id], (err, rows) => {
      res.render('items-locacao', {
        data: rows

      })
    });
  });
};

controller.deleteItemFromLocation = (req, res) => {
  const { id } = req.params;
  const { codigo } = req.params;
  req.getConnection((err, connection) => {
    connection.query(`DELETE FROM itens_locacao WHERE id = ${id} and codigo = '${codigo}'`, (err, rows) => {
      if (err) {
        res.json(err);

      } 
      else{
        res.redirect(`/locacoes/items-locacao/${id}`);
      }
    });
  });
}

controller.deleteItemFromLocationById = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, connection) => {
    connection.query(`DELETE FROM itens_locacao WHERE id = ${id}`, (err, rows) => {
      if (err) {
        res.json(err);

      } 
      else{
        res.redirect(`/locacoes`);
      }
    });
  });
}



controller.getDataProva = (req, res) => {

  const {data_prova} = req.params;

  req.getConnection((err, conn) => {
    conn.query(`select data_prova from locacoes where data_prova = '${data_prova}';`, (err, results) => {

      if (err) {
        res.json(err);

      } else {
        return res.json(results);

      }

    })

  })
}

controller.getDataRetira = (req, res) => {

  const {data_retira} = req.params;

  req.getConnection((err, conn) => {
    conn.query(`select data_retira from locacoes where data_retira = '${data_retira}';`, (err, results) => {

      if (err) {
        res.json(err);

      } else {
        return res.json(results);

      }

    })

  })
}


controller.validaPeca = (req, res) => {

  const {codigo} = req.params;

  req.getConnection((err, conn) => {
    conn.query(`select codigo from pecas where codigo = "${codigo}";`, (err, results) => {

      if (err) {
        res.json(err);

      } else {
        return res.json(results);

      }

    })

  })
}

controller.atualizaBanco = (req, res) => {


  req.getConnection((err, conn) => {
    conn.query(`analyze table locacoes`, (err, results) => {

      if (err) {
        res.json(err);

      } else {
        return res.json(results);

      }

    })

  })


}

controller.getLocacoesByCliente = (req, res) => {

  const {cliente} = req.params;

  req.getConnection((err, conn) => {
    conn.query(`select * from locacoes where cliente like '%${cliente}%';`, (err, results) => {

      if (err) {
        res.json(err);

      } else {
        return res.json(results);

      }

    })

  })
}

controller.getClientesLocacoes = (req, res) => {


  req.getConnection((err, conn) => {
    conn.query(`SELECT cliente from locacoes`, (err, results) => {

      if (err) {
        res.json(err);

      } else {
        return res.json(results);
      
      }

    })

  })
}


module.exports = controller;