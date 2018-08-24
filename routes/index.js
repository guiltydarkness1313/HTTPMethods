var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

var database = [];
database.push({message:'Node.JS facilita las cosas'});
database.push({message: 'Javascript es sencillo'});

router.get('/messages',function (req,res) {
  res.send(database);
});

router.post('/messages',function (req,res) {
    req.body = JSON.parse(JSON.stringify(req.body));
    if (req.body === undefined || isEmpty(req.body) || !req.body.message){
        res.status(400).send();
    } else{
        database.push(req.body)
    }
});

router.put('/messages',function (req,res) {
    res.status(405).send();
});

router.delete('/messages',function (req,res) {
    req.body = JSON.parse(JSON.stringify(re.body));
    if (req.body === undefined || isEmpty(req.body) || !req.body.message) {
       res.status(400).send();
    }else{
        database=[];
        res.status(200).send("Se elimino todo la información");
    }
});

router.get('/message/:id',function (req,res) {
   if (database[req.params.id] === undefined){
     res.status(400).send();
   }else{
     let id = req.params.id;
     res.send(database[id]);
   }
});

router.post('/message/:id',function (req,res) {
    res.status(405).send();
});

router.put('/message/:id',function (req,res) {
    req.body = JSON.parse(JSON.stringify(req.body));
   if(database[req.params.id] === undefined || isEmpty(req.body)){
     res.status(400).send();
   }else{
       database[req.params.id] = req.body;
     res.status(200).send(database[req.params.id]);
   }
});

router.delete('/message/:id',function (req,res) {
   if (database[req.params.id] === undefined){
       console.log(req.params.id);
       res.status(400).send();
   }else{
     delete database[req.params.id];
       res.redirect('/messages');
   }
});

router.post('/message',function (req,res) {
   database.push(req.body);
   res.status(201).send(req.body);
});

function isEmpty(obj){
  for (var prop in obj){
    if (obj.hasOwnProperty(prop))
      return false
  }
  return true
}

module.exports = router;
