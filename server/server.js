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
let answer;
const port = 5001;
//spin up server
app.listen(port,()=>{
    console.log('server up on:', port);
})

//calculation function
function calculateIt(toCalc){
    console.log('in calculateIt, toCalc:', toCalc);
    //funcs to do math based on 'operandClicked' and store result in answer variable
    if(toCalc.operandClicked === 'plusButton'){
        answer = Number(toCalc.num1) + Number(toCalc.num2);
    } else if (toCalc.operandClicked === 'minusButton'){
        answer = Number(toCalc.num1) - Number(toCalc.num2);
    } else if (toCalc.operandClicked === 'multiplyButton'){
        answer = Number(toCalc.num1) * Number(toCalc.num2);
    } else if (toCalc.operandClicked === 'divideButton'){
        answer = Number(toCalc.num1) / Number(toCalc.num2);
    }
    console.log('answer', answer);
}

//POST route from client
router.post('/', (req, res)=>{
    // console.log('POST in server:', req.body);
    //store req.body object in a variable and pass it to calculatIt function
    let toCalc = req.body;
    calculateIt(toCalc);
    //push into history array
    calcHistory.push(toCalc);
    console.log('calcHistory:', calcHistory);
    //run calculation function
    res.sendStatus(200);
})

//export
module.exports = router;