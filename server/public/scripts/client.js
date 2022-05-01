$(document).ready(onReady);

function onReady(){
    //click handlers
    // $('.operandButton').on('click', submitOperand);
    $('.operandButton').on('click', collectNums);
    $('#submitCalcButton').on('click', submitCalc);//will need to edit for stretch
    $('#clearButton').on('click', clearCalc);
    $('.numButton').on('click', collectNums);
    $('#clearHistButton').on('click', clearHist);
    //display history function
    historyGet();
}
//object to hold input vals
const toBeCalculated = {
    num1: '',
    num2: '',
    operandClicked: ''
}
//variable to hold input from number and operand buttons (for stretch feat.)
let allInput = '';
//create variable to track whether a .numButton has been clicked yet--
let numClickCount = 0;
//counter to track whether operand was clicked (not including negative numbers)
let operandCount = 0;

function collectNums(){
    let newNum;
    if(this.className === 'numButton'){
        //track how many times numButton has been clicked in current calculation
        numClickCount++;
        //store number button id as newNum
        newNum = this.id;
    } else if (this.id === '-' && (!allInput || allInput.charAt(allInput.length-1)===' ')){
        //if minus was clicked for a negative number (not as an operand): 
        //no spaces added and no incrementing operandCount
        newNum = this.id;
    } else if (this.className === 'operandButton' && numClickCount !== 0 && operandCount === 0){
        //if the button clicked was for an operand, add a space before and after and store as newNum
        newNum = ` ${this.id} `;
        operandCount++;
    } else {
        alert('Invalid input. Please try again.');
        clearCalc();
    };
    //if newNum has a value (is not undefined), add to allInput string
    if (newNum){
    allInput += newNum;
    //display allInput on DOM
    $('#calcBox').append(newNum);}
}

function storeCollected(){
    //split allInput string into array containing [number, operand, number]
    let inputArray = allInput.split(' ');
    console.log('inputArray:', inputArray);
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

    //store submitted numbers in toBeCalculated (stretch mode)
    storeCollected();
    //Check data quality before sending to server for calculation
    if (toBeCalculated.operandClicked !== '+' && 
        toBeCalculated.operandClicked !== '-' && 
        toBeCalculated.operandClicked !== '*' && 
        toBeCalculated.operandClicked !== '/') {
            alert('Operand is missing or not in the correct spot. Re-enter calculation');
            clearCalc();
    } else if (toBeCalculated.num1 === '' || 
        toBeCalculated.num1 === '-' || 
        toBeCalculated.num2 === '' || 
        toBeCalculated.num2 === '-'){
            alert('Re-enter calculation with the following format: number1 operator number2');
            clearCalc();
    } else {
        //PASSED QC Checks. Send toBeCalculated to server
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
        //stretch mode: clear submitted calc from output box and toBeCalculated object
        clearCalc();
    }
}

function clearCalc(){
    // $('input').val('');
    //reset values in object
    toBeCalculated.num1 = '';
    toBeCalculated.num2 = '';
    toBeCalculated.operandClicked = '';
    //clear allInput string
    allInput = '';
    //clear calcBox on DOM
    $('#calcBox').val('');
    //reset numClickCount and operandCount to 0
    numClickCount = 0;
    operandCount = 0;
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

function clearHist(){
    //DELETE calculation history from server
    $.ajax({
        method: 'DELETE',
        url: '/answer/hist'
    }).then(function(response){
        console.log('back from DELETE /answer/hist:', response);
        //Display empty calc history on DOM
        historyGet();
        //clear last calculation's answer from DOM:
        $('#answer').empty();
    }).catch(function(err){
        console.log('error in DELETE /answer/hist:', err);
        alert('error deleting calculation history');
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

