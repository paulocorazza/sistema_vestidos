const controller = {};


controller.searchVestido =(req,res) => {
    req.getConnection((err, conn) => {
  
      const {codigo} = req.params;
  
       conn.query( `select * from  pecas  where codigo like "%${codigo}%" and tipo = 'vestido';`, (err, results) => {
       if (err) {
        res.json(err);
      
       }
       else{
        return res.json(results);
    
       }
      
      });
    });
  
  }

  controller.searchSapato =(req,res) => {
    req.getConnection((err, conn) => {
  
      const {codigo} = req.params;

  
       conn.query( `select * from  pecas  where codigo like "%${codigo}%" and tipo = 'sapato';`, (err, results) => {
       if (err) {
        res.json(err);
      
       }
       else{
        return res.json(results);
    
       }
      
      });
    });
  
  }

  controller.searchGravata =(req,res) => {
    req.getConnection((err, conn) => {
  
      const {codigo} = req.params;

  
       conn.query( `select * from  pecas  where codigo like "%${codigo}%" and tipo = 'gravata';`, (err, results) => {
       if (err) {
        res.json(err);
      
       }
       else{
        return res.json(results);
    
       }
      
      });
    });
  
  }

  controller.searchCamisa =(req,res) => {
    req.getConnection((err, conn) => {
  
      const {codigo} = req.params;

  
       conn.query( `select * from  pecas  where codigo like "%${codigo}%" and tipo = 'camisa';`, (err, results) => {
       if (err) {
        res.json(err);
      
       }
       else{
        return res.json(results);
    
       }
      
      });
    });
  
  }

  controller.searchColete =(req,res) => {
    req.getConnection((err, conn) => {
  
      const {codigo} = req.params;

  
       conn.query( `select * from  pecas  where codigo like "%${codigo}%" and tipo = 'colete';`, (err, results) => {
       if (err) {
        res.json(err);
      
       }
       else{
        return res.json(results);
    
       }
      
      });
    });
  
  }

  controller.searchConjunto =(req,res) => {
    req.getConnection((err, conn) => {
  
      const {codigo} = req.params;

  
       conn.query( `select * from  pecas  where codigo like "%${codigo}%" and tipo = 'conjunto';`, (err, results) => {
       if (err) {
        res.json(err);
      
       }
       else{
        return res.json(results);
    
       }
      
      });
    });
  
  }

  controller.searchBolsa =(req,res) => {
    req.getConnection((err, conn) => {
  
      const {codigo} = req.params;

  
       conn.query( `select * from  pecas  where codigo like "%${codigo}%" and tipo = 'bolsa';`, (err, results) => {
       if (err) {
        res.json(err);
      
       }
       else{
        return res.json(results);
    
       }
      
      });
    });
  
  }

  controller.searchPaleto =(req,res) => {
    req.getConnection((err, conn) => {
  
      const {codigo} = req.params;

  
       conn.query( `select * from  pecas  where codigo like "%${codigo}%" and tipo = 'paleto';`, (err, results) => {
       if (err) {
        res.json(err);
      
       }
       else{
        return res.json(results);
    
       }
      
      });
    });
  
  }


  controller.searchCalca =(req,res) => {
    req.getConnection((err, conn) => {
  
      const {codigo} = req.params;

  
       conn.query( `select * from  pecas  where codigo like "%${codigo}%" and tipo = 'calca';`, (err, results) => {
       if (err) {
        res.json(err);
      
       }
       else{
        return res.json(results);
    
       }
      
      });
    });
  
  }

  module.exports = controller;
