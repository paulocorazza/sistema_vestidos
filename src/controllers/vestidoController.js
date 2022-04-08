const controller = {};

controller.list = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query("select codigo,foto,status, concat('R$ ', p.valor_aluguel )as valoraluguel ,concat('R$ ', p.valor_compra )as valorcompra ,concat('R$ ', p.valor_promocao )as valorpromocao, tamanho from pecas p where tipo = 'vestido' limit 10", (err, data, addVestidosModal) => {
     if (err) {
      res.json(err);
      
     }
     res.render('vestidos', {
        data: [],
        addVestidosModal
     });
    });
  });
};

controller.save = (req, res) => {
  const data = req.body;
  console.log(req.body)
  req.getConnection((err, connection) => {
    const query = connection.query('INSERT INTO pecas set ?', data, (err, vestido) => {
     
      if(err){
        console.log(err);
        res.render('erro');
        
      }
      else{
        res.redirect('/vestidos');
      }
    })
  })
};



controller.edit = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM pecas WHERE codigo = ? and tipo = "vestido" ', [id], (err, rows) => {

      if(err){
        res.render('erro');
      }
      else{
        res.render('vestidos_edit', {
          data: rows[0]
        })
      }  
    });
  });
};

controller.update = (req, res) => {
  const { id } = req.params;
  const newVestido = req.body;
  req.getConnection((err, conn) => {

  conn.query('UPDATE pecas set ? where codigo = ? and tipo = "vestido" ', [newVestido, id], (err, rows) => {

    if(err){
      res.render('erro');
    }
    else{
      console.log(newVestido)
      res.redirect('/vestidos');
    }
  });
  });
};

controller.delete = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, connection) => {
    connection.query('DELETE FROM pecas WHERE codigo = ? and tipo = "vestido" ', [id], (err, rows) => {
      if(err){
        res.render('erro');
      }
      else{
        res.redirect('/vestidos');
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