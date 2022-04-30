$(document).ready(onReady);

function onReady(){
    //click handlers
    // $('.operandButton').on('click', submitOperand);
    $('.operandButton').on('click', collectNums);
    $('#submitCalcButton').on('click', submitCalc);//will need to edit for stretch
    $('#clearButton').on('click', clearCalc);
    $('.numButton').on('click', collectNums);
    //display history function
    historyGet();
}
//create an object to hold input vals.
const toBeCalculated = {
    num1: 'default',
    num2: 'default',
    operandClicked: 'default'
}
//create varaiable to hold input from number and operand buttons (for stretch feat.)
let allInput = '';

function collectNums(){
    let newNum;
    //if the button clicked was for an operand, add a space before and after and store as newNum
    if (this.className === 'operandButton'){
        newNum = ` ${this.id} `;
    } else {
        newNum = this.id;
    };
    console.log('newNum', newNum);
    //add newNum to allInput string
    allInput += newNum;
    console.log('allInput', allInput);
    //display allInput on DOM
    $('#calcBox').append(newNum);
}

function storeCollected(){
    //split allInput string into array containing [number, operand, number]
    let inputArray = allInput.split(' ');
    //assign values to toBeCalculated object based on array position
    toBeCalculated.num1 = inputArray[0];
    toBeCalculated.num2 = inputArray[2];
    toBeCalculated.operandClicked = inputArray[1];
}

// // BASE MODE ONLY
// function submitOperand(){
//     //Take submitted button and store its id in toBeCalculated object
//     toBeCalculated.operandClicked = this.id;
//     // console.log('toBeCalculated after:', toBeCalculated);
// }

function submitCalc(){
    console.log('in submitCalc:');
    //store submitted numbers in toBeCalculated (base mode)
    // toBeCalculated.num1 = $('#firstNumIn').val();
    // toBeCalculated.num2 = $('#secondNumIn').val();
    // console.log('toBeCalculated after:', toBeCalculated);

    //store submitted numbers in toBeCalculated (stretch mode)
    storeCollected();

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

