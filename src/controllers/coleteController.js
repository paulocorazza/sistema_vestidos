const controller = {};

controller.list = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query("select codigo,foto,status, concat('R$ ', p.valor_aluguel )as valoraluguel ,concat('R$ ', p.valor_compra )as valorcompra ,concat('R$ ', p.valor_promocao )as valorpromocao, tamanho from pecas p where tipo = 'colete' limit 10", (err, data, addColetesModal) => {
     if (err) {
      res.json(err);
      
     }
     res.render('coletes', {
        data: [],
        addColetesModal
     });
    });
  });
};

controller.save = (req, res) => {
  const data = req.body;
  console.log(req.body)
  req.getConnection((err, connection) => {
    const query = connection.query('INSERT INTO pecas set ?', data, (err, colete) => {
     
      if(err){
      
        res.render('erro');
        
      }
      else{
        res.redirect('/coletes');
      }
    })
  })
};



controller.edit = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM pecas WHERE codigo = ? and tipo = "colete" ', [id], (err, rows) => {

      if(err){
        res.render('erro');
      }
      else{
        res.render('coletes_edit', {
          data: rows[0]
        })
      }  
    });
  });
};

controller.update = (req, res) => {
  const { id } = req.params;
  const newcolete = req.body;
  req.getConnection((err, conn) => {

  conn.query('UPDATE pecas set ? where codigo = ? and tipo = "colete" ', [newcolete, id], (err, rows) => {

    if(err){
      res.render('erro');
    }
    else{
      console.log(newcolete)
      res.redirect('/coletes');
    }
  });
  });
};

controller.delete = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, connection) => {
    connection.query('DELETE FROM pecas WHERE codigo = ? and tipo = "colete" ', [id], (err, rows) => {
      if(err){
        res.render('erro');
      }
      else{
        res.redirect('/coletes');
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