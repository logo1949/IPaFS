const express = require("express");
const Mongo = require('./mongo')
const config = require('../config')
const UserMongo = require('./userMongo')

const app = express();
const mongo = new Mongo();
const userMongo = new UserMongo();

app.get('/', function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");

    let cid = req.query.cid;
    let filename = req.query.filename;
    let uname =req.query.uname;
    console.log("store data: ",cid,filename);
    mongo.storgeFile(uname, filename, cid); 
    res.send("done");
});

app.get('/searchUser', async function(req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*")

  let uname = req.query.uname;
  let password = req.query.password;
  let searchResult = await userMongo.searchUser(uname, password)
  console.log("search result: ", searchResult);
  res.send(searchResult); 
})

app.get('/register', async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*")

  let fname = req.query.fname
  let lname = req.query.lname
  let uname = req.query.uname
  let password = req.query.password
  let result = await userMongo.storgeUser(fname, lname, uname, password) 
  res.send(result)
})

app.get('/search',   async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");

    let para = req.query.filePara;
    let searchresult = await mongo.searchFile(para);
    console.log("search result: ", searchresult);
    res.send(searchresult);
});

app.get('/searchByUser', async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");

    let uname = req.query.userName    
    let searchresult = await mongo.searchByUser(uname)
    res.send(searchresult)
})
app.get('/searchByfileHash', async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");

    let fileHash = req.query.fileHash   
    let searchresult = await mongo.searchByfileHash(fileHash)
    res.send(searchresult)
})


/*
app.get('/topic', async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");

    let cid = req.query.cid;
    let filename = req.query.filename;

    await mongo.downloadFile(cid, filename);    
    res.send("unknow");
});
*/
app.listen(config.express.port);
