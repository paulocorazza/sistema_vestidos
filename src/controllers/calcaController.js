const controller = {};

controller.list = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query("select codigo,foto,status, concat('R$ ', p.valor_aluguel )as valoraluguel ,concat('R$ ', p.valor_compra )as valorcompra ,concat('R$ ', p.valor_promocao )as valorpromocao, tamanho from pecas p where tipo = 'calca' limit 10", (err, data, addCalcasModal) => {
     if (err) {
      res.json(err);
      
     }
     res.render('calcas', {
        data: [],
        addCalcasModal
     });
    });
  });
};

controller.save = (req, res) => {
  const data = req.body;
  console.log(req.body)
  req.getConnection((err, connection) => {
    const query = connection.query('INSERT INTO pecas set ?', data, (err, calca) => {
     
      if(err){
      
        res.render('erro');
        
      }
      else{
        res.redirect('/calcas');
      }
    })
  })
};



controller.edit = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM pecas WHERE codigo = ? and tipo = "calca" ', [id], (err, rows) => {

      if(err){
        res.render('erro');
      }
      else{
        res.render('calcas_edit', {
          data: rows[0]
        })
      }  
    });
  });
};

controller.update = (req, res) => {
  const { id } = req.params;
  const newcalca = req.body;
  req.getConnection((err, conn) => {

  conn.query('UPDATE pecas set ? where codigo = ? and tipo = "calca" ', [newcalca, id], (err, rows) => {

    if(err){
      res.render('erro');
    }
    else{
      console.log(newcalca)
      res.redirect('/calcas');
    }
  });
  });
};

controller.delete = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, connection) => {
    connection.query('DELETE FROM pecas WHERE codigo = ? and tipo = "calca" ', [id], (err, rows) => {
      if(err){
        res.render('erro');
      }
      else{
        res.redirect('/calcas');
      }
     
    });
  });
}



module.exports = controller;