$(document).ready(onReady);

function onReady(){
    //click handlers
    $('.operandButton').on('click', submitOperand);
    $('#submitCalcButton').on('click', submitCalc);
    $('#clearButton').on('click', clearCalc);

    //display history function

}
//create an object to hold input vals.
const toBeCalculated = {
    num1: 'nothing yet',
    num2: 'nothing yet',
    operandClicked: 'nothing yet'
}

function submitOperand(){
    // console.log('in submitOperand:', this.id);
    // console.log('tobeCalculated before:', toBeCalculated);
    //Take submitted operand and store its id in toBeCalculated object
    toBeCalculated.operandClicked = this.id;
    // console.log('toBeCalculated after:', toBeCalculated);
}

function submitCalc(){
    console.log('in submitCalc:');
    //store submitted numbers in toBeCalculated
    toBeCalculated.num1 = $('#firstNumIn').val();
    toBeCalculated.num2 = $('#secondNumIn').val();
    console.log('toBeCalculated after:', toBeCalculated);
    //use AJAX to send toBeCalculated to server with POST
    $.ajax({
        //make a POST request to create a new calc
        method: 'POST',
        url: '/calc',
        data: toBeCalculated
    }).then(function(response){
        console.log('back from POST:', response);
        //TO DO----run function to update history ul 
        //TO DO----run function to display calc result
        answerGet();
    }).catch(function(err){
        console.log(err);
        alert('error submitting calculation via POST');
    });
}

function clearCalc(){
    $('input').val('');
}

function answerGet(){
    console.log('in displayAnswer');
    //GET calc answer from server
    $.ajax({
        method: 'GET',
        url: '/answer'
    }).then(function(response){
        // console.log('response from GET /answer:', response);
        //TO DO ---- display on DOM
        let el = $('#answer');
        el.empty();
        el.append(response);
    }).catch(function(err){
        console.log('error in GET /answer:', err);
        alert('error GETting answer');
    });
    
}


//GET calculation history from server
// display calculation history in DOM
    //clear ul
    //loop through array of history, display in ul on DOM