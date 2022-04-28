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
//function to take submitted operand and store its id in toBeCalculated object
function submitOperand(){
    console.log('in submitOperand:', this.id);
    console.log('tobeCalculated before:', toBeCalculated);
    toBeCalculated.operandClicked = this.id;
    console.log('toBeCalculated after:', toBeCalculated);
}

function submitCalc(){
    console.log('in submitCalc:');
}