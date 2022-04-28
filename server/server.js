//requires
const express = require('express');
const app = express();
//app uses

//globals
const port = 5001;
//spin up server
app.listen(port,()=>{
    console.log('server up on:', port);
})
//calculation functions

//module.exports