const controller = {};

controller.list = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query("select codigo,foto,status, concat('R$ ', p.valor_aluguel )as valoraluguel ,concat('R$ ', p.valor_compra )as valorcompra ,concat('R$ ', p.valor_promocao )as valorpromocao, tamanho from pecas p where tipo = 'gravata' limit 10", (err, data, addGravatasModal) => {
     if (err) {
      res.json(err);
      
     }
     res.render('gravatas', {
        data: [],
        addGravatasModal
     });
    });
  });
};

controller.save = (req, res) => {
  const data = req.body;
  console.log(req.body)
  req.getConnection((err, connection) => {
    const query = connection.query('INSERT INTO pecas set ?', data, (err, gravata) => {
     
      if(err){
      
        res.render('erro');
        
      }
      else{
        res.redirect('/gravatas');
      }
    })
  })
};



controller.edit = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM pecas WHERE codigo = ? and tipo = "gravata" ', [id], (err, rows) => {

      if(err){
        res.render('erro');
      }
      else{
        res.render('gravatas_edit', {
          data: rows[0]
        })
      }  
    });
  });
};

controller.update = (req, res) => {
  const { id } = req.params;
  const newgravata = req.body;
  req.getConnection((err, conn) => {

  conn.query('UPDATE pecas set ? where codigo = ? and tipo = "gravata" ', [newgravata, id], (err, rows) => {

    if(err){
      res.render('erro');
    }
    else{
      console.log(newgravata)
      res.redirect('/gravatas');
    }
  });
  });
};

controller.delete = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, connection) => {
    connection.query('DELETE FROM pecas WHERE codigo = ? and tipo = "gravata" ', [id], (err, rows) => {
      if(err){
        res.render('erro');
      }
      else{
        res.redirect('/gravatas');
      }
     
    });
  });
}



module.exports = controller;