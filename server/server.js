//requires
const express = require('express');
const app = express();
const bodyParser = require('body-parser'); //use for POST
const router = express.Router();
//app uses
app.use(express.static('./server/public'));
app.use(bodyParser.urlencoded({extended: true})); // needed for POST
app.use('/calc', router);
app.use('/answer', router);

//globals
const calcHistory = []; //stores all previous calculations
let answer;
const port = 5001;
//spin up server
app.listen(port,()=>{
    console.log('server up on:', port);
});

//calculation function
function calculateIt(toCalc){
    // console.log('in calculateIt, toCalc:', toCalc);
    //funcs to do math based on 'operandClicked' and store result in answer variable
    if(toCalc.operandClicked === '+'){
        answer = Number(toCalc.num1) + Number(toCalc.num2);
    } else if (toCalc.operandClicked === '-'){
        answer = Number(toCalc.num1) - Number(toCalc.num2);
    } else if (toCalc.operandClicked === '*'){
        answer = Number(toCalc.num1) * Number(toCalc.num2);
    } else if (toCalc.operandClicked === '/'){
        answer = Number(toCalc.num1) / Number(toCalc.num2);
    }
    console.log('answer', answer);
};

//POST route from client containing toBeCalculated object
router.post('/', (req, res)=>{
    // console.log('POST in server:', req.body);
    //store req.body object in a variable and pass it to calculatIt function
    let toCalc = req.body;
    calculateIt(toCalc);
    //push into history array
    calcHistory.push(toCalc);
    console.log('calcHistory:', calcHistory);
    //send success status to client
    res.sendStatus(200);
});

router.get('/hist', (req, res)=>{
    //sending back calculation history object
    res.send(calcHistory);
});

router.get('/', (req, res)=>{
    //sending back answer variable as a string since express hates numbers
    res.send(answer.toString());
});

//export
module.exports = router;