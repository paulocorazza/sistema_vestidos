const controller = {};

controller.list = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query("select codigo,foto,status, concat('R$ ', p.valor_aluguel )as valoraluguel ,concat('R$ ', p.valor_compra )as valorcompra ,tamanho from pecas p where tipo = 'bolsa' limit 10", (err, bolsas, addBolsasModal) => {
     if (err) {
      res.json(err);
      
     }
     res.render('bolsas', {
        data: bolsas,
        addBolsasModal
     });
    });
  });
};

controller.save = (req, res) => {
  const data = req.body;
  console.log(req.body)
  req.getConnection((err, connection) => {
    const query = connection.query('INSERT INTO pecas set ?', data, (err, bolsa) => {
     
      if(err){
      
        res.render('erro');
        
      }
      else{
        res.redirect('/bolsas');
      }
    })
  })
};

controller.edit = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM pecas WHERE codigo = ? and tipo = "bolsa" ', [id], (err, rows) => {

      if(err){
        res.render('erro');
      }
      else{
        res.render('bolsas_edit', {
          data: rows[0]
        })
      }  
    });
  });
};

controller.update = (req, res) => {
  const { id } = req.params;
  const newbolsa = req.body;
  req.getConnection((err, conn) => {

  conn.query('UPDATE pecas set ? where codigo = ? and tipo = "bolsa" ', [newbolsa, id], (err, rows) => {

    if(err){
      res.render('erro');
    }
    else{
      console.log(newbolsa)
    res.redirect('/bolsas');
    }
  });
  });
};

controller.delete = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, connection) => {
    connection.query('DELETE FROM pecas WHERE codigo = ? and tipo = "bolsa" ', [id], (err, rows) => {
      if(err){
        res.render('erro');
      }
      else{
        res.redirect('/bolsas');
      }
     
    });
  });
}

module.exports = controller;