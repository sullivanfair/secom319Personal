/**
 * @author Sullivan Fair
 * Date: Monday, September 18, 2023
 * email: sffair@iastate.edu
 * Activity07 - Variables
 */

console.log("---- I am in V A R I A B L E S ----");

//Q1: Is it permitted?
console.log("Q1 ---------------");
var var1 = "Iowa";
console.log(var1);

var var1 = 124;
console.log(var1);

//Is it permitted?
console.log("Yes");

//Q2: Is it valid?
console.log("Q2 ---------------");

let var2 = "Ames";
console.log(var2);
// let var2 = 124; //can't redeclare block-scoped variable

//Is it valid?
console.log("No");

//Q3: Is it valid?
console.log("Q3 ---------------");
let var3 = "ISU";
console.log(var3);
var3 = 2023;
console.log(var3);

console.log("Yes");

//Q4: Explain the error.
console.log("Q4 ---------------");
let var4;
// const var5; //must be initialized

console.log("What's the error? Const declarations must be initialized.");

//Q5: Explain the error.
console.log("Q5 ---------------");
const var6 = 3.1415;
// var6 = 2.8; //Assignment to constant variable

console.log("What's the error? Can't make an assignment to constant variable.")

//Q6: Explain the error.
//let first name = "Abraham"; //Can't be two separate words
console.log("Variable names can't be two separate words.");

// let 2numbers = [1, 2]; //Indentifier can't follow numeric literal
console.log("A keyword can't follow numeric literal.");

//let city-state = "Ames, Iowa"; //Can't have '-' character
console.log("Variable name can't have '-' character.");

//Q7: What?!
let mainCity = "Des Moines";
//console.log("This is the Capital: ", MainCity); //Wrong variable name
console.log("'MainCity' is the incorrect variable name.  It should be 'mainCity'");

//Q8: "let" and "const" scope vs "var" scope
if(5 == 5)
{
    var var7 = 100;
}
console.log(var7);

// if(5 == 5)
// {
//     let var8 = 100;
// }
// console.log(var8); //Not defined outside of 'if' statement

console.log("var8 is not defined outside of the 'if' statement");