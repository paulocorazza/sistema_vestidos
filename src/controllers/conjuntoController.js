const controller = {};

controller.list = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query("select codigo,foto,status, concat('R$ ', p.valor_aluguel )as valoraluguel ,concat('R$ ', p.valor_compra )as valorcompra ,tamanho from pecas p where tipo = 'conjunto' limit 10", (err, data, addConjuntosModal) => {
      if (err) {
        res.json(err);

      }
      res.render('conjuntos', {
        data: [],
        addConjuntosModal
      });
    });
  });
};

controller.save = (req, res) => {
  const data = req.body;
  console.log(req.body)
  req.getConnection((err, connection) => {
    const query = connection.query('INSERT INTO pecas set ?', data, (err, conjunto) => {

      if (err) {

        res.render('erro');

      } else {
        res.redirect('/conjuntos');
      }
    })
  })
};

controller.edit = (req, res) => {
  const {
    id
  } = req.params;
  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM pecas WHERE codigo = ? and tipo = "conjunto" ', [id], (err, rows) => {

      if (err) {
        res.render('erro');
      } else {
        res.render('conjuntos_edit', {
          data: rows[0]
        })
      }
    });
  });
};

controller.update = (req, res) => {
  const {
    id
  } = req.params;
  const newconjunto = req.body;
  req.getConnection((err, conn) => {

    conn.query('UPDATE pecas set ? where codigo = ? and tipo = "conjunto" ', [newconjunto, id], (err, rows) => {

      if (err) {
        res.render('erro');
      } else {
        console.log(newconjunto)
        res.redirect('/conjuntos');
      }
    });
  });
};

controller.delete = (req, res) => {
  const {
    id
  } = req.params;
  req.getConnection((err, connection) => {
    connection.query('DELETE FROM pecas WHERE codigo = ? and tipo = "conjunto" ', [id], (err, rows) => {
      if (err) {
        res.render('erro');
      } else {
        res.redirect('/conjuntos');
      }

    });
  });
}

controller.itemLocation = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query("select * from locacoes where pecas like %?%", (err, locacoes) => {
      if (err) {
        res.json(err);
      }

      return res.json(locacoes);

    });
  });
};


module.exports = controller;