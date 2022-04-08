const controller = {};

controller.list = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query("select codigo,foto,status, concat('R$ ', p.valor_aluguel )as valoraluguel ,concat('R$ ', p.valor_compra )as valorcompra ,tamanho from pecas p where tipo = 'sapato' limit 10", (err, sapatos, addSapatosModal) => {
     if (err) {
      res.json(err);
      
     }
     res.render('sapatos', {
        data: sapatos,
        addSapatosModal
     });
    });
  });
};

controller.save = (req, res) => {
  const data = req.body;
  console.log(req.body)
  req.getConnection((err, connection) => {
    const query = connection.query('INSERT INTO pecas set ?', data, (err, sapato) => {
     
      if(err){
      
        res.render('erro');
        
      }
      else{
        res.redirect('/sapatos');
      }
    })
  })
};

controller.edit = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM pecas WHERE codigo = ? and tipo = "sapato" ', [id], (err, rows) => {

      if(err){
        res.render('erro');
      }
      else{
        res.render('sapatos_edit', {
          data: rows[0]
        })
      }  
    });
  });
};

controller.update = (req, res) => {
  const { id } = req.params;
  const newsapato = req.body;
  req.getConnection((err, conn) => {

  conn.query('UPDATE pecas set ? where codigo = ? and tipo = "sapato" ', [newsapato, id], (err, rows) => {

    if(err){
      res.render('erro');
    }
    else{
      console.log(newsapato)
    res.redirect('/sapatos');
    }
  });
  });
};

controller.delete = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, connection) => {
    connection.query('DELETE FROM pecas WHERE codigo = ? and tipo = "sapato" ', [id], (err, rows) => {
      if(err){
        res.render('erro');
      }
      else{
        res.redirect('/sapatos');
      }
     
    });
  });
}

module.exports = controller;