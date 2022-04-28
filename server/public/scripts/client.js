$(document).ready(onReady);

function onReady(){
    //click handlers
    $('#submitCalcButton').on('click', submitCalc);
    $('.operandButton').on('click', submitOperand);

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
    toBeCalculated.num1 = Number($('#firstNumIn').val());
    toBeCalculated.num2 = Number($('#secondNumIn').val());
    // console.log('toBeCalculated after:', toBeCalculated);
    //clear inputs

    //use AJAX to send toBeCalculated to server with POST
}

//GET calculation history from server
// display calculation history in DOM
    //clear ul
    //loop through array of history, display in ul on DOM