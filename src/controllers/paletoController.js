const controller = {};

controller.list = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query("select codigo,foto,status, concat('R$ ', p.valor_aluguel )as valoraluguel ,concat('R$ ', p.valor_compra )as valorcompra ,tamanho from pecas p where tipo = 'paleto' limit 10", (err, paletos, addPaletosModal) => {
     if (err) {
      res.json(err);
      
     }
     res.render('paletos', {
        data: paletos,
        addPaletosModal
     });
    });
  });
};

controller.save = (req, res) => {
  const data = req.body;
  console.log(req.body)
  req.getConnection((err, connection) => {
    const query = connection.query('INSERT INTO pecas set ?', data, (err, paleto) => {
     
      if(err){
      
        res.render('erro');
        
      }
      else{
        res.redirect('/paletos');
      }
    })
  })
};

controller.edit = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM pecas WHERE codigo = ? and tipo = "paleto" ', [id], (err, rows) => {

      if(err){
        res.render('erro');
      }
      else{
        res.render('paletos_edit', {
          data: rows[0]
        })
      }  
    });
  });
};

controller.update = (req, res) => {
  const { id } = req.params;
  const newpaleto = req.body;
  req.getConnection((err, conn) => {

  conn.query('UPDATE pecas set ? where codigo = ? and tipo = "paleto" ', [newpaleto, id], (err, rows) => {

    if(err){
      res.render('erro');
    }
    else{
      console.log(newpaleto)
    res.redirect('/paletos');
    }
  });
  });
};

controller.delete = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, connection) => {
    connection.query('DELETE FROM pecas WHERE codigo = ? and tipo = "paleto" ', [id], (err, rows) => {
      if(err){
        res.render('erro');
      }
      else{
        res.redirect('/paletos');
      }
     
    });
  });
}

module.exports = controller;