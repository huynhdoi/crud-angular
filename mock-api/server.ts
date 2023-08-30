const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('mock-api/db.json');
const middleware = jsonServer.defaults();
const db = require('./db.json');
const fs = require('fs');

server.use(middleware);
server.use(jsonServer.bodyParser);

/* crud mock */
server.get('/api/crud', (req: any, res: any) => {
    console.log(req, res);
    return readDataCrud();
});
server.get('/api/crud/4', (req: any, res: any) => {
    console.log(req, res);
    const crud = readDataCrud();
    return crud;
});



server.post('/api/crud', (req: any, res: any) => {
  const crud = readDataCrud();
  if (crud === undefined || crud === null) {
    db.crud.push(req.body);
    res.send(req.body);
    res.status(200).send('create user success');
  } else {
    res.status(500).send('User already exists');
  }
});


// server.use(jsonServer.rewriter({
//   '/api/*': '/$1'
// }));
server.use('**/api', router);
/**********************************************************************
       START EXRESS SERVER
***********************************************************************/
server.listen(3000, () => {
    console.log('Server started on port: 3000');
});


function readDataCrud() {
  const dbRaw = fs.readFileSync('./mock-api/db.json');  
  const crud = JSON.parse(dbRaw).crud
  return crud;
}