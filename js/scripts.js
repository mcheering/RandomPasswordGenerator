// Setting variables equal to user inputs from the DOM
var _length = document.querySelector('input[name="number-input"]');
var _lowercase = document.querySelector('input[name="lowerCaseYes"]');
var _uppercase = document.querySelector('input[name="upperCaseYes"]');
var _number = document.querySelector('input[name="numYes"]');
var _symbol = document.querySelector('input[name="spCharYes"]');
var copy = document.getElementById("copy-button");
var generateButton = document.querySelector('button[type="submit"]');

//Creating object with strings for each key that can be pulled from for the password 
const key_strings = {
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    number: '0123456789',
    symbol: '*;<>()[]{}#$?!^|'
};

//function that listens for a click on the copy button and writes to the clipboard
copy.addEventListener("click", () => {
    var _password = document.querySelector('input[type="text"]');
    if (_password.value != "" && _password.value != "Include any key string and define the length!") {
        _password.select();
        document.execCommand('copy');
        alert("Password copied!");
    }
});

//functino that listens for a click and sets variables to boolean values based on the state  each element is in on the web page. 
generateButton.addEventListener("click", () => {
    var length = +_length.value;
    var activeLower = _lowercase.checked;
    var activeUpper = _uppercase.checked;
    var activeNumber = _number.checked;
    var activeSymbol = _symbol.checked;
    generateRandomPassword(activeLower, activeUpper, activeNumber, activeSymbol, length);
});

//function for generating random password that takes aruguments from our object and populates MAIN_String, and then we loop through it to make a random password.
function generateRandomPassword(lower, upper, num, sym, length) {
    let MAIN_STRING = "";
    let PASSWORD = "";

    const options = {
        lowercase: lower,
        uppercase: upper,
        number: num,
        symbol: sym
    };
    //ternary operator checking to see if the object, options, hsa any key that is true to populate MAIN_STRING with the values fro mthose keys. 
    for (i = 0; i < Object.keys(options).length; i++) {
        MAIN_STRING += (Object.values(options)[i]) ? key_strings[Object.keys(options)[i]] : "";
    }
    //THis function then loops through MAIN_STRING and randomly pulls from it and writes to PASSWORD.  If nothing was checked, it will alert the user at least one box must be checked in the GUI.
    if (MAIN_STRING != "" && length > 0) {
        for (i = 0; i < length; i++) {
            PASSWORD += MAIN_STRING[Math.floor(Math.random() * MAIN_STRING.length)];
        }

        document.querySelector('input[type="text"]').value = PASSWORD;

    } else {
        alert("You need at least one password parameter checked")
        document.querySelector('input[type="text"]').value = "You need at least one box checked to make a password";
    }


}
