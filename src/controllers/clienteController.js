const controller = {};

controller.list = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM clientes', (err, clientes) => {
     if (err) {
      res.json(err);
     }
     res.render('clientes', {
        data: clientes  
     });
    });
  });
};

controller.save = (req, res) => {
  const data = req.body;
  console.log(req.body)
  req.getConnection((err, connection) => {
    const query = connection.query('INSERT INTO clientes set ?', data, (err, customer) => {
      console.log(customer)
      res.redirect('/clientes');
    })
  })
};

controller.edit = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, conn) => {
    conn.query("SELECT * FROM clientes WHERE id = ?", [id], (err, rows) => {
      res.render('clientes_edit', {
        data: rows[0]
      })
    });
  });
};

controller.update = (req, res) => {
  const { id } = req.params;
  const newCliente = req.body;
  req.getConnection((err, conn) => {

  conn.query('UPDATE clientes set ? where id = ?', [newCliente, id], (err, rows) => {
    console.log(newCliente)
    res.redirect('/clientes');
  });
  });
};

controller.delete = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, connection) => {
    connection.query('DELETE FROM clientes WHERE id = ?', [id], (err, rows) => {
      res.redirect('/clientes');
    });
  });
}

module.exports = controller;
