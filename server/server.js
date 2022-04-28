//requires
const express = require('express');
const app = express();
const bodyParser = require('body-parser'); //use for POST
const router = express.Router();
//app uses
app.use(express.static('./server/public'));
app.use(bodyParser.urlencoded({extended: true})); // needed for POST
app.use('/calc', router);

//globals
const calcHistory = []; //stores all previous calculations
const port = 5001;
//spin up server
app.listen(port,()=>{
    console.log('server up on:', port);
})

//calculation functions
function calculateIt(toCalc){
    console.log('in calculateIt, toCalc:', toCalc);
    if(toCalc.operandClicked === 'plusButton'){
        let answer = Number(toCalc.num1) + Number(toCalc.num2);
        console.log('answer', answer);
    }
}

//POST route from client
router.post('/', (req, res)=>{
    // console.log('POST in server:', req.body);
    //store req.body object in a variable and pass it to calculatIt function
    let toCalc = req.body;
    calculateIt(toCalc);

    //push into history array
    //run calculation function
    res.sendStatus(200);
})

//export
module.exports = router;