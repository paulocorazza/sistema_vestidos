const controller = {};

controller.fetchPecas = (req, res) => {

  req.getConnection((err, conn) => {

    const {
      offset,
      tipo,
      limit
    } = req.query;

    if (!tipo) {
      return res.status(401).json({
        error: 'Erro, tipo não encontrado'
      })

    }
    conn.query(`select * from pecas  where  tipo = "${tipo}" ORDER BY codigo limit ${(limit || 10)} offset ${offset || 0} `, (err, results) => {
      if (err) {
        res.json(err);
      } else {


        return conn.query(`select COUNT(codigo) as contagem from pecas where  tipo = "${tipo}"`, (err, results2) => {

          count = JSON.parse(JSON.stringify(results2))[0].contagem;


          return res.json({
            totalItens: count,
            data: results
          });
        })




      }
    });
  });
};



module.exports = controller;