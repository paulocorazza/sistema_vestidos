

drop schema viva_maria_db

select * from itens_locacao where id = 7

select * from locacoes 

alter table itens_locacao  drop column seq

ANALYZE TABLE `locacoes`;
SELECT AUTO_INCREMENT FROM information_schema.TABLES WHERE (TABLE_NAME = 'locacoes');

analyze table locacoes
select * from pecas p 

SELECT Auto_increment FROM information_schema.tables WHERE table_name='locacoes'

drop table locacoes
drop table itens_locacao 


create table locacoes(

	id int not null primary key auto_increment,
	cliente varchar(50),
	telefone varchar(15),
	endereco varchar(50),
	data_prova datetime,
	data_retira datetime,
	data_devolve date,
	sinal decimal(6,2),
	total decimal(6,2),
	restante decimal(6,2)


)ENGINE=INNODB;

SELECT LAST_INSERT_ID();

select 
  id, 
  cliente, 
  endereco, 
  telefone, 
  DATE_FORMAT(data_prova, '%Y-%m-%d %T') as data_prova, 
  DATE_FORMAT(data_retira, '%Y-%m-%d %T') as data_retira, 
  DATE_FORMAT(data_devolve, '%Y-%m-%d') as data_devolve, 
  l.sinal as sinal, 
  l.restante as restante, 
  l.total as total 
from 
  locacoes l 
where 
  id = ?


/*---------------------------------agora vai  -----------------------------------------------------------------------------------*/

select concat(x.cliente, ' - Provar ', GROUP_CONCAT(x.roupas)) as title, x.start, x.end
from (select(select GROUP_CONCAT(itens_locacao.codigo, ' ', itens_locacao.descricao)
             from itens_locacao
             where itens_locacao.id = locacoes.id
             group by itens_locacao.id)                roupas,
            locacoes.cliente,
            locacoes.data_prova                     as start,
            DATE_ADD(data_prova, INTERVAL 5 minute) as end
      from locacoes
      group by locacoes.cliente, locacoes.id, locacoes.data_prova) as x
group by x.cliente, x.start, x.end


/*********************************** Moisés consegue  **********************************************************************/


select 
    GROUP_CONCAT(locacoes.cliente,' - Provar - ', '  ',  itens_locacao.codigo, ' ', itens_locacao.descricao ) as title,
    data_prova as start,
    DATE_ADD(data_prova , INTERVAL 1 minute) as end
    from
    locacoes
    inner join itens_locacao on
    locacoes.id = itens_locacao .id
    group by locacoes.id   


/*--------------------------------------------------------------------------------------------------------------------*/

select 
GROUP_CONCAT(locacoes.cliente, ' - Retirar - ', '  ',  itens_locacao.codigo, ' ', itens_locacao.descricao ) as title,
data_retira as start,
DATE_ADD(data_retira , INTERVAL 15 minute) as
end
from
locacoes
inner join itens_locacao on
locacoes.id = itens_locacao .id
group by locacoes.id

/*--------------------------------------------------------------------------------------------------------------------*/


select 
GROUP_CONCAT(locacoes.cliente, ' - Devolver - ', '  ',  itens_locacao.codigo, ' ', itens_locacao.descricao ) as title,
data_devolve as start,
DATE_ADD(data_devolve , INTERVAL 15 minute) as
end
from
locacoes
inner join itens_locacao on
locacoes.id = itens_locacao .id
group by locacoes.id

		
/*--------------------------------------------------------------------------------------------------------------------*/
	


	
	alter table locacoes drop column data_retira
	
	alter table locacoes add column data_retira datetime




use viva_maria_db;


describe locacoes
describe itens_locacao 

delete from locacoes 
delete from itens_locacao 



/*---------insert pecas--------------------*/

