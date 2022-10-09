const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');
const user = require("./user.json")

router.get('/home', (req,res) => {

  res.sendFile(path.join(__dirname, '/home.html'));
  
});


router.get('/profile', (req,res) => {

  
  res.send(JSON.stringify(user))
  
});


router.post('/login', (req,res) => {
 
  if(req.query.username== user.username && req.query.password==user.password)
  {
    const msg ={
      status:false,
      message: "Password is invalid"}
      res.send(JSON.stringify(msg))
  }
  else if (req.query.username!= user.username && req.query.password===user.password){
   const msg ={
     status:false,
     message: "User Name is invalid"}
   res.send(JSON.stringify(msg))
  }
  else if (req.query.username=== user.username && req.query.password!==user.password){
   
     const msg ={
     status:false,
     message: "Password is invalid"}
     res.send(JSON.stringify(msg))
  }
  
});



router.post('/logout/:username', (req,res) => {
  const name= req.params.username
  res.send(`<b>${name} successfully logout.<b>`);
});

app.use('/', router);

app.listen(process.env.port || 8081);

console.log('Web Server is listening at port '+ (process.env.port || 8081));