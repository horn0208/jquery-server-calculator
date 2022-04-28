//requires
const express = require('express');
const app = express();
const bodyParser = require('body-parser'); //use for POST
const router = express.Router();
//app uses
app.use(express.static('./server/public'));
app.use(bodyParser.urlencoded({extended: true})); // needed for POST
app.use('/calc', router);
//route POST from client
router.post('/', (req, res)=>{
    console.log('POST in server:', req.body);
    //push into history array
    //run calculation function
    res.sendStatus(200);
})
//globals
const calcHistory = []; //stores all previous calculations
const port = 5001;
//spin up server
app.listen(port,()=>{
    console.log('server up on:', port);
})
//calculation functions

//export
module.exports = router;