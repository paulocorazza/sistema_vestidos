const controller = {};

controller.list = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query("select codigo,foto,status, concat('R$ ', p.valor_aluguel )as valoraluguel ,concat('R$ ', p.valor_compra )as valorcompra ,tamanho from pecas p where tipo = 'calca' limit 10", (err, camisas, addCamisasModal) => {
     if (err) {
      res.json(err);
      
     }
     res.render('camisas', {
        data: camisas,
        addCamisasModal
     });
    });
  });
};

controller.save = (req, res) => {
  const data = req.body;
  console.log(req.body)
  req.getConnection((err, connection) => {
    const query = connection.query('INSERT INTO pecas set ?', data, (err, camisa) => {
     
      if(err){
      
        res.render('erro');
        
      }
      else{
        res.redirect('/camisas');
      }
    })
  })
};

controller.edit = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM pecas WHERE codigo = ? and tipo = "camisa" ', [id], (err, rows) => {

      if(err){
        res.render('erro');
      }
      else{
        res.render('camisas_edit', {
          data: rows[0]
        })
      }  
    });
  });
};

controller.update = (req, res) => {
  const { id } = req.params;
  const newcamisa = req.body;
  req.getConnection((err, conn) => {

  conn.query('UPDATE pecas set ? where codigo = ? and tipo = "camisa" ', [newcamisa, id], (err, rows) => {

    if(err){
      res.render('erro');
    }
    else{
      console.log(newcamisa)
    res.redirect('/camisas');
    }
  });
  });
};

controller.delete = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, connection) => {
    connection.query('DELETE FROM pecas WHERE codigo = ? and tipo = "camisa" ', [id], (err, rows) => {
      if(err){
        res.render('erro');
      }
      else{
        res.redirect('/camisas');
      }
     
    });
  });
}

module.exports = controller;