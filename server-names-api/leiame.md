-- instalando docker do mongodb
docker pull tutum/mongodb
docker run -d -p 27017:27017 -p 28017:28017 -e AUTH=no tutum/mongodb
docker ps -a
docker start 21672677b73d

-- gerando dados da base
node generate.js

-- instalando o client do mongo
sudo apt install mongodb-clients

-- usando o mongo
mongo
-- seleciona o banco
use namesdb
-- o mongo transforma as tabelas para o plural, com isso, person vira people
db.people.count()
db.people.find({})