$(document).ready(onReady);

function onReady(){
    //click handlers
    $('.operandButton').on('click', submitOperand);
    $('#submitCalcButton').on('click', submitCalc);
    $('#clearButton').on('click', clearCalc);
    //display history function
    historyGet();
}
//create an object to hold input vals.
const toBeCalculated = {
    num1: 'default',
    num2: 'default',
    operandClicked: 'default'
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
        // console.log('back from POST:', response);
        //run function to display calc result
        answerGet();
        //run function to update history ul 
        historyGet();
    }).catch(function(err){
        console.log(err);
        alert('error submitting calculation via POST');
    });
}

function clearCalc(){
    $('input').val('');
    toBeCalculated.num1 = 'default';
    toBeCalculated.num2 = 'default';
    toBeCalculated.operandClicked = 'default';
}

function answerGet(){
    console.log('in displayAnswer');
    //GET calc answer from server
    $.ajax({
        method: 'GET',
        url: '/answer'
    }).then(function(response){
        // console.log('response from GET /answer:', response);
        // display answer on DOM
        let el = $('#answer');
        el.empty();
        el.append(response);
    }).catch(function(err){
        console.log('error in GET /answer:', err);
        alert('error getting answer');
    }); 
}

function historyGet(){
    //GET calculation history from server
    $.ajax({
        method: 'GET',
        url: '/answer/hist'
    }).then(function(response){
        console.log('back from GET /answer/hist:', response);
        //run function to display calc history on DOM
        displayHist(response);
    }).catch(function(err){
        console.log('error in GET /answer/hist:', err);
        alert('error getting calculation history');
    });
}

//display calc history on DOM
function displayHist(response){
    let el = $('#historyList')
    //clear ul
    el.empty();
    //loop through array of history, display in ul on DOM
    for (let i=0; i<response.length; i++){
        el.append(`<li>${response[i].num1} ${response[i].operandClicked} ${response[i].num2}</li>`);
    }
}

