'use-strict'

// Form elements
const form = document.getElementById('signup-form');
const firstNameInput = document.getElementById('first-name');
const lastNameInput = document.getElementById('last-name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

// Validate inputs on submit
form.addEventListener("submit", (event) => {

    // Validate inputs
    const isFistNameValid = validateInput('first-name', 'First Name', firstNameInput);
    const isLastNameValid = validateInput('last-name', 'Last Name', lastNameInput);
    const isEmailValid = validateInput('email', 'Email Address', emailInput);
    const isPasswordValid = validateInput('password', 'Password', passwordInput);

    const isValid = isFistNameValid && isLastNameValid && isEmailValid && isPasswordValid;

    // If any input is invalid, don't submit and init function to validate on key stroke
    if (!isValid) {
        event.preventDefault();
        validateOnKeyStroke();
    }

});


const validateOnKeyStroke = () => {

    firstNameInput.addEventListener("keyup", () => validateInput('first-name', 'First Name', firstNameInput));
    lastNameInput.addEventListener("keyup", () => validateInput('last-name', 'Last Name', lastNameInput));
    emailInput.addEventListener("keyup", () => validateInput('email', 'Email Address', emailInput));
    passwordInput.addEventListener("keyup", () => validateInput('password', 'Password', passwordInput));

}



const validateInput = (id, name, input) => {

    // get input value
    const value = input.value.trim();

    // get error icon and paragraph 
    const errorIcon = document.getElementById(`${id}-error-icon`);
    const errorMsgElement = document.getElementById(`${id}-error-msg`);

    // if input is empty show error and return false
    if (value.length === 0) {
        let errorMsg = `${name} cannot be empty`;
        showError(input, errorMsgElement, errorMsg, errorIcon);
        return false;
    }

    // if email, validate email
    if (id === 'email') {
        let isValid = validateEmail(input.value);
        const errorMsg = 'Looks like this is not an email';
        if (isValid) hideError(input, errorMsgElement, errorIcon);
        else showError(input, errorMsgElement, errorMsg, errorIcon);
        return isValid;
    }

    // input is valid => hide error and return
    hideError(input, errorMsgElement, errorIcon);
    return true;

}


const validateEmail = (value) => {
    // verify email regex
    const emailRegex = new RegExp('^[A-Za-z0-9._-]+@[A-Za-z0-9.-]+[.]{1}[A-Za-z]{2,4}$');
    return emailRegex.test(value);
}


const showError = (input, errorMsgElement, errorMsg, errorIcon) => {

    // add red border to input
    input.classList.add('input-error');

    // display error icon
    errorIcon.classList.add('input-error-icon-show');

    // add error text
    errorMsgElement.textContent = errorMsg;
}


const hideError = (input, errorMsgElement, errorIcon) => {

    // remove red border from input
    input.classList.remove('input-error');

    // remove error icon
    errorIcon.classList.remove('input-error-icon-show');

    // remove error text
    errorMsgElement.textContent = '';

}