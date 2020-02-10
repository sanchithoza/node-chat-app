
const path = require('path');
const express = require('express');

const publicPath = path.join(__dirname,'../public');
//console.log(__dirname+'/../public');
//console.log(publicPath);
var app = express();
var port = process.env.PORT || 3000;

app.use(express.static('publicPath')

//app.get('/',(req,res)=>{
  //  res.sendfile( `${publicPath}/index.html`);
//});
app.listen(port,()=>{
  console.log(`server up on port ${port}`);
});
