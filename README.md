# jQuery Server Calculator

## Description

_Duration: 1 Week_

This project is a calculator that uses server-side logic to compute mathematical functions submitted by the user. This calculator accepts two numerical values, input via buttons, and can add, subtract, multiply, or divide them.

Logic on the client side prevents incomplete equations or ones with extra symbols, decimals or operands from making it to the server. For example, an input of -12.57 + .34, or even -543 - -32, is allowed, but --343 * .34.3 will not pass and triggers an alert to the user.

An historical record of all previously submitted calculations is stored on the server, and displayed in a list on the DOM. Each of these list items may be clicked and their calculations re-run.

There are also two buttons for clearing: 'C' clears the current calculation being entered, while 'Clear History' clears all previous calculations from the server and the DOM.

## Screen Shot

![Wireframe](/images/screen-shot.png)

### Prerequisites

- [Node.js](https://nodejs.org/en/)

## Built With

- [Express.js](https://expressjs.com/)
- [jQuery](https://jquery.com/)

## Acknowledgement
Thanks to [Prime Digital Academy](www.primeacademy.io) who equipped and helped me to make this application a reality. 