INSERT INTO
`pecas` (`codigo`, 
`foto`, `status`,
`valor_aluguel`, 
`valor_compra`, 
`valor_promocao`, 
`tamanho`, `tipo`)
VALUES
('001',	'001.png', 'disponível' ,250.00,400.00,250.00, 42, 'vestido'),
('002', '002.png', 'disponível' ,250.00,400.00,250.00, 42, 'vestido'),
('003', '003.png', 'disponível' ,250.00,400.00,250.00, 42, 'vestido'),
('004', '004.png', 'disponível' ,250.00,400.00,250.00, 42, 'vestido'),
('005', '005.png', 'disponível',250.00,400.00,250.00, 42,'vestido'),
('006', '006.png', 'disponível',250.00,400.00,250.00, 42,'vestido'),
('007', '007.png', 'disponível',250.00,400.00,250.00, 42,'vestido'),
('008', '008.png', 'disponível',250.00,400.00,250.00, 42,'vestido'),
('009', '009.png', 'disponível',250.00,400.00,250.00, 42,'vestido'),
('010', '010.png', 'disponível',250.00,400.00,250.00, 42,'vestido'),
('011', '011.png', 'disponível',250.00,400.00,250.00, 42,'vestido'),
('012', '012.png', 'disponível',250.00,400.00,250.00, 42,'vestido'),
('013', '013.png', 'disponível',250.00,400.00,250.00, 42,'vestido'),
('014', '014.png', 'disponível',250.00,400.00,250.00, 42,'vestido'),
('015', '015.png', 'disponível',250.00,400.00,250.00, 42,'vestido'),
('016', '016.png', 'disponível',250.00,400.00,250.00, 42,'vestido'),
('017', '017.png', 'disponível',250.00,400.00,250.00, 42,'vestido'),
('018', '018.png', 'disponível',250.00,400.00,250.00, 42,'vestido'),
('019', '019.png', 'disponível',250.00,400.00,250.00, 42,'vestido'),
('020', '020.png', 'disponível',250.00,400.00,250.00, 42,'vestido');

/*-------------------------------------------------------------*/



/*---------insert locacoes--------------------*/

INSERT INTO
`locacoes` (
`cliente`, 
`telefone`,
`endereco`,
`data_prova`, 
`data_retira`, 
`data_devolve`, 
`sinal`, `total`,`restante`)
VALUES
( 'Joana asda', '11 97281-3500','Rua Joinvile','2021-04-04 09:30:00','2021-04-06','2021-04-07', 250.00,400.00,250.00);




/*---------aqui pego o proximo id da locacao--------------------*/

SELECT
	Auto_increment as id
FROM
	information_schema.tables
WHERE
	table_name = 'locacoes';

/*-------------------------------------------------------------*/

/*---------aqui faço a uniao da locacao com pecas e dataprova na agenda--------------------*/
																						
select  locacoes.id, 																			
CONCAT( ' Prova - ',locacoes .cliente, '  ', itens_locacao.codigo, ' ', itens_locacao.descricao ) as title,																		
locacoes.data_prova as start,														
DATE_ADD(data_prova , INTERVAL 30 minute) as end 
from locacoes 
inner join itens_locacao 
on locacoes.id = itens_locacao .id order by id;


/*--------------------------------------------------------------*/
																

/*---------aqui faço a uniao da locacao com pecas e datapretira na agenda--------------------*/
select  locacoes.id, 																			
itens_locacao.codigo,
CONCAT(locacoes .cliente, ' - Prova - ', '  ', itens_locacao.codigo, ' ', itens_locacao.descricao ) as title,																				
DATE_ADD(data_retira , INTERVAL 16 hour) as start, 													
DATE_ADD(data_retira , INTERVAL 16 hour) as end 
from locacoes 
inner join itens_locacao 
on locacoes.id = itens_locacao .id order by id;
/*-------------------------------------------------------------------------------------------*/


/*---------aqui faço a uniao da locacao com pecas e datadevolve na agenda--------------------*/
select  locacoes.id, 																			
itens_locacao.codigo,
CONCAT( ' Devolução - ',locacoes .cliente  ) as title,																		
DATE_ADD(data_devolve , INTERVAL 16 hour) as start, 													
DATE_ADD(data_devolve , INTERVAL 16 hour) as end 
from locacoes 
inner join itens_locacao 
on locacoes.id = itens_locacao .id order by id;
/*--------------------------------------------------------------*/

/*-------------------------------------------------------------*/
ss
/***************************************************************/


create table itens_locacao
( 
id int,
codigo varchar(10) not null,
descricao varchar(50),
foreign key (id) references locacoes(id),
foreign key (codigo) references pecas(codigo) )ENGINE=INNODB;

/***************************************************************/
	
